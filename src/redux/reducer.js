import {loop, combineReducers} from 'redux-loop-symbol-ponyfill';
import NavigatorStateReducer from '../modules/navigator/NavigatorState';
import SessionStateReducer, {RESET_STATE} from '../modules/session/SessionState';

import PlayStateReducer from '../modules/play/PlayState';
import ErrorStateReducer from '../modules/error/ErrorState';
import MultiplayStateReducer from '../modules/multiplay/MultiplayState';
import HighscoreStateReducer from '../modules/highscore/HighscoreState';

import AppStateReducer from '../modules/AppState';
import { feathersServices, feathersAuthentication} from '../feathers';

const reducers = {
  // Navigator states
  navigatorState: NavigatorStateReducer,
  session: SessionStateReducer,
  appState: AppStateReducer,

  playState: PlayStateReducer,
  errorState: ErrorStateReducer,
  multiplayState: MultiplayStateReducer,
  highscoreState: HighscoreStateReducer,

  // auth: feathersAuthentication.reducer,
  // users: feathersServices.users.reducer,
  // rooms: feathersServices.rooms.reducer,
  // multirooms: feathersServices.multirooms.reducer,
  // highscores: feathersServices.highscores.reducer
};

const namespacedReducer = combineReducers(reducers);

export default function mainReducer(state, action) {
  const [nextState, effects] = action.type === RESET_STATE
    ? namespacedReducer(action.payload, action)
    : namespacedReducer(state || void 0, action);

  return loop(nextState, effects);
}
