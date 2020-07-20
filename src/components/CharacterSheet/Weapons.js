import React, { useContext } from 'react';

import { DispatchContext } from '../App';
import { Table } from '../atoms';
import { WEAPONS } from '../../constants';
import { UPDATE_CHARACTER } from '../../constants/actionTypes';
import { getWeaponAttack, getWeaponDamage } from '../../formulas';
import { MarkdownEditor } from '../molecules';
import { addSign } from '../../utils';
import './Weapons.css';


const Weapons = ({ character }) => {
  const dispatch = useContext(DispatchContext);
  const updateWeaponNotes = (weaponNotes) => dispatch({
    type: UPDATE_CHARACTER,
    id: character.id,
    character: {
      weaponNotes,
    },
  });

  return (
    <section className="Weapons">
      <h3>Weapons</h3>

      <Table>
        <thead>
          <tr>
            <th></th>
            <th title="Ability Modifier (+ Proficiency Bonus)">Attack</th>
            <th title="Damage Die + Ability Modifier">Damage</th>
            <th>Ability</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(character.weapons).map(weapon => (
            <tr
            key={weapon}
            className={character.weapons[weapon].proficiency ? 'proficiency' : ''}
            >
              <td>{weapon}</td>
              <td>{addSign(getWeaponAttack(character, weapon))}</td>
              <td>
                {`${getWeaponDamage(character, weapon)} ${WEAPONS[weapon].damageType}`}
              </td>
              <td>{character.weapons[weapon].ability.substr(0, 3)}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <MarkdownEditor content={character.weaponNotes} handleSubmit={updateWeaponNotes} />
    </section>
  )
};

export default Weapons;
