import React, { useEffect, useReducer, useState } from 'react';
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch,
} from 'react-router-dom';

import CharacterSheet from './CharacterSheet';
import OverviewPanel from './OverviewPanel';
import { socket } from './utils';
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

const LOCAL_ACTIONS = [
  'loadCharacters',
];

const reducer = (state, action) => {
  if (!LOCAL_ACTIONS.includes(action.type) && !action.fromServer) {
    // send action to the other clients for real time updates if it originated 
    // on this client and this is NOT in the list of local-only actions
    socket.emit('dispatch', action);
  }

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
  // const [party, setParty] = useState(0);
  const party = useState(0)[0];

  useEffect(() => {
    socket.on('dispatch', (action) => {
      dispatch(action);
    });

    console.log(`fetching characters for party: ${party}`);

    fetch('/api/characters')
      .then(res => res.json())
      .then(data => {
        dispatch({ type: 'loadCharacters', characters: data.characters });
      });

  }, [party]);

  const isPlayerPage = (match, location) => {
    return location.pathname === '/' || location.pathname.substr(0, 8) === '/players';
  };

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <Router>
          <div className="App">
            <header className="App-header">
              <h1>D<span>&amp;</span>DRM</h1>

              <nav>
                <ul>
                  <li>
                    <NavLink to="/" isActive={isPlayerPage} activeClassName="selected">Players</NavLink>
                  </li>
                  <li>
                    <NavLink to="/monsters" activeClassName="selected">Monsters</NavLink>
                  </li>
                  <li>
                    <NavLink to="/combat" activeClassName="selected">Combat</NavLink>
                  </li>
                  <li>
                    <NavLink to="/spells" activeClassName="selected">Spells</NavLink>
                  </li>
                </ul>
              </nav>
            </header>

            <Switch>
              <Route path="/players/:id">
                <CharacterSheet />
              </Route>

              <Route path="/monsters">
                <main>
                  <p>Monsters page: <em>work in progress</em></p>

                  <ul>
                    <li>Overview page, just like players</li>
                    <li>See monster stat blocks</li>
                    <li>DM only, but monster can be added to combat page</li>
                  </ul>
                </main>
              </Route>

              <Route path="/combat">
                <main>
                  <p>Combat page: <em>work in progress</em></p>

                  <ul>
                    <li>Add characters to start encounter</li>
                    <li>Track initiative and turns</li>
                    <li>See status conditions and hit points at a glance</li>
                    <li>Add new characters mid-encounter</li>
                  </ul>
                </main>
              </Route>

              <Route path="/spells">
                <main>
                  <p>Spells page: <em>work in progress</em></p>

                  <ul>
                    <li>Quickly search spell database by name</li>
                    <li>Review spell data and description</li>
                  </ul>
                </main>
              </Route>

              <Route path="/">
                <OverviewPanel />
              </Route>
            </Switch>
          </div>
        </Router>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
}

export default App;
