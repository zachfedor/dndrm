import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { StateContext } from '../App';
import CharacterHeader from './CharacterHeader';
import Abilities from './Abilities';
import Background from './Background';
import Equipment from './Equipment';
import Features from './Features';
import HitPoints from './HitPoints';
import Skills from './Skills';
import Spells from './Spells';
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
          <Link to={`/players/${prev}`} className="Button">Prev</Link>
          <Link to={`/players/${next}`} className="Button">Next</Link>
        </nav>
      </header>

      <article>
        <CharacterHeader character={character} />

        <div className="column">
          <Abilities character={character} />
          <Skills character={character} />
        </div>

        <div className="column">
          <HitPoints character={character} />

          <Tabs>
            <TabList>
              <Tab>Weapons</Tab>
              <Tab>Spells</Tab>
              <Tab>Features</Tab>
              <Tab>Equipment</Tab>
              <Tab>Background</Tab>
            </TabList>

            <TabPanel>
              <Weapons character={character} />
            </TabPanel>

            <TabPanel>
              <Spells character={character} />
            </TabPanel>

            <TabPanel>
              <Features character={character} />
            </TabPanel>

            <TabPanel>
              <Equipment character={character} />
            </TabPanel>

            <TabPanel>
              <Background character={character} />
            </TabPanel>
          </Tabs>
        </div>
      </article>
    </main>
  );
};

export default CharacterSheet;
