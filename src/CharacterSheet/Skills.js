import React, { useContext, useState } from 'react';

import { DispatchContext } from '../App';
import { Button, Input } from '../atoms';
import { SKILLS } from '../constants';
import { getAbilityModifier, getProficiencyBonus } from '../formulas';
import './Skills.css';

const addSign = num => num < 0 ? `${num}` : `+${num}`;

const Skills = (props) => {
  const dispatch = useContext(DispatchContext);
  const [skillInput, setSkillInput] = useState('');

  const characterSkills = SKILLS.map(skill => {
    const isProficient = props.proficiencies.includes(skill.name);
    const base = getAbilityModifier(props.abilities[skill.ability]);
    const bonus = isProficient ? getProficiencyBonus(props.level) : 0;
    const modifier = addSign(base + bonus);

    return {
      ...skill,
      isProficient,
      modifier,
    };
  });

  const onChange = (event) => setSkillInput(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    const input = skillInput.toLowerCase();

    if (SKILLS.filter(s => s.name === input).length) {
      const proficiencies = props.proficiencies.includes(input)
        ? props.proficiencies.filter(skill => skill !== input)
        : [ ...props.proficiencies, input ];

      dispatch({
        type: 'updateProficiencies',
        id: props.id,
        proficiencies,
      });
    }
    setSkillInput('');
  };

  return (
    <section className="Skills">
      <h3>Skills</h3>
      
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Ability</th>
            <th>Mod</th>
          </tr>
        </thead>
        <tbody>
          {characterSkills.map(skill => (
            <tr key={skill.name} className={skill.isProficient ? 'proficiency' : ''}>
              <td className="skill">
                {skill.name}
              </td>
              <td className="ability">
                {skill.ability.substr(0,3)}
              </td>
              <td className="modifier">
                {skill.modifier}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
