import React, { useEffect } from 'react';

import CharacterCard from './CharacterCard';
import './App.css';


function App() {
  useEffect(() => {
    fetch('/api').then(res => console.log(res));
  });

  const characters = [{
    name: 'Character One',
    hp: 41,
    abilities: [
      { name: 'Strength', score: 10 },
      { name: 'Dexterity', score: 15 },
      { name: 'Constitution', score: 14 },
      { name: 'Intelligence', score: 16 },
      { name: 'Wisdom', score: 12 },
      { name: 'Charisma', score: 8 },
    ],
  }, {
    name: 'Character Two',
    hp: 36,
    abilities: [
      { name: 'Strength', score: 10 },
      { name: 'Dexterity', score: 15 },
      { name: 'Constitution', score: 14 },
      { name: 'Intelligence', score: 16 },
      { name: 'Wisdom', score: 12 },
      { name: 'Charisma', score: 8 },
    ],
  }];

  return (
    <div className="App">
      <header className="App-header">
        <h1>D&amp;D Character Sheet Manager</h1>
      </header>

      <main>
        {characters.map(character => (
          <CharacterCard key={character.name} character={character} />
        ))}
      </main>
    </div>
  );
}

export default App;
