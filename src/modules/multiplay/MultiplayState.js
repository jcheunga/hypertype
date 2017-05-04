import {loop, Effects} from 'redux-loop-symbol-ponyfill';
import {NavigationActions} from 'react-navigation';
import * as ErrorState from '../../modules/error/ErrorState';
import { joinRoomService, createRoomService, startGameService, startGameForJoinsService } from '../../services/multiplayService';

// Initial state
const initialState = {
  isCreating: false,
  isCreated: false,
  isStarting: false,
  isStarted: false,
  isJoining: false,
  isJoined: false,
  inGame: false,
  gameCreator: null,
  gameId: null,
  countdownStartTime: null,
  countdownEndTime: null,
  quoteToType: null,
  quoteReferralURL: null,
  joinGameStarted: false
};

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

export const LEAVE_GAME = 'MultiplayState/LEAVE_GAME';

const MESS_WITH_PROPS = 'MultiplayState/MESS_WITH_PROPS';

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

export function messWithProps() {
  return {
    type: MESS_WITH_PROPS
  };
}

// Reducer
export default function MultiplayStateReducer(state = initialState, action = {}) {

  switch (action.type) {
    case CREATE_GAME:
      return loop(
        {
          ...state,
          isCreating: true,
          gameCreator: true
        },
        Effects.promise(createRoomService, action.payload)
      );

    case CREATE_GAME_SUCCESS:
      return {
        ...state,
        isCreating: false,
        isCreated: action.payload.isCreated,
        inGame: action.payload.isCreated,
        gameId: action.payload.gameId
      };

    case START_GAME:
      return loop(
        {
          ...state,
          isStarting: true
        },
        Effects.promise(startGameService, action.payload)
      );

    case START_GAME_SUCCESS:
      return loop(
        {
          ...state,
          isStarting: false,
          isStarted: action.payload.isStarted,
          inGame: action.payload.isStarted,
          gameId: action.payload.gameId,
          countdownStartTime: action.payload.countdownStartTime,
          countdownEndTime: action.payload.countdownEndTime,
          quoteToType: action.payload.quoteToType,
          quoteReferralURL: action.payload.quoteReferralURL,
          joinGameStarted: true
        },
        Effects.constant(NavigationActions.navigate({
          routeName: 'MultiplayTypeView'
        }))
      );

    case JOIN_GAME:
      return loop(
        {
          ...state,
          isJoining: true,
          gameCreator: true
        },
        Effects.promise(joinRoomService, action.payload)
      );

    case JOIN_GAME_SUCCESS:
      return {
        ...state,
        isJoining: false,
        isJoined: action.payload.isJoined,
        inGame: action.payload.isJoined,
        gameId: action.payload.gameId,
        gameCreator: false
      };

    case START_GAME_FOR_JOINS:
      return loop(
        {
          ...state
        },
        Effects.promise(startGameForJoinsService, action.payload)
      );

    case START_GAME_FOR_JOINS_SUCCESS:
      return loop(
        {
          ...state,
          inGame: action.payload.isStarted,
          gameId: action.payload.gameId,
          countdownStartTime: action.payload.countdownStartTime,
          countdownEndTime: action.payload.countdownEndTime,
          quoteToType: action.payload.quoteToType,
          quoteReferralURL: action.payload.quoteReferralURL
        },
        Effects.constant(NavigationActions.navigate({
          routeName: 'MultiplayTypeView'
        }))
      );

    case LEAVE_GAME:
      return loop(
        {
          ...state,
          isCreating: false,
          isCreated: false,
          isStarting: false,
          isStarted: false,
          isJoining: false,
          isJoined: false,
          inGame: false,
          gameId: null,
          countdownStartTime: null,
          countdownEndTime: null,
          quoteToType: null,
          quoteReferralURL: null,
          gameCreator: null,
          joinGameStarted: false
        },
        Effects.constant(ErrorState.addError(action.payload))
      );

    case MESS_WITH_PROPS:
      return {
        ...state,
        joinGameStarted: true
      };

    default:
      return state;
  }
}