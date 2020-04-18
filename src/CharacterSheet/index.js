import React from 'react';

import Abilities from './Abilities';
import './index.css';

const CharacterSheet = (props) => {
  const { character } = props;

  return (
    <article className="CharacterSheet">
      <header>
        <h2>{character.name}</h2>
      </header>

      <Abilities abilities={character.abilities} id={character.id} />
    </article>
  );
};

export default CharacterSheet;
