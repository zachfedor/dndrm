import React, { useEffect, useReducer, useState } from 'react';
import {
  NavLink,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';

import api from '../api';
import Account from './Account';
import AuthRoute from './AuthRoute';
import { Button, Loading } from './atoms';
import CharacterSheet from './CharacterSheet';
import CombatPanel from './CombatPanel';
import Campaign from './Campaign';
import CampaignForm from './CampaignForm';
import CampaignList from './CampaignList';
import CharacterList from './CharacterList';
import CreatureList from './CreatureList';
import Login from './Login';
import SpellList from './SpellList';
import OverviewPanel from './OverviewPanel';
import { ASYNC_START, LOAD_CHARACTERS, LOGIN, LOGOUT } from '../constants/actionTypes';
import { reducer, initialState } from '../reducer';
import { cx, socket } from '../utils';
import './App.css';


/**
 * Global contexts for app state and action dispatcher
 */
export const StateContext = React.createContext();
export const DispatchContext = React.createContext();


const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Loading state
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // check for token in local storage, then send api call to retrieve user
    // data and populate state.currentUser so they can log in automatically
    if (api.hasToken()) {
      dispatch({ type: ASYNC_START, loading: LOGIN });
      api.get('users/current').then((data) => {
        dispatch({ type: LOGIN, user: data.user });
        setLoaded(true);
      });
    } else {
      setLoaded(true);
    }
  }, []);
  const handleLogout = (event) => {
    event.preventDefault();
    api.removeToken();
    dispatch({ type: LOGOUT });
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
    // On initial load, setup websocket listener to dispatch actions that
    // need synced originating from other connected clients
    socket.on('dispatch', (action) => {
      dispatch(action);
    });
  }, []);

  useEffect(() => {
    console.log(`fetching characters for party: ${party}`);

    api.get('characters')
      .then(data => {
        dispatch({ type: LOAD_CHARACTERS, characters: data.characters });
      });

  }, [party]);

  const isCampaignPage = (_, location) => location.pathname.includes('/campaigns');
  const isCharacterPage = (_, location) => location.pathname.includes('/characters');

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
                  <NavLink to="/campaigns" isActive={isCampaignPage}>Campaigns</NavLink>
                </li>
                <li>
                  <NavLink to="/characters" isActive={isCharacterPage}>Characters</NavLink>
                </li>
                <li>
                  <NavLink to="/creatures">Creatures</NavLink>
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

            <AuthRoute path="/campaigns/create" component={CampaignForm} />
            <AuthRoute path="/campaigns/:id/edit" component={CampaignForm} />
            <AuthRoute path="/campaigns/:id" component={Campaign} />
            <AuthRoute path="/campaigns" component={CampaignList} />

            <AuthRoute path="/characters/:id" component={CharacterSheet} />
            <AuthRoute path="/characters" component={CharacterList} />

            <AuthRoute path="/combat" component={CombatPanel} />
            <AuthRoute path="/creatures" component={CreatureList} />
            <AuthRoute path="/spells" component={SpellList} />
            <AuthRoute path="/" component={OverviewPanel} />
          </Switch>
        </div>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
}

export default App;
