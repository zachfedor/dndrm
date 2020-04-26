import React, { useEffect, useReducer, useState } from 'react';
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch,
} from 'react-router-dom';

import CharacterSheet from './CharacterSheet';
import OverviewPanel from './OverviewPanel';
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
  console.log(setParty);

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
        <Router>
          <div className="App">
            <header className="App-header">
              <h1>D<span>&amp;</span>DRM</h1>

              <nav>
                <ul>
                  <li>
                    <NavLink to="/" exact={true} activeClassName="selected">Players</NavLink>

                    <ul>
                      {Object.keys(state.characters).map(id => (
                        <li key={id}>
                          <NavLink to={`/players/${id}`} activeClassName="selected">{state.characters[id].name}</NavLink>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li>
                    <NavLink to="/npcs" activeClassName="selected">NPCs</NavLink>
                  </li>
                  <li>
                    <NavLink to="/monsters" activeClassName="selected">Monsters</NavLink>
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

              <Route path="/npcs">
                <main>
                  <em>NPCs page: work in progress</em>
                </main>
              </Route>

              <Route path="/monsters">
                <main>
                  <em>Monsters page: work in progress</em>
                </main>
              </Route>

              <Route path="/spells">
                <main>
                  <em>Spells page: work in progress</em>
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
