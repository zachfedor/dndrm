import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import api from '../../api';
import { DispatchContext, StateContext } from '../App';
import { Loading } from '../atoms';
import Abilities from './Abilities';
import Background from './Background';
import CharacterHeader from './CharacterHeader';
import { LOAD_CHARACTER } from '../../constants/actionTypes';
import Equipment from './Equipment';
import Error from '../Error';
import Features from './Features';
import HitPoints from './HitPoints';
import Skills from './Skills';
import Spells from './Spells';
import Weapons from './Weapons';
import './index.css';


const CharacterSheet = () => {
  const { id } = useParams();
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const character = state.characters[id];
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get(`/characters/${id}`).then((data) => {
      dispatch({
        type: LOAD_CHARACTER,
        character: data.character,
      });
      setLoading(false);
    });
  }, [dispatch, id]);

  if (loading) {
    return (
      <Loading />
    );
  } else if (!character) {
    return (
      <Error
        error="Not Found"
        message="That character doesn't exist."
      />
    );
  }

  return (
    <main className="CharacterSheet">
      <h1>Character Sheet</h1>

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
