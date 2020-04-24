import React from 'react';

import CharacterHeader from './CharacterHeader';
import Abilities from './Abilities';
import Skills from './Skills';
import './index.css';

const CharacterSheet = ({ character }) => {
  return (
    <article className="CharacterSheet">
      <CharacterHeader character={character} />

      <Abilities character={character} />
      <Skills character={character} />
    </article>
  );
};

export default CharacterSheet;
