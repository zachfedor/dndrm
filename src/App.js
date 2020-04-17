import React, { useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

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

      <Tabs>
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Characters</Tab>
          <Tab>NPCs</Tab>
          <Tab>Monsters</Tab>
        </TabList>

        <TabPanel>
          {characters.map(character => (
            <CharacterCard key={character.name} character={character} />
          ))}
        </TabPanel>

        <TabPanel>
          <p>characters panel</p>
        </TabPanel>

        <TabPanel>
          <p>npcs panel</p>
        </TabPanel>

        <TabPanel>
          <p>monsters panel</p>
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default App;
