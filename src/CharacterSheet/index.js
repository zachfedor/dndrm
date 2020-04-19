import React from 'react';

import CharacterHeader from './CharacterHeader';
import Abilities from './Abilities';
import Skills from './Skills';
import './index.css';

const CharacterSheet = (props) => {
  const { character } = props;

  return (
    <article className="CharacterSheet">
      <CharacterHeader {...character} />

      <Abilities {...character} />
      <Skills {...character} />
    </article>
  );
};

export default CharacterSheet;
