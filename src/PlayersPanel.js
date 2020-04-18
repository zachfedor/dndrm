import React, { useContext } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { StateContext } from './App';
import CharacterSheet from './CharacterSheet';

const PlayersPanel = () => {
  const characters = useContext(StateContext).characters;

  return (
    <main className="PlayersPanel">
      <Tabs>
        <TabList>
          {Object.keys(characters).map(id => (
            <Tab key={id}>{characters[id].name}</Tab>
          ))}
        </TabList>

        {Object.keys(characters).map(id => (
          <TabPanel key={id}>
            <CharacterSheet character={characters[id]} />
          </TabPanel>
        ))}
      </Tabs>
    </main>
  );    
};

export default PlayersPanel;
