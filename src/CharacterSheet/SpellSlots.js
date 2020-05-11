import React from 'react';

import { Table } from '../atoms';
import { CheckCircleArray } from '../molecules';
import './SpellSlots.css';

const SpellSlots = (props) => {
  const slotsPerLevel = props.slots;

  const createHandler = (level) => () => {
    console.log('burn spell at level', level);
  };

  return (
    <Table className="SpellSlots">
      <thead>
        <tr>
          <th colSpan={2}>Spell Slots</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(slotsPerLevel).map(level => (
          <tr key={level}>
            <td>
              {level}
            </td>
            <td>
              <CheckCircleArray
                color="blue"
                handleClick={createHandler(level)}
                values={slotsPerLevel[level]}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default SpellSlots;
