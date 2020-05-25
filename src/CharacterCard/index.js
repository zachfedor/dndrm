import React from 'react';
import { Link } from 'react-router-dom';

import { ABILITIES } from '../constants';
import {
  getAbilityModifier,
  getHitPointStatus,
  getProficiencyBonus,
} from '../formulas';
import SpellSlots from '../CharacterSheet/SpellSlots';
import StatList from './StatList';
import Stat from './Stat';
import { addSign } from '../utils';
import './CharacterCard.css';


const CharacterCard = ({ character }) => {
  return (
    <article className="CharacterCard">
      <Link to={`/players/${character.id}`}>
        <header>
          <h2>{character.name}</h2>

          <p>{character.race} {character.class} {character.level}</p>

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
              tooltip={description}
            >
              {addSign(getAbilityModifier(character, name))}
            </Stat>
          ))}
          <Stat label="Proficiency">
            {addSign(getProficiencyBonus(character))}
          </Stat>
          <Stat label="Armor Class">
            {character.armorClass}
          </Stat>
        </StatList>

        <p>
          Skills: {character.proficiencies.join(', ')}
        </p>
      </Link>

      {character.spellSlots && (
        <SpellSlots character={character} />
      )}
    </article>
  );
};

export default CharacterCard;
