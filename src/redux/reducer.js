import {Map, fromJS} from 'immutable';
import {loop, combineReducers} from 'redux-loop-symbol-ponyfill';
import NavigatorStateReducer from '../modules/navigator/NavigatorState';
import SessionStateReducer, {RESET_STATE} from '../modules/session/SessionState';

import PlayStateReducer from '../modules/play/PlayState';
import ErrorStateReducer from '../modules/error/ErrorState';
import MultiplayStateReducer from '../modules/multiplay/MultiplayState';
import { feathersServices, feathersAuthentication } from '../feathers';

const reducers = {
  // Navigator states
  navigatorState: NavigatorStateReducer,
  session: SessionStateReducer,

  playState: PlayStateReducer,
  errorState: ErrorStateReducer,
  multiplayState: MultiplayStateReducer,

  auth: feathersAuthentication.reducer,
  users: feathersServices.users.reducer,
  posts: feathersServices.posts.reducer
};

// initial state, accessor and mutator for supporting root-level
// immutable data with redux-loop reducer combinator
const immutableStateContainer = Map();
const getImmutable = (child, key) => child ? child.get(key) : void 0;
const setImmutable = (child, key, value) => child.set(key, value);

const namespacedReducer = combineReducers(
  reducers,
  immutableStateContainer,
  getImmutable,
  setImmutable
);

export default function mainReducer(state, action) {
  const [nextState, effects] = action.type === RESET_STATE
    ? namespacedReducer(action.payload, action)
    : namespacedReducer(state || void 0, action);

  // enforce the state is immutable
  return loop(fromJS(nextState), effects);
}
