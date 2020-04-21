import React, { useState, useContext } from 'react';

import { DispatchContext } from '../App';
import { ABILITIES } from '../constants';
import { getAbilityModifier, getProficiencyBonus } from '../formulas';
import { Button, Input, Table } from '../atoms';
import './Abilities.css';


const addSign = num => num < 0 ? `${num}` : `+${num}`;

const Abilities = (props) => {
  const dispatch = useContext(DispatchContext);
  const [abilities, setAbilities] = useState(props.abilities);
  const [currentlyEditing, setEditing] = useState();

  const getSavingThrow = (ability) => {
    const base = getAbilityModifier(abilities[ability]);
    const bonus = props.savingThrows.includes(ability)
      ? getProficiencyBonus(props.level) : 0;
    return base + bonus;
  };

  const onChange = (ability) => (event) => {
    setAbilities({
      ...abilities,
      [ability]: parseInt(event.target.value)
    });
  };

  const onSubmit = (ability) => (event) => {
    event.preventDefault();
    setEditing(null);
    dispatch({
      type: 'changeAbilityScore',
      id: props.id,
      ability,
      score: abilities[ability]
    });
  };

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
        {ABILITIES.map(ability => (
          <tr
            key={ability.name}
            className={props.savingThrows.includes(ability.name) ? 'proficiency' : ''}
          >
            <td title={ability.description}>{ability.name}</td>
            <td>
              {currentlyEditing === ability.name ? (
                <form onSubmit={onSubmit(ability.name)}>
                  <Input
                    type="number"
                    min="1"
                    max="30"
                    autoFocus
                    onChange={onChange(ability.name)}
                    value={abilities[ability.name]}
                  />
                  <Button type="submit">Save</Button>
                </form>
              ) : (
                <Button
                  className="editable"
                  onClick={() => setEditing(ability.name)}
                  title="Edit Ability"
                >
                  {abilities[ability.name]}
                </Button>
              )}
            </td>
            <td>{addSign(getAbilityModifier(abilities[ability.name]))}</td>
            <td>{addSign(getSavingThrow(ability.name))}</td>
          </tr>
        ))}
        </tbody>
      </Table>
    </section>
  );
};

export default Abilities;
