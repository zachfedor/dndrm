import React, { useContext } from 'react';

import { DispatchContext } from '../App';
import { Table } from '../atoms';
import { SKILLS } from '../constants';
import { getSkillModifier } from '../formulas';
import { LabeledCheckCircle } from '../molecules';
import { addSign } from '../utils';
import './Skills.css';


const Skills = ({ character }) => {
  const dispatch = useContext(DispatchContext);

  const updateProficiencies = (skill) => (isAddingSkill) => {
    dispatch({
      type: 'updateCharacter',
      id: character.id,
      character: {
        proficiencies: isAddingSkill
          ? [ ...character.proficiencies, skill ].sort()
          : character.proficiencies.filter(s => s !== skill),
      },
    });
  };

  return (
    <section className="Skills">
      <h3>Skills</h3>
      
      <Table>
        <thead>
          <tr>
            <th></th>
            <th>Ability</th>
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
                <LabeledCheckCircle
                  id={name} 
                  checked={character.proficiencies.includes(name)}
                  label={name}
                  handleClick={updateProficiencies(name)}
                />
              </td>
              <td>
                {ability.substr(0,3)}
              </td>
              <td className="modifier">
                {addSign(getSkillModifier(character, name))}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <p>Passive Skill = 10 + Modifier</p>
    </section>
  );
};

export default Skills;
