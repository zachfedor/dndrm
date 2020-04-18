import React, { useContext } from 'react';

import { DispatchContext } from '../App';
import SpellSlots from './SpellSlots';
import StatList from './StatList';
import Stat from './Stat';
import './CharacterCard.css';

const getAbilityModifier = score => Math.floor((score - 10) / 2);


const CharacterCard = ({ character }) => {
  let hpStatus = 'healthy';
  if (character.hp.current / character.hp.max < 0.33) hpStatus = 'deathly';
  else if (character.hp.current / character.hp.max < 0.66) hpStatus = 'bloody';

  const dispatch = useContext(DispatchContext);
  const toggleSpellSlot = (level, slot) => dispatch({
    type: 'toggleSpellSlot',
    characterID: character.id,
    level,
    slot
  });

  return (
    <article className="CharacterCard">
      <header>
        <h2>{character.name}</h2>  

        <dl className="hitpoints" title="Current Hit Points">
          <dt>HP:</dt>
          <dd className={hpStatus}>{character.hp.current}</dd>
        </dl>
      </header>

      <StatList>
        {Object.keys(character.abilities).map(name => (
          <Stat
            key={name}
            label={name.substr(0,3)}
            value={getAbilityModifier(character.abilities[name])}
            sign={true}
            tooltip={`Ability Score: ${name}`}
          />
        ))}
        <Stat label="Insp" value={0} tooltip="Inspiration Points" />
        <Stat label="Prof" value={2} sign={true} tooltip="Proficiency Bonus" />
        <Stat label="AC" value={12} tooltip="Armor Class" />
        <Stat label="Spd" value={30} unit="ft" tooltip="Base Speed" />
        <Stat label="Init" value={2} sign={true} tooltip="Initiative Bonus" />
        <Stat label="Perc" value={0} tooltip="Passive Perception" />
      </StatList>

      {character.spellSlots && (
        <SpellSlots slots={character.spellSlots} toggleSpellSlot={toggleSpellSlot} />
      )}
    </article>
  );
};

export default CharacterCard;
