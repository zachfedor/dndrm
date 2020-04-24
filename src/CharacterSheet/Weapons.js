import React from 'react';

import { Table } from '../atoms';
import { WEAPONS } from '../constants';
import { getWeaponAttack, getWeaponDamage } from '../formulas';
import { addSign } from '../utils';
import './Weapons.css';


const Weapons = ({ character }) => {
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
    </section>
  )
};

export default Weapons;
