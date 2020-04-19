import React, { useState, useContext } from 'react';

import { DispatchContext } from '../App';
import { ABILITY_DESCRIPTIONS } from '../constants';
import { getAbilityModifier, getProficiencyBonus } from '../formulas';
import { Button, Input, Table } from '../atoms';
import './Abilities.css';


const addSign = num => num < 0 ? `${num}` : `+${num}`;

const Abilities = (props) => {
  const dispatch = useContext(DispatchContext);
  const [abilities, setAbilities] = useState(props.abilities);
  const [currentlyEditing, setEditing] = useState();

  const bonus = addSign(getProficiencyBonus(props.level));

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
        {Object.keys(abilities).map(ability => (
          <tr key={ability} className={props.savingThrows.includes(ability) ? 'proficiency' : ''}>
            <td title={ABILITY_DESCRIPTIONS[ability]}>{ability}</td>
            <td>
              {currentlyEditing === ability ? (
                <form onSubmit={onSubmit(ability)}>
                  <Input
                    type="number"
                    min="1"
                    max="30"
                    autoFocus
                    onChange={onChange(ability)}
                    value={abilities[ability]}
                  />
                  <Button type="submit">Save</Button>
                </form>
              ) : (
                <Button
                  className="editable"
                  onClick={() => setEditing(ability)}
                  title="Edit Ability"
                >
                  {abilities[ability]}
                </Button>
              )}
            </td>
            <td>{addSign(getAbilityModifier(abilities[ability]))}</td>
            <td>{props.savingThrows.includes(ability) && bonus}</td>
          </tr>
        ))}
        </tbody>
      </Table>
    </section>
  );
};

export default Abilities;
