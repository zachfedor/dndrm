import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { DispatchContext } from '../App';
import { ABILITIES } from '../constants';
import {
  getAbilityModifier,
  getHitPointStatus,
  getProficiencyBonus,
} from '../formulas';
import SpellSlots from '../CharacterSheet/SpellSlots';
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
        {ABILITIES.map(({ name, description }) => (
          <Stat
            key={name}
            label={name}
            value={getAbilityModifier(character, name)}
            sign={true}
            tooltip={description}
          />
        ))}
        <Stat label="Proficiency"
          value={getProficiencyBonus(character)}
          sign={true}
        />
        <Stat label="Armor Class"
          value={12}
        />
      </StatList>

      <p>
        Skills: {character.proficiencies.join(', ')}
      </p>

      {character.spellSlots && (
        <SpellSlots slots={character.spellSlots} toggleSpellSlot={toggleSpellSlot} />
      )}
    </article>
  );
};

export default CharacterCard;
