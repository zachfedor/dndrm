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
    abilities: {
      strength: 10,
      dexterity: 15,
      constitution: 14,
      intelligence: 16,
      wisdom: 12,
      charisma: 8,
    },
  }, {
    name: 'Character Two',
    hp: 36,
    abilities: {
      strength: 10,
      dexterity: 15,
      constitution: 14,
      intelligence: 16,
      wisdom: 12,
      charisma: 8,
    },
    spellSlots: {
      1: [true, true, false],
      2: [true]
    }
  }];

  return (
    <div className="App">
      <header className="App-header">
        <h1>D<span>&amp;</span>DRM</h1>
      </header>

      <Tabs>
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Players</Tab>
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
