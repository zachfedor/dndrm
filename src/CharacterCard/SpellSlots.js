import React from 'react';

import './SpellSlots.css';

const SpellSlots = (props) => {
  const slotsPerLevel = props.slots;

  const burnSlot = (level) => {
    console.log(slotsPerLevel, level)
    slotsPerLevel[level].pop();
    slotsPerLevel[level].push(true);
  };

  return (
    <div className="SpellSlots">
      <legend>Spell Slots</legend>

      {Object.keys(slotsPerLevel).map(level => (
        <fieldset key={`level${level}`}>
          <label>{level}:</label>

          <div>
          {slotsPerLevel[level].map((slot, index) => (
            <input key={level + '-' + index} type="checkbox" checked={slot} onChange={() => burnSlot(level)}/>
          ))}
          </div>
        </fieldset>
      ))}
    </div>
  );
};

export default SpellSlots;
