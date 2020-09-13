import React, { useContext, useState } from 'react';

import { DispatchContext } from '../App';
import { Button, Table } from '../atoms';
import { WEAPONS } from '../../constants';
import { UPDATE_CHARACTER } from '../../constants/actionTypes';
import { getWeaponAttack, getWeaponDamage } from '../../formulas';
import { MarkdownEditor } from '../molecules';
import { addSign } from '../../utils';
import './Weapons.css';


const WeaponProperties = ({ properties }) => {
  if (properties.length === 0) return null;
  return (
    <small className="properties">{properties.join(", ")}</small>
  );
};


const Weapons = ({ character }) => {
  const dispatch = useContext(DispatchContext);

  const { weapons } = character;

  const [editing, setEditing] = useState(false);
  const toggleEditing = () => setEditing(!editing);

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

      {editing ? (
        <>
        <p>editing.. </p>
        <Button onClick={toggleEditing}>
          Stop Editing
        </Button>
        </>
      ) : (
        <>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th title="Ability Modifier (+ Proficiency Bonus)">Attack</th>
              <th title="Damage Die + Ability Modifier">Damage</th>
              <th title="Check the PHB for more details">Properties</th>
            </tr>
          </thead>
          <tbody>
            {weapons.map((weapon, index) => (
              <tr
              key={weapon.type + index}
              className={weapon.proficiency ? 'proficiency' : ''}
              >
                <td>{weapon.name || WEAPONS[weapon.type].name}</td>
                <td>{addSign(getWeaponAttack(character, weapon))}</td>
                <td>{getWeaponDamage(character, weapon)}</td>
                <td><WeaponProperties properties={WEAPONS[weapon.type].properties} /></td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Button onClick={toggleEditing}>
          Edit Weapons
        </Button>

        <MarkdownEditor content={character.weaponNotes} handleSubmit={updateWeaponNotes} />
        </>
      )}
    </section>
  )
};

export default Weapons;
