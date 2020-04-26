import React, { useEffect, useReducer, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import OverviewPanel from './OverviewPanel';
import PlayersPanel from './PlayersPanel';
import { LabeledCheckCircle } from './molecules';
import './App.css';


/**
 * Global contexts for app state and action dispatcher
 */
export const StateContext = React.createContext();
export const DispatchContext = React.createContext();


// spellSlots: {
//   1: [true, true, false],
//   2: [true]
// }
const initialState = {
  characters: {}
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'loadCharacters':
      return {
        ...state,
        characters: action.characters,
      };
    case 'changeAbilityScore':
      return {
        ...state,
        characters: {
          ...state.characters,
          [action.id]: {
            ...state.characters[action.id],
            abilities: {
              ...state.characters[action.id].abilities,
              [action.ability]: action.score
            }
          }
        }
      };
    case 'updateProficiencies':
      return {
        ...state,
        characters: {
          ...state.characters,
          [action.id]: {
            ...state.characters[action.id],
            proficiencies: action.proficiencies
          }
        }
      };
    case 'updateWeaponNotes':
      return {
        ...state,
        characters: {
          ...state.characters,
          [action.id]: {
            ...state.characters[action.id],
            weaponNotes: action.weaponNotes,
          },
        },
      };
    case 'toggleSpellSlot':
      const { characterID, level, slot } = action;
      const character = state.characters[characterID];
      return {
        ...state,
        characters: {
          ...state.characters,
          [characterID]: {
            ...character,
            spellSlots: {
              ...character.spellSlots,
              [level]: character.spellSlots[level].map((s, i) => slot === i ? !s : s)
            }
          }
        }
      };
    default:
      throw new Error();
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [party, setParty] = useState(0);

  useEffect(() => {
    console.log(`fetching characters for party: ${party}`);
    fetch('/api/characters')
      .then(res => res.json())
      .then(data => {
        dispatch({ type: 'loadCharacters', characters: data.characters });
      });
  }, [party]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
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
              <OverviewPanel />
            </TabPanel>

            <TabPanel>
              <PlayersPanel />
            </TabPanel>

            <TabPanel>
              <p>npcs panel</p>

              <LabeledCheckCircle id="test" label="Test" handleClick={(v) => console.log('clicked', v)} />
            </TabPanel>

            <TabPanel>
              <p>monsters panel</p>
            </TabPanel>
          </Tabs>

          <button onClick={() => setParty(party + 1)}>set party test</button>
        </div>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
}

export default App;
