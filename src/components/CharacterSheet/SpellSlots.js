import React, { useContext } from 'react';

import { DispatchContext } from '../App';
import { Ordinal, Table } from '../atoms';
import { UPDATE_CHARACTER } from '../../constants/actionTypes';
import { CheckCircleArray } from '../molecules';
import { toggleByIndex } from '../../utils';
import './SpellSlots.css';

const SpellSlots = ({ character }) => {
  const dispatch = useContext(DispatchContext);
  const slotsPerLevel = character.spellSlots;

  const createHandler = (level) => (index) => dispatch({
    type: UPDATE_CHARACTER,
    id: character.id,
    character: {
      spellSlots: {
        ...slotsPerLevel,
        [level]: toggleByIndex(slotsPerLevel[level], index),
      },
    },
  });

  return (
    <Table className="SpellSlots">
      <thead>
        <tr>
          <th>Level</th>
          <th>Spell Slots</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(slotsPerLevel).map(level => (
          <tr key={level}>
            <td>
              <Ordinal num={level} />
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
