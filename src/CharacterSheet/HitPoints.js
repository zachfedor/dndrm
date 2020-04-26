import React, { useState } from 'react';

import { Button, Input, Table } from '../atoms';
import { hitPointStatus } from '../formulas';
import { CheckCircleArray } from '../molecules';
import { cx } from '../utils';
import './HitPoints.css';


const HitPoints = ({ character }) => {
  const [successes, setSuccesses ] = useState([false, false, false]);
  const [failures, setFailures ] = useState([false, false, false]);

  const { current, max, temporary, hitDice } = character.hp;

  return (
    <section className="HitPoints">
      <h3>Hit Points</h3>

      <div className="row">
        <Table className="HitPoints-current">
          <thead>
            <tr>
              <th>Current</th>
              <th>Temporary</th>
              <th>Maximum</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={cx('current', hitPointStatus(current))}>{current}</td>
              <td className="temporary">{temporary}</td>
              <td className="maximum">{max}</td>
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
                  handleClick={setSuccesses}
                  label="Successes"
                  values={successes}
                /> 
              </td>
            </tr>
            <tr>
              <td>
                <CheckCircleArray
                  handleClick={setFailures}
                  label="Failures"
                  values={failures}
                /> 
              </td>
            </tr>
          </tbody>
        </Table>
      </div>

      <div className="HitPoints-change">
        <label>
          Receive
          <Input placeholder="Number of Points"/>
        </label>
        <Button>Health</Button>
        <Button>Temporary</Button>
        <Button>Damage</Button>
      </div>

      <div className="HitPoints-dice">
        <label>
          Hit Dice
          <Input placeholder="Dice Remaining" />
        </label>

        <label>
          Total
          <Input value={hitDice} onChange={(e) => console.log(e.target.value)} />
        </label>
      </div>
    </section>
  );
};

export default HitPoints;
