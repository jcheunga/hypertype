import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop-symbol-ponyfill';
import {NavigationActions} from 'react-navigation';

// Initial state
const initialState = Map({
  isConnected: false
});

// Actions
const CONNECT_APP = 'AppState/CONNECT_APP';
const DISCONNECT_APP = 'AppState/DISCONNECT_APP';

// Action creators
export function connectApp() {
  return {
    type: CONNECT_APP
  };
}

export function disconnectApp() {
  return {
    type: DISCONNECT_APP
  };
}

// Reducer
export default function AppStateReducer(state = initialState, action = {}) {

  switch (action.type) {
    case CONNECT_APP:
      return state
        .set('isConnected', true)

    case DISCONNECT_APP:
      return state
        .set('isConnected', false)

    default:
      return state;
  }
}