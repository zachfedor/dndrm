import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { DispatchContext, StateContext } from './App';
import { Table, Button, Input } from './atoms';
import { RESET_COMBAT, UPDATE_COMBAT } from '../constants/actionTypes';
import { hitPointStatus } from '../formulas';
import './CombatPanel.css';


// TODO: Add new characters mid-encounter
const CombatPanel = () => {
  const dispatch = useContext(DispatchContext);
  const { characters } = useContext(StateContext);

  const [editing, setEditing] = useState(false);
  const [initiativeValues, setInitiativeValues] = useState({});
  const [conditionValues, setConditionValues] = useState({});

  const reset = () => {
    setInitiativeValues({})
    dispatch({ type: RESET_COMBAT });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({
      type: UPDATE_COMBAT,
      initiatives: initiativeValues,
      conditions: conditionValues,
    });
    setEditing(false);
  };

  const createInitiativeHandler = (id) => (event) => {
    setInitiativeValues({
      ...initiativeValues,
      [id]: event.target.value
    });
  };
  const createConditionsHandler = (id) => (event) => {
    setConditionValues({
      ...conditionValues,
      [id]: event.target.value
    });
  };

  const sortedByInitiative = Object.keys(characters).map(id => characters[id]).sort((a, b) => {
    if (a.initiative && b.initiative) {
      // if second (b) is higher than first (a), return greater than one value
      // which will push it closer to beginning of array showing list in descending order
      return b.initiative - a.initiative;
    }
    // TODO: handle randomization of ties?
    return a.id - b.id;
  });

  return (
    <main className="CombatPanel">
      <h1>Combat</h1>

      <form onSubmit={handleSubmit}>
        <Table>
          <thead>
            <tr>
              <th>Initiative</th>
              <th>Character</th>
              <th>HP</th>
              <th>Conditions</th>
            </tr>
          </thead>
          <tbody>
            {sortedByInitiative.map(({ id, initiative, hp, conditions }, index) => (
              <tr key={id}>
                <td>
                  {editing ? (
                    <Input
                      type='number'
                      autoFocus={index === 0}
                      min={0}
                      value={initiativeValues[id] ? initiativeValues[id] : (initiative || '')}
                      onChange={createInitiativeHandler(id)}
                    />
                  ) : initiative}
                </td>
                <td>
                  <Link to={`/characters/${id}`}>
                    {characters[id].name}
                  </Link>
                </td>
                <td className={hitPointStatus(hp.current, hp.max)}>
                  {hp.current}
                </td>
                <td>
                  {editing ? (
                    <Input
                      type="text"
                      value={conditionValues[id] ? conditionValues[id] : (conditions || '')}
                      onChange={createConditionsHandler(id)}
                    />
                  ) : conditions}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {editing && (
          <div className="CombatButtons">
            <Button type="submit">Save</Button>
            {/* <Button type="button" onClick={() => console.log('Add Monster')}>Add Monster</Button> */}
          </div>
        )}
      </form>

      {!editing && (
        <div className="CombatButtons">
          <Button type="button" onClick={() => setEditing(true)}>Edit</Button>
          <Button type="button" onClick={reset}>Reset Initiative</Button>
        </div>
      )}
    </main>
  );
};

export default CombatPanel;
