import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop';
import * as NavigationState from '../../modules/navigation/NavigationState';
import * as ErrorState from '../../modules/error/ErrorState';
import { joinRoomService, createRoomService, startGameService } from '../../services/multiplayService';

// Initial state
const initialState = Map({
  isCreating: false,
  isCreated: false,
  isStarting: false,
  isStarted: false,
  isJoining: false,
  isJoined: false,
  inGame: false,
  gameCreator: false,
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

const START_GAME = 'MultiplayState/START_GAME';
export const START_GAME_SUCCESS = 'MultiplayState/START_GAME_SUCCESS';

const JOIN_GAME = 'MultiplayState/JOIN_GAME';
export const JOIN_GAME_SUCCESS = 'MultiplayState/JOIN_GAME_SUCCESS';

const START_GAME_FOR_JOINS = 'MultiplayState/START_GAME_FOR_JOINS';
export const START_GAME_FOR_JOINS_SUCCESS = 'MultiplayState/START_GAME_FOR_JOINS_SUCCESS';

export const RESPONSE_FAILURE = 'MultiplayState/RESPONSE_FAILURE';
const LEAVE_GAME = 'MultiplayState/LEAVE_GAME';

// Action creators
export function createGame(inGame) {
  return {
    type: CREATE_GAME,
    payload: {inGame: inGame}
  };
}

export function startGame(gameId) {
  return {
    type: START_GAME,
    payload: {gameId: gameId}
  };
}

export function joinGame(gameId, inGame) {
  return {
    type: JOIN_GAME,
    payload: {gameId: gameId, inGame: inGame}
  };
}

export function startGameForJoins(gameId) {
  return {
    type: START_GAME_FOR_JOINS,
    payload: {gameId: gameId}
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
    case CREATE_GAME:
      return loop(
        state
          .set('isCreating', true),
        Effects.promise(createRoomService, action.payload)
      );

    case CREATE_GAME_SUCCESS:
      return state
        .set('isCreating', false)
        .set('isCreated', action.payload.isCreated)
        .set('inGame', action.payload.isCreated)
        .set('gameId', action.payload.gameId)

    case START_GAME:
      return loop(
        state
          .set('isStarting', true),
        Effects.promise(startGameService, action.payload)
      );

    case START_GAME_SUCCESS:
      return loop(
        state
          .set('isStarting', false)
          .set('isStarted', action.payload.isStarted)
          .set('inGame',  action.payload.isStarted)
          .set('gameId', action.payload.gameId)
          .set('countdownStartTime', action.payload.countdownStartTime)
          .set('countdownEndTime', action.payload.countdownEndTime)
          .set('quoteToType', action.payload.quoteToType)
          .set('quoteReferralURL', action.payload.quoteReferralURL),
        Effects.constant(NavigationState.pushRoute({
          key: 'MultiplayType',
          title: 'Type fast'
        }))
      );

    case JOIN_GAME:
      return loop(
        state
          .set('isJoining', true)
          .set('gameCreator', false),
        Effects.promise(joinRoomService, action.payload)
      );

    case JOIN_GAME_SUCCESS:
      return state
        .set('isJoining', false)
        .set('isJoined', action.payload.isJoined)
        .set('inGame', action.payload.isJoined)
        .set('gameId', action.payload.gameId)

    case RESPONSE_FAILURE:
      return loop(
        state
          .set('isCreating', false)
          .set('isCreated', false)
          .set('isStarting', false)
          .set('isStarted', false)
          .set('isJoining', false)
          .set('isJoined', false)
          .set('inGame', false)
          .set('gameId', "")
          .set('countdownStartTime', 0)
          .set('countdownEndTime', 0)
          .set('quoteToType', "")
          .set('quoteReferralURL', "")
          .set('gameCreator', false),
        Effects.constant(ErrorState.addError(action.payload))
      );

    case LEAVE_GAME:
      return loop(
        state
          .set('isCreating', false)
          .set('isCreated', false)
          .set('isStarting', false)
          .set('isStarted', false)
          .set('isJoining', false)
          .set('isJoined', false)
          .set('inGame', false)
          .set('gameId', "")
          .set('countdownStartTime', 0)
          .set('countdownEndTime', 0)
          .set('quoteToType', "")
          .set('quoteReferralURL', "")
          .set('gameCreator', false),
        Effects.constant(ErrorState.addError("You have left the game!"))
      );

    default:
      return state;
  }
}