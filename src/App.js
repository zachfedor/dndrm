import React, { useEffect } from 'react';

import StatList from './StatList';
import Stat from './Stat';
import './App.css';

const getAbilityModifier = score => Math.floor((score - 10) / 2);

function App() {
  useEffect(() => {
    fetch('/api').then(res => console.log(res));
  });

  const abilities = [
    { name: 'Strength', score: 10 },
    { name: 'Dexterity', score: 15 },
    { name: 'Constitution', score: 14 },
    { name: 'Intelligence', score: 16 },
    { name: 'Wisdom', score: 12 },
    { name: 'Charisma', score: 8 },
  ]

  return (
    <div className="App">
      <header className="App-header">
        <h1>D&amp;D Character Sheet Manager</h1>
      </header>

      <main>
        <StatList>
          {abilities.map(({name, score}) => (
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
      </main>
    </div>
  );
}

export default App;
