import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { DispatchContext } from '../App';
import {
  getAbilityModifier,
  getHitPointStatus,
  getPassiveSkillScore,
  getProficiencyBonus,
} from '../formulas';
import SpellSlots from './SpellSlots';
import StatList from './StatList';
import Stat from './Stat';
import './CharacterCard.css';


const CharacterCard = ({ character }) => {
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
        <h2>
          <Link to={`/players/${character.id}`}>{character.name}</Link>
        </h2>

        <p>{character.race} {character.class}</p>

        <dl className="hitpoints" title="Current Hit Points">
          <dt>HP:</dt>
          <dd className={getHitPointStatus(character)}>{character.hp.current}</dd>
        </dl>
      </header>

      <StatList>
        {Object.keys(character.abilities).map(name => (
          <Stat
            key={name}
            label={name.substr(0,3)}
            value={getAbilityModifier(character, name)}
            sign={true}
            tooltip={`Ability Score: ${name}`}
          />
        ))}
        <Stat label="Insp"
          value={0}
          tooltip="Inspiration Points"
        />
        <Stat label="Prof"
          value={getProficiencyBonus(character)}
          sign={true}
          tooltip="Proficiency Bonus"
        />
        <Stat label="AC"
          value={12}
          tooltip="Armor Class"
        />
        <Stat label="Spd"
          value={30}
          unit="ft"
          tooltip="Base Speed"
        />
        <Stat label="Init"
          value={getAbilityModifier(character, 'dexterity')}
          sign={true}
          tooltip="Initiative Bonus"
        />
        <Stat label="Perc"
          value={getPassiveSkillScore(character, 'perception')}
          tooltip="Passive Perception"
        />
      </StatList>

      {character.spellSlots && (
        <SpellSlots slots={character.spellSlots} toggleSpellSlot={toggleSpellSlot} />
      )}
    </article>
  );
};

export default CharacterCard;
