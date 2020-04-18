import React, { useState, useContext } from 'react';

import { DispatchContext } from '../App';
import { ABILITY_DESCRIPTIONS } from '../constants';
import { getAbilityModifier } from '../formulas';
import './Abilities.css';


const addSign = num => num < 0 ? `${num}` : `+${num}`;

const Abilities = (props) => {
  const dispatch = useContext(DispatchContext);
  const [abilities, setAbilities] = useState(props.abilities);
  const [currentlyEditing, setEditing] = useState();

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

      <table>
        <thead>
          <tr>
            <th></th>
            <th>Score</th>
            <th>Modifier</th>
          </tr>
        </thead>
        <tbody>
        {Object.keys(abilities).map(ability => (
          <tr key={ability}>
            <td title={ABILITY_DESCRIPTIONS[ability]}>{ability}</td>
            <td>
              {currentlyEditing === ability ? (
                <form onSubmit={onSubmit(ability)}>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    autoFocus
                    onChange={onChange(ability)}
                    value={abilities[ability]}
                  />
                  <input type="submit" value="Save" />
                </form>
              ) : (
                <button
                  onClick={() => setEditing(ability)}
                  title="Edit Ability"
                >
                  {abilities[ability]}
                </button>
              )}
            </td>
            <td>{addSign(getAbilityModifier(abilities[ability]))}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </section>
  );
};

export default Abilities;
