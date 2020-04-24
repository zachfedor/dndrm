import React, { useState, useContext } from 'react';

import { DispatchContext } from '../App';
import { ABILITIES } from '../constants';
import { getAbilityModifier, getSaveModifier } from '../formulas';
import { Button, Input, Table } from '../atoms';
import './Abilities.css';


const addSign = num => num < 0 ? `${num}` : `+${num}`;

const Abilities = (props) => {
  const { character } = props;

  const dispatch = useContext(DispatchContext);
  const [abilities, setAbilities] = useState(character.abilities);
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
      id: character.id,
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
        {ABILITIES.map(({ name, description }) => (
          <tr
            key={name}
            className={character.savingThrows.includes(name) ? 'proficiency' : ''}
          >
            <td title={description}>{name}</td>
            <td>
              {currentlyEditing === name ? (
                <form onSubmit={onSubmit(name)}>
                  <Input
                    type="number"
                    min="1"
                    max="30"
                    autoFocus
                    onChange={onChange(name)}
                    value={abilities[name]}
                  />
                  <Button type="submit">Save</Button>
                </form>
              ) : (
                <Button
                  className="editable"
                  onClick={() => setEditing(name)}
                  title="Edit Ability"
                >
                  {abilities[name]}
                </Button>
              )}
            </td>
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
