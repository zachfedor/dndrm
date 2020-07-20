import {
  ASYNC_START,
  LOGIN,
  LOGOUT,
  LOAD_CHARACTERS,
  UPDATE_CHARACTER,
  RESET_COMBAT,
  UPDATE_COMBAT,
  DELETE_CAMPAIGN,
  LOAD_CAMPAIGN,
  LOAD_CAMPAIGNS,
  WEBSOCKET_ACTIONS,
} from './constants/actionTypes';
import { socket } from './utils';


export const initialState = {
  campaigns: {},
  characters: {},
  currentUser: null,
  loading: [],
};


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


export const reducer = (state, action) => {
  if (WEBSOCKET_ACTIONS.includes(action.type) && !action.fromServer) {
    // send action to the other clients for real time updates if it originated 
    // on this client and this is NOT a local-only action
    socket.emit('dispatch', action);
  }

  switch (action.type) {
    case ASYNC_START:
      return {
        ...state,
        loading: [
          ...state.loading,
          action.loading,
        ],
      };
    case LOGIN:
      return {
        ...state,
        currentUser: action.user,
        loading: state.loading.filter(t => t !== action.type),
      };
    case LOGOUT:
      return {
        ...state,
        currentUser: null,
      };
    case LOAD_CHARACTERS:
      return {
        ...state,
        characters: action.characters,
      };
    case UPDATE_CHARACTER:
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
    case RESET_COMBAT:
      return {
        ...state,
        characters: resetCombat(state.characters),
      };
    case UPDATE_COMBAT:
      return {
        ...state,
        characters: updateCombat(state.characters, action.initiatives, action.conditions),
      };
    case DELETE_CAMPAIGN:
      const { [action.id]: _, ...rest } = state.campaigns;

      return { ...state, campaigns: rest };
    case LOAD_CAMPAIGN:
      return {
        ...state,
        campaigns: {
          ...state.campaigns,
          [action.campaign.id]: action.campaign,
        },
        characters: {
          ...state.characters,
          ...action.characters,
        },
      };
    case LOAD_CAMPAIGNS:
      return {
        ...state,
        campaigns: action.campaigns,
      };
    default:
      throw new Error();
  }
};

