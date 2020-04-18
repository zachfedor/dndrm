import React from 'react';

import './SpellSlots.css';

const SpellSlots = (props) => {
  const slotsPerLevel = props.slots;

  return (
    <div className="SpellSlots">
      <legend>Spell Slots</legend>

      {Object.keys(slotsPerLevel).map(level => (
        <fieldset key={`level${level}`}>
          <label>{level}:</label>

          <div>
          {slotsPerLevel[level].map((slot, index) => (
            <input
              key={index}
              type="checkbox"
              checked={slot}
              onChange={() => props.toggleSpellSlot(level, index)}
            />
          ))}
          </div>
        </fieldset>
      ))}
    </div>
  );
};

export default SpellSlots;
