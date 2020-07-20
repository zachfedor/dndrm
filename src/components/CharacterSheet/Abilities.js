import React, { useContext } from 'react';

import { DispatchContext } from '../App';
import { Table } from '../atoms';
import { ABILITIES } from '../../constants';
import { UPDATE_CHARACTER } from '../../constants/actionTypes';
import { getAbilityModifier, getSaveModifier } from '../../formulas';
import { LabeledCheckCircle } from '../molecules';
import { addSign } from '../../utils';
import './Abilities.css';


const Abilities = ({ character }) => {
  const dispatch = useContext(DispatchContext);

  const updateSavingThrows = (ability) => (isAddingSave) => {
    dispatch({
      type: UPDATE_CHARACTER,
      id: character.id,
      character: {
        savingThrows: isAddingSave
          ? [ ...character.savingThrows, ability ].sort()
          : character.savingThrows.filter(a => a !== ability),
      },
    });
  }

  return (
    <section className="Abilities">
      <h3>Abilities</h3>

      <Table>
        <thead>
          <tr>
            <th></th>
            <th>Score</th>
            <th>Mod</th>
            <th>Save</th>
          </tr>
        </thead>
        <tbody>
        {ABILITIES.map(({ name, description }) => (
          <tr
            key={name}
            className={character.savingThrows.includes(name) ? 'proficiency' : ''}
          >
            <td title={description}>
              <LabeledCheckCircle
                id={name}
                checked={character.savingThrows.includes(name)}
                label={name}
                handleClick={updateSavingThrows(name)}
              />
            </td>
            <td>{character.abilities[name]}</td>
            <td>{addSign(getAbilityModifier(character, name))}</td>
            <td>{addSign(getSaveModifier(character, name))}</td>
          </tr>
        ))}
        </tbody>
      </Table>
    </section>
  );
};

export default Abilities;
