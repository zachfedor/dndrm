import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import CharacterHeader from './CharacterHeader';
import Abilities from './Abilities';
import Skills from './Skills';
import Weapons from './Weapons';
import './index.css';

const CharacterSheet = ({ character }) => {
  return (
    <article className="CharacterSheet">
      <CharacterHeader character={character} />

      <Abilities character={character} />
      <Skills character={character} />

      <Tabs>
        <TabList>
          <Tab>Weapons</Tab>
          <Tab>Spells</Tab>
          <Tab>Features</Tab>
          <Tab>Equipment</Tab>
          <Tab>Details</Tab>
        </TabList>

        <TabPanel>
          <Weapons character={character} />
        </TabPanel>

        <TabPanel>
          <p>Spells panel</p>
        </TabPanel>

        <TabPanel>
          <p>Features panel</p>
        </TabPanel>

        <TabPanel>
          <p>Equipment panel</p>
        </TabPanel>

        <TabPanel>
          <p>Details panel</p>
        </TabPanel>
      </Tabs>
    </article>
  );
};

export default CharacterSheet;
