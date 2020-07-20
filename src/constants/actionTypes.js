/**
 * Generic Actions
 */
export const ASYNC_START = 'ASYNC_START';

/**
 * Auth Actions
 */
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

/**
 * Character Actions
 */
export const LOAD_CHARACTERS = 'LOAD_CHARACTERS';
export const UPDATE_CHARACTER = 'UPDATE_CHARACTER';
export const RESET_COMBAT = 'RESET_COMBAT';
export const UPDATE_COMBAT = 'UPDATE_COMBAT';

/**
 * Campaign Actions
 */
export const LOAD_CAMPAIGN = 'LOAD_CAMPAIGN';
export const LOAD_CAMPAIGNS = 'LOAD_CAMPAIGNS';
export const DELETE_CAMPAIGN = 'DELETE_CAMPAIGN';

/**
 * List of actions to sync to other connected clients
 */
export const WEBSOCKET_ACTIONS = [
  UPDATE_CHARACTER,
  RESET_COMBAT,
  UPDATE_COMBAT,
];
