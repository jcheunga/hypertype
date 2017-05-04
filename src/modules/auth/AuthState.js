import {loop, Effects} from 'redux-loop';
import {NavigationActions} from 'react-navigation';
import * as ErrorState from '../../modules/error/ErrorState';
import { joinRoom, createRoom } from '../../services/authService';

// Initial state
const initialState = {
  isCreating: false,
  isCreated: false,
  isJoining: false,
  isJoined: false,
  inGame: false,
  gameId: "",
  countdownStartTime: 0,
  countdownEndTime: 0,
  quoteToType: "",
  quoteReferralURL: ""
};

// Actions
// Quick Play
const CREATE_GAME = 'AuthState/CREATE_GAME';

// Action creators
export function createGame(inGame) {
  return {
    type: CREATE_GAME,
    payload: {inGame: inGame}
  };
}

// Reducer
export default function AuthStateReducer(state = initialState, action = {}) {

  switch (action.type) {
    case CREATE_GAME:
      return state

    default:
      return state;
  }
}