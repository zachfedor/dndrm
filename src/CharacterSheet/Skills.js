import React, { useContext, useState } from 'react';

import { DispatchContext } from '../App';
import { Button, Input, Table } from '../atoms';
import { SKILLS } from '../constants';
import { getSkillModifier } from '../formulas';
import './Skills.css';

const addSign = num => num < 0 ? `${num}` : `+${num}`;

const Skills = ({ character }) => {
  const dispatch = useContext(DispatchContext);
  const [skillInput, setSkillInput] = useState('');

  const onChange = (event) => setSkillInput(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    const input = skillInput.toLowerCase();

    if (SKILLS.filter(s => s.name === input).length) {
      const newProficiencies = character.proficiencies.includes(input)
        ? character.proficiencies.filter(skill => skill !== input)
        : [ ...character.proficiencies, input ];

      dispatch({
        type: 'updateProficiencies',
        id: character.id,
        proficiencies: newProficiencies,
      });
    }
    setSkillInput('');
  };

  return (
    <section className="Skills">
      <h3>Skills</h3>
      
      <Table>
        <thead>
          <tr>
            <th></th>
            <th>Mod</th>
          </tr>
        </thead>
        <tbody>
          {SKILLS.map(({ name, ability }) => (
            <tr
              key={name}
              className={character.proficiencies.includes(name) ? 'proficiency' : ''}
            >
              <td className="skill">
                {name}
                <span className="ability">({ability.substr(0,3)})</span>
              </td>
              <td className="modifier">
                {addSign(getSkillModifier(character, name))}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <form onSubmit={onSubmit}>
        <datalist id="skillDataList">
          {SKILLS.map(skill => {
            const name = skill.name.split(' ')
              .map(w => w[0].toUpperCase() + w.slice(1))
              .join(' ');
            return <option key={name}>{name}</option>
          })}
        </datalist>
        
        <Input
          type="text"
          list="skillDataList"
          onChange={onChange}
          placeholder="Change Proficiencies"
          value={skillInput}
        />
        <Button type="submit">Update</Button>
      </form>
    </section>
  );
};

export default Skills;
