import React, { useReducer } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import OverviewPanel from './OverviewPanel';
import './App.css';


/**
 * Global contexts for app state and action dispatcher
 */
export const StateContext = React.createContext();
export const DispatchContext = React.createContext();


const initialState = {
  characters: {
    1: {
      id: 1,
      name: 'Character One',
      hp: {
        current: 41,
        max: 45,
      },
      abilities: {
        strength: 10,
        dexterity: 15,
        constitution: 14,
        intelligence: 16,
        wisdom: 12,
        charisma: 8,
      },
    },
    2: {
      id: 2,
      name: 'Character Two',
      hp: {
        current: 23,
        max: 36,
      },
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
    }
  }
};

const reducer = (state, action) => {
  switch (action.type) {
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

  // useEffect(() => {
  //   fetch('/api').then(res => console.log(res));
  // });

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
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
}

export default App;
