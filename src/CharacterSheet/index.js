import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { StateContext } from '../App';
import CharacterHeader from './CharacterHeader';
import Abilities from './Abilities';
import HitPoints from './HitPoints';
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
              <Tab>Details</Tab>
            </TabList>

            <TabPanel>
              <Weapons character={character} />
            </TabPanel>

            <TabPanel>
              <section>
                <p>Spellcasting Ability: </p>
                <p>Spell Save DC: 8 + Proficiency + Ability</p>
                <p>Spell Attack Bonus: Proficiency + Ability</p>
                <p>Spell Slots</p>
                <p>Spell List and Notes</p>
              </section>
            </TabPanel>

            <TabPanel>
              <section>
                <p>Notes for Features, Traits, Feats, etc.</p>
              </section>
            </TabPanel>

            <TabPanel>
              <section>
                <p>Copper, Silver, Gold</p>
                <p>Notes for Equipment</p>
              </section>
            </TabPanel>

            <TabPanel>
              <section>
                <p>Background and Alignment</p>
                <p>Languages</p>
                <p>Personality, Ideals, Bonds, Flaws</p>
              </section>
            </TabPanel>
          </Tabs>
        </div>
      </article>
    </main>
  );
};

export default CharacterSheet;
