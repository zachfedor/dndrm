import React, { useContext, useState } from 'react';

import { DispatchContext } from '../App';
import { Button, Input, Table } from '../atoms';
import { UPDATE_CHARACTER } from '../../constants/actionTypes';
import { hitPointStatus } from '../../formulas';
import { CheckCircleArray } from '../molecules';
import { cx, toggleByIndex } from '../../utils';
import './HitPoints.css';


const HitPoints = ({ character }) => {
  const { current, max, temporary, hitDice } = character.hp;

  const dispatch = useContext(DispatchContext);

  const [hpInput, changeHPInput] = useState(null);
  const handleHPInput = (event) => changeHPInput(parseInt(event.target.value));
  const updateHP = (type) => () => {
    if (hpInput == null) return;
    const newHP = {};

    if (type === 'heal') {
      // add restored hit points to current value
      newHP.current = current + hpInput;

      // cap hit points at maximum value
      if (newHP.current > max) newHP.current = max;

    } else if (type === 'temp') {
      // replace temporary hit points only if the new value is greater
      if (hpInput > temporary) newHP.temporary = hpInput;

    } else {
      // remove damage from temporary hit points first
      const remainder = temporary - hpInput;

      if (remainder >= 0) {
        // if temporary hit points remain, set remainder as new value
        newHP.temporary = remainder;

      } else {
        // if remainder is negative, remove temporary hit points...
        newHP.temporary = 0;

        // and "subtract" the remaining damage from the current hit points
        newHP.current = current + remainder;
        // TODO: handle insta-death

        // prevent negative hit points
        if (newHP.current < 0) newHP.current = 0;
      }
    }

    dispatch({
      type: UPDATE_CHARACTER,
      id: character.id,
      character: {
        hp: { ...character.hp, ...newHP },
      },
    });
    changeHPInput(null);
  };

  const createSaveHandler = (type) => (index) => dispatch({
    type: UPDATE_CHARACTER,
    id: character.id,
    character: {
      hp: {
        ...character.hp,
        [type]: toggleByIndex(character.hp[type], index),
      },
    },
  });

  return (
    <section className="HitPoints">
      <h3>Hit Points</h3>

      <div className="row">
        <Table className="HitPoints-current">
          <thead>
            <tr>
              <th>Current</th>
              <th>Max</th>
              <th>Temp</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={cx('current', hitPointStatus(current, max))}>{current}</td>
              <td className="max">{max}</td>
              <td>{temporary}</td>
            </tr>
          </tbody>
        </Table>

        <div className="HitPoints-change">
          <div>
            <Input
              type="number"
              min="0"
              onChange={handleHPInput}
              placeholder="0"
              value={hpInput || ''}
            />
          </div>

          <div>
            <Button onClick={updateHP('heal')}>Heal</Button>
            {/* <Button onClick={updateHP('temp')}>Temp</Button> */}
            <Button onClick={updateHP('damage')}>Damage</Button>
          </div>
        </div>
      </div>

      <div className="row">
        <Table className="HitPoints-dice">
          <thead>
            <tr>
              <th>Hit Dice</th>
              <th>Remaining</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{hitDice}</td>
              <td>1</td>
            </tr>
          </tbody>
        </Table>

        <Table className="HitPoints-death">
          <thead>
            <tr>
              <th>Death Saves</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <CheckCircleArray
                  color="green"
                  handleClick={createSaveHandler('successes')}
                  label="Successes"
                  values={character.hp.successes}
                /> 
              </td>
            </tr>
            <tr>
              <td>
                <CheckCircleArray
                  handleClick={createSaveHandler('failures')}
                  label="Failures"
                  values={character.hp.failures}
                /> 
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </section>
  );
};

export default HitPoints;
