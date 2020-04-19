import React from 'react';

import Abilities from './Abilities';
import Skills from './Skills';
import './index.css';

const CharacterSheet = (props) => {
  const { character } = props;

  return (
    <article className="CharacterSheet">
      <header>
        <h2>{character.name}</h2>
      </header>

      <Abilities {...character} />
      <Skills {...character} />
    </article>
  );
};

export default CharacterSheet;
