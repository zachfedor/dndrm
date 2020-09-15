import React, { useContext, useState } from 'react';

import { DispatchContext } from '../App';
import {
  Button,
  CheckCircle,
  Input,
  Select,
  Table,
} from '../atoms';
import { WEAPONS, WEAPON_PROPS } from '../../constants';
import { UPDATE_CHARACTER } from '../../constants/actionTypes';
import {
  getWeaponAbility,
  getWeaponAttack,
  getWeaponDamage
} from '../../formulas';
import { MarkdownEditor } from '../molecules';
import { addSign } from '../../utils';
import './Weapons.css';


const WeaponProperties = ({ properties }) => {
  return (
    <small className="properties">
      {properties.map(property => (
        <span
          key={property}
          title={WEAPON_PROPS[property.split(' ')[0].toLowerCase()]}
        >
          {property}
        </span>
      ))}
    </small>
  );
};


const WeaponForm = ({ character, editing, handleClose, handleSubmit }) => {
  const [formState, setFormState] = useState(character.weapons[editing] || {});

  const changeFormField = (key) => (event) => {
    let val = event.target.value;
    if (key === 'bonus') val = Number(val);

    if (key === 'type') {
      // Switching weapon types should reset the form
      setFormState({ type: val });
    } else {
      setFormState({ ...formState, [key]: val });
    }
  };
  const toggleProficiency = (proficiency) => {
    setFormState({ ...formState, proficiency });
  };

  const onClose = (event) => {
    event.preventDefault();
    handleClose();
  };
  const onSubmit = (event) => {
    event.preventDefault();
    const weapon = { type: formState.type };
    if (!!formState.name) weapon.name = formState.name;
    if (formState.proficiency) weapon.proficiency = formState.proficiency;
    if (formState.bonus) weapon.bonus = formState.bonus;
    if (!!formState.ability) weapon.ability = formState.ability;

    handleSubmit(editing, weapon);
  };

  const abilityDisabled = !formState.type
    || !WEAPONS[formState.type].properties.includes("Finesse");
  const defaultAbility = !formState.type ? ""
    : getWeaponAbility({ type: formState.type });

  const attack = !formState.type ? '-' : addSign(getWeaponAttack(character, formState));
  const damage = !formState.type ? '-' : getWeaponDamage(character, formState);

  return (
    <form className="WeaponForm">
      <div className="rows">
        <div>
          <label htmlFor="type">
            <span title="Select a weapon from the standard list in the PHB.">
              Type:
            </span>
            <Select
              id="type"
              onChange={changeFormField('type')}
              value={formState.type || ""}
            >
              <option value="">-</option>
              {Object.keys(WEAPONS).map(w => (
                <option key={w} value={w}>{WEAPONS[w].name}</option>
              ))}
            </Select>
          </label>

          <label htmlFor="name">
            <span title="(Optional) Display a different name for unique magic weapons.">
              Name:
            </span>
            <Input
              id="name"
              onChange={changeFormField('name')}
              value={formState.name || ""}
            />
          </label>
        </div>

        <div>
          <label htmlFor="proficiency">
            <span title="Does your class, race, or background give you a proficiency for this weapon?">
              Proficiency:
            </span>
            <CheckCircle
              id="proficiency"
              checked={formState.proficiency || false}
              handleClick={toggleProficiency}
            />
          </label>

          <label htmlFor="bonus">
            <span title="Some magic weapons give a bonus to the attack and damage rolls.">
              Bonus:
            </span>
            <Select
              id="bonus"
              onChange={changeFormField('bonus')}
              value={formState.bonus || ""}
            >
              <option value={0}>-</option>
              <option value={1}>+1</option>
              <option value={2}>+2</option>
              <option value={3}>+3</option>
            </Select>
          </label>

          <label htmlFor="ability">
            <span title="Melee weapons use your Strength modifier, ranged weapons use Dexterity. Weapons with the Finesse property allow you to choose.">
              Ability:
            </span>
            <Select
              id="ability"
              disabled={abilityDisabled}
              onChange={changeFormField('ability')}
              value={formState.ability || defaultAbility}
            >
              <option value="strength">Strength</option>
              <option value="dexterity">Dexterity</option>
            </Select>
          </label>
        </div>
      </div>

      <Table>
        <thead>
          <tr>
            <th title="Ability Modifier (+ Proficiency Bonus)">Attack</th>
            <th title="Damage Die + Ability Modifier">Damage</th>
            <th title="Check the PHB for more details">Properties</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{attack}</td>
            <td>{damage}</td>
            <td>
              {!formState.type ? '-' : (
                <WeaponProperties properties={WEAPONS[formState.type].properties} />
              )}
            </td>
          </tr>
        </tbody>
      </Table>
        
      <div className="buttonGroup">
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSubmit}>Save</Button>
      </div>
    </form>
  );
};


const Weapons = ({ character }) => {
  const dispatch = useContext(DispatchContext);
  const updateCharacter = (fields) => dispatch({
    type: UPDATE_CHARACTER,
    id: character.id,
    character: fields,
  });

  const [managing, setManaging] = useState(false);
  const toggleManaging = () => setManaging(!managing);

  const [editing, setEditing] = useState(null);

  const deleteWeapon = (index) => {
    if (window.confirm("Are you sure you want to delete this weapon?")) {
      updateCharacter({
        weapons: [
          ...character.weapons.slice(0, index),
          ...character.weapons.slice(index + 1)
        ],
      });
    }
  };

  const submitWeaponForm = (index, weapon) => {
    updateCharacter({
      weapons: [
        ...character.weapons.slice(0, index),
        weapon,
        ...character.weapons.slice(index + 1)
      ],
    });
    setEditing(null);
  };
    
  const updateWeaponNotes = (weaponNotes) => updateCharacter({ weaponNotes });

  return (
    <section className="Weapons">
      <h3>Weapons</h3>

      {editing !== null ? (
        <WeaponForm
          character={character}
          editing={editing}
          handleClose={() => setEditing(null)}
          handleSubmit={submitWeaponForm}
        />
      ) : (
        <>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th title="Ability Modifier (+ Proficiency Bonus)">Attack</th>
              <th title="Damage Die + Ability Modifier">Damage</th>
              {managing ? (
                <th>Actions</th>
              ) : (
                <th title="Check the PHB for more details">Properties</th>
              )}
            </tr>
          </thead>
          <tbody>
            {character.weapons.map((weapon, index) => (
              <tr
              key={weapon.type + index}
              className={weapon.proficiency ? 'proficiency' : ''}
              >
                <td>{weapon.name || WEAPONS[weapon.type].name}</td>
                <td>{addSign(getWeaponAttack(character, weapon))}</td>
                <td>{getWeaponDamage(character, weapon)}</td>
                <td>
                  {managing ? (
                    <nav>
                      <Button onClick={() => setEditing(index)}>Edit</Button>
                      <Button onClick={() => deleteWeapon(index)}>Delete</Button>
                    </nav>
                  ) : (
                    <WeaponProperties properties={WEAPONS[weapon.type].properties} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="buttonGroup">
          {managing && (
            <Button onClick={() => setEditing(character.weapons.length)}>
              Add Weapon
            </Button>
          )}

          <Button onClick={toggleManaging}>
            {managing ? 'Show Properties' : 'Show Actions'}
          </Button>
        </div>

        <MarkdownEditor content={character.weaponNotes} handleSubmit={updateWeaponNotes} />
        </>
      )}
    </section>
  )
};

export default Weapons;
