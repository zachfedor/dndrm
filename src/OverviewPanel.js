import React, { useContext } from 'react';

import { StateContext } from './App';
import CharacterCard from './CharacterCard';

const OverviewPanel = () => {
  const characters = useContext(StateContext).characters;

  return (
    <main>
      <h1>Overview</h1>

      {Object.keys(characters).map(id => (
        <CharacterCard key={id} character={characters[id]} />
      ))}
    </main>
  );    
};

export default OverviewPanel;
