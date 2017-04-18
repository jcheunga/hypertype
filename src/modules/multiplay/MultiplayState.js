import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop';
import * as NavigationState from '../../modules/navigation/NavigationState';
import * as ErrorState from '../../modules/error/ErrorState';
import { joinRoom, createRoom } from '../../services/multiplayService';

// Initial state
const initialState = Map({
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
});

// Actions
// Quick Play
const CREATE_GAME = 'MultiplayState/CREATE_GAME';
export const CREATE_GAME_SUCCESS = 'MultiplayState/CREATE_GAME_SUCCESS';
export const CREATE_NEW_GAME_SUCCESS = 'MultiplayState/CREATE_NEW_GAME_SUCCESS';

const JOIN_GAME = 'MultiplayState/JOIN_GAME';
export const JOIN_GAME_SUCCESS = 'MultiplayState/JOIN_GAME_SUCCESS';
export const JOIN_NEW_GAME_SUCCESS = 'MultiplayState/JOIN_NEW_GAME_SUCCESS';

export const RESPONSE_FAILURE = 'MultiplayState/RESPONSE_FAILURE';
const LEAVE_GAME = 'MultiplayState/LEAVE_GAME';

// Action creators
export function createGame(inGame) {
  return {
    type: CREATE_GAME,
    payload: {inGame: inGame}
  };
}

export function joinGame(gameId, inGame) {
  return {
    type: JOIN_GAME,
    payload: {gameId: gameId, inGame: inGame}
  };
}

export function leaveGame() {
  return {
    type: LEAVE_GAME
  };
}

// Reducer
export default function MultiplayStateReducer(state = initialState, action = {}) {
  
  switch (action.type) {
    case FIND_GAME:
      return loop(
        state
          .set('isLoading', true),
        Effects.promise(findRoom, action.payload)
      );

    case FIND_GAME_SUCCESS:
      return loop(
        state
          .set('isLoading', false)
          .set('inGame', true)
          .set('gameId', action.payload.gameId)
          .set('countdownStartTime', action.payload.countdownStartTime)
          .set('countdownEndTime', action.payload.countdownEndTime)
          .set('quoteToType', action.payload.quoteToType)
          .set('quoteReferralURL', action.payload.quoteReferralURL),
        Effects.constant(NavigationState.pushRoute({
          key: 'Type',
          title: 'Type fast'
        }))
      );

    case FIND_NEW_GAME_SUCCESS:
      return state
        .set('isLoading', false)
        .set('inGame', true)
        .set('gameId', action.payload.gameId)
        .set('countdownStartTime', action.payload.countdownStartTime)
        .set('countdownEndTime', action.payload.countdownEndTime)
        .set('quoteToType', action.payload.quoteToType)
        .set('quoteReferralURL', action.payload.quoteReferralURL)

    case RESPONSE_FAILURE:
      return loop(
        state
          .set('isLoading', false)
          .set('inGame', false)
          .set('gameId', "")        
          .set('countdownStartTime', 0)
          .set('countdownEndTime', 0)
          .set('quoteToType', "")
          .set('quoteReferralURL', ""),
        Effects.constant(ErrorState.addError(action.payload))
      );

    case LEAVE_GAME:
      return loop(
        state
          .set('isLoading', false)
          .set('inGame', false)
          .set('gameId', "")
          .set('countdownStartTime', 0)
          .set('countdownEndTime', 0)
          .set('quoteToType', "")
          .set('quoteReferralURL', ""),
        Effects.constant(ErrorState.addError("You have left the game!"))
      );

    default:
      return state;
  }
}