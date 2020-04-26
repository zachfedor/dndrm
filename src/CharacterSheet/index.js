import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { StateContext } from '../App';
import CharacterHeader from './CharacterHeader';
import Abilities from './Abilities';
import Skills from './Skills';
import Weapons from './Weapons';
import './index.css';


const getPrevNextIds = (party, current) => {
  const i = party.indexOf(current);
  const next = i + 1 < party.length ? i + 1 : 0;
  const prev = i - 1 > -1 ? i - 1 : party.length - 1;
  return {
    prev: party[prev],
    next: party[next],
  };
};

const CharacterSheet = () => {
  const state = useContext(StateContext);
  const party = Object.keys(state.characters);
  const { id } = useParams();

  if (!party.includes(id)) {
    return (
      <main>
        <h1>Not Found</h1>
      </main>
    );
  }

  const character = state.characters[id];
  const { prev, next } = getPrevNextIds(party, id);

  return (
    <main className="CharacterSheet">
      <header>
        <h1>Character Sheet</h1>
        <nav>
          <Link to={`/players/${prev}`}>Prev</Link>
          <Link to={`/players/${next}`}>Next</Link>
        </nav>
      </header>

      <article>
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
    </main>
  );
};

export default CharacterSheet;
