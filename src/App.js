import React, { useEffect, useReducer, useState } from 'react';
import {
  NavLink,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';

import api from './api';
import Account from './Account';
import AuthRoute from './AuthRoute';
import { Button, Loading } from './atoms';
import CharacterSheet from './CharacterSheet';
import CombatPanel from './CombatPanel';
import Login from './Login';
import OverviewPanel from './OverviewPanel';
import { cx, socket } from './utils';
import './App.css';


/**
 * Global contexts for app state and action dispatcher
 */
export const StateContext = React.createContext();
export const DispatchContext = React.createContext();


const initialState = {
  characters: {},
  currentUser: null,
  loading: [],
};

const LOCAL_ACTIONS = [
  'ASYNC_START',
  'loadCharacters',
  'LOGIN',
  'LOGOUT',
];

const resetCombat = (characters) => Object.keys(characters).map((id) => ({
  ...characters[id],
  initiative: null,
})).reduce((obj, cur) => {
  obj[cur.id] = cur;
  return obj;
}, {});

const updateCombat = (characters, initiatives, conditions) => Object.keys(characters).map((id) => ({
  ...characters[id],
  initiative: initiatives[id],
  conditions: conditions[id],
})).reduce((obj, cur) => {
  obj[cur.id] = cur;
  return obj;
}, {});


const reducer = (state, action) => {
  if (!LOCAL_ACTIONS.includes(action.type) && !action.fromServer) {
    // send action to the other clients for real time updates if it originated 
    // on this client and this is NOT in the list of local-only actions
    socket.emit('dispatch', action);
  }

  switch (action.type) {
    case 'ASYNC_START':
      return {
        ...state,
        loading: [
          ...state.loading,
          action.loading,
        ],
      };
    case 'LOGIN':
      return {
        ...state,
        currentUser: action.user,
        loading: state.loading.filter(t => t !== action.type),
      };
    case 'LOGOUT':
      return {
        ...state,
        currentUser: null,
      };
    case 'loadCharacters':
      return {
        ...state,
        characters: action.characters,
      };
    case 'updateCharacter':
      return {
        ...state,
        characters: {
          ...state.characters,
          [action.id]: {
            ...state.characters[action.id],
            ...action.character,
          },
        },
      };
    case 'resetCombat':
      return {
        ...state,
        characters: resetCombat(state.characters),
      };
    case 'updateCombat':
      return {
        ...state,
        characters: updateCombat(state.characters, action.initiatives, action.conditions),
      };
    default:
      throw new Error();
  }
};

const Characters = () => (
  <main>
    <p>character overview for a user</p>
  </main>
);
const Monsters = () => (
  <main>
    <p>Monsters page: <em>work in progress</em></p>

    <ul>
      <li>Overview page, just like players</li>
      <li>See monster stat blocks</li>
      <li>DM only, but monster can be added to combat page</li>
    </ul>
  </main>
);
const Spells = () => (
  <main>
    <p>Spells page: <em>work in progress</em></p>

    <ul>
      <li>Quickly search spell database by name</li>
      <li>Review spell data and description</li>
    </ul>
  </main>
);

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Loading state
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // check for token in local storage, then send api call to retrieve user
    // data and populate state.currentUser so they can log in automatically
    if (api.hasToken()) {
      dispatch({ type: 'ASYNC_START', loading: 'LOGIN' });
      api.get('users/current').then((data) => {
        dispatch({ type: 'LOGIN', user: data.user });
        setLoaded(true);
      });
    } else {
      setLoaded(true);
    }
  }, []);
  const handleLogout = (event) => {
    event.preventDefault();
    api.removeToken();
    dispatch({ type: 'LOGOUT' });
  };

  // State and effects to track and alter the visibility of the mobile nav menu
  const [navHidden, setNavHidden] = useState(true);
  const toggleNav = () => setNavHidden(!navHidden);
  const hideNav = () => !navHidden && setNavHidden(true);

  const location = useLocation();
  useEffect(() => {
    // if location changes, hide the nav if needed
    setNavHidden(true);
  }, [location]);

  // const [party, setParty] = useState(0);
  const party = useState(0)[0];

  useEffect(() => {
    socket.on('dispatch', (action) => {
      dispatch(action);
    });
  }, []);

  useEffect(() => {
    console.log(`fetching characters for party: ${party}`);

    api.get('characters')
      .then(data => {
        dispatch({ type: 'loadCharacters', characters: data.characters });
      });

  }, [party]);

  const isCharacterPage = (match, location) => location.pathname.includes('/characters');

  if (!loaded) {
    return (
      <div className={cx('App', 'App__loading')}>
        <Loading />
      </div>
    );
  }

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <div className={cx('App', !navHidden && 'App__noScroll')}>
          <header className="App-header">
            <h1>D<span>&amp;</span>DRM</h1>

            <Button
              aria-expanded={!navHidden}
              aria-label="Toggle navigation menu"
              className="App-navToggle"
              onClick={toggleNav}
            >
              {navHidden ? <MenuIcon/> : <CloseIcon />}
            </Button>

            <nav className={cx('App-nav', navHidden && 'App-nav__hidden')}>
              <ul>
                <li>
                  <NavLink to="/" exact={true}>Party</NavLink>
                </li>
                <li>
                  <NavLink to="/characters" isActive={isCharacterPage}>Characters</NavLink>
                </li>
                <li>
                  <NavLink to="/monsters">Monsters</NavLink>
                </li>
                <li>
                  <NavLink to="/combat">Combat</NavLink>
                </li>
                <li>
                  <NavLink to="/spells">Spells</NavLink>
                </li>
              </ul>

              <hr/>

              {state.currentUser ? (
                <ul>
                  <li>
                    <NavLink to="/account">Account</NavLink>
                  </li>
                  <li>
                    <a onClick={handleLogout} href="/">Logout</a>
                  </li>
                </ul>
              ) : (
                <ul>
                  <li>
                    <NavLink to="/login">Login</NavLink>
                  </li>
                </ul>
              )}
            </nav>
          </header>

          <div
            className={cx('App-navOverlay', navHidden && 'App-navOverlay__hidden')}
            onClick={hideNav}
          ></div>

          <Switch>
            <Route path="/login" component={Login} />
            <AuthRoute path="/account" component={Account} />
            <AuthRoute path="/characters/:id" component={CharacterSheet} />
            <AuthRoute path="/characters" component={Characters} />
            <AuthRoute path="/combat" component={CombatPanel} />
            <AuthRoute path="/monsters" component={Monsters} />
            <AuthRoute path="/spells" component={Spells} />
            <AuthRoute path="/" component={OverviewPanel} />
          </Switch>
        </div>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
}

export default App;
