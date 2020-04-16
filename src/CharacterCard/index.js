import React from 'react';

import StatList from './StatList';
import Stat from './Stat';
import './CharacterCard.css';

const getAbilityModifier = score => Math.floor((score - 10) / 2);


const CharacterCard = ({ character }) => {
  return (
    <article className="CharacterCard">
      <header>
        <h2>{character.name}</h2>  

        <dl className="hitpoints" title="Current Hit Points">
          <dt>HP:</dt>
          <dd>{character.hp}</dd>
        </dl>
      </header>

      <StatList>
        {character.abilities.map(({name, score}) => (
          <Stat
            key={name}
            label={name.substr(0,3)}
            value={getAbilityModifier(score)}
            sign={true}
            tooltip={`Ability Score: ${name}`}
          />
        ))}
      </StatList>

      <StatList>
        <Stat label="Insp" value={0} tooltip="Inspiration Points" />
        <Stat label="Prof" value={2} sign={true} tooltip="Proficiency Bonus" />
        <Stat label="AC" value={12} tooltip="Armor Class" />
        <Stat label="Spd" value={30} unit="ft" tooltip="Base Speed" />
        <Stat label="Init" value={2} sign={true} tooltip="Initiative Bonus" />
        <Stat label="Perc" value={0} tooltip="Passive Perception" />
      </StatList>
    </article>
  );
};

export default CharacterCard;
