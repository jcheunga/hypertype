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
  gameEndTime: null,
  gameStartTime: null,
  quoteToType: null,
  quoteAfflink: null,
  roomJoined: null,
  errorMessage: null
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
export const JOIN_NEW_GAME_SUCCESS = 'MultiplayState/JOIN_NEW_GAME_SUCCESS';

const START_GAME_FOR_JOINS = 'MultiplayState/START_GAME_FOR_JOINS';
export const START_GAME_FOR_JOINS_SUCCESS = 'MultiplayState/START_GAME_FOR_JOINS_SUCCESS';

export const LEAVE_GAME = 'MultiplayState/LEAVE_GAME';

export const SERVICE_ERROR = 'MultiplayState/SERVICE_ERROR';

// Action creators
export function createGame(inGame, user) {
  return {
    type: CREATE_GAME,
    payload: {inGame: inGame, user: user}
  };
}

export function startGame(gameId, room) {
  return {
    type: START_GAME,
    payload: {gameId: gameId, room: room}
  };
}

export function joinGame(gameId, inGame, user) {
  return {
    type: JOIN_GAME,
    payload: {gameId: gameId, inGame: inGame, user: user}
  };
}

export function startGameForJoins(gameId, room) {
  return {
    type: START_GAME_FOR_JOINS,
    payload: {gameId: gameId, room: room}
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
        {
          ...state,
          isCreating: true,
          errorMessage: null
        },
        Effects.promise(createRoomService, action.payload)
      );

    case CREATE_GAME_SUCCESS:
      return {
        ...state,
        isCreating: false,
        gameCreator: true,
        isCreated: action.payload.isCreated,
        inGame: action.payload.isCreated,
        gameId: action.payload.gameId,
        roomJoined: action.payload.room
      };

    case CREATE_NEW_GAME_SUCCESS:
      return {
        ...state,
        isCreating: false,
        gameCreator: true,
        isCreated: action.payload.isCreated,
        inGame: action.payload.isCreated,
        gameId: action.payload.gameId,
        roomJoined: action.payload.room
      };

    case START_GAME:
      return loop(
        {
          ...state,
          isStarting: true,
          errorMessage: null
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
          gameStartTime: action.payload.gameStartTime,
          gameEndTime: action.payload.gameEndTime,
          roomJoined: action.payload.room,
          quoteToType: action.payload.quoteToType,
          quoteAfflink: action.payload.quoteAfflink,
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
          errorMessage: null
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
        gameCreator: false,
        roomJoined: action.payload.room
      };

    case JOIN_NEW_GAME_SUCCESS:
      return {
        ...state,
        isJoining: false,
        isJoined: action.payload.isJoined,
        inGame: action.payload.isJoined,
        gameId: action.payload.gameId,
        gameCreator: false,
        roomJoined: action.payload.room
      };

    case START_GAME_FOR_JOINS:
      return loop(
        {
          ...state,
          isStarting: true,
          errorMessage: null
        },
        Effects.promise(startGameForJoinsService, action.payload)
      );

    case START_GAME_FOR_JOINS_SUCCESS:
      return loop(
        {
          ...state,
          isStarting: false,
          isStarted: action.payload.isStarted,
          inGame: action.payload.isStarted,
          gameId: action.payload.gameId,
          gameStartTime: action.payload.gameStartTime,
          gameEndTime: action.payload.gameEndTime,
          roomJoined: action.payload.room,
          quoteToType: action.payload.quoteToType,
          quoteAfflink: action.payload.quoteAfflink,
        },
        Effects.constant(NavigationActions.navigate({
          routeName: 'MultiplayTypeView'
        }))
      );

    case LEAVE_GAME:
      return {
        ...state,
        isCreating: false,
        isCreated: false,
        isStarting: false,
        isStarted: false,
        isJoining: false,
        isJoined: false,
        inGame: false,
        gameId: null,
        gameEndTime: null,
        gameStartTime: null,
        quoteToType: null,
        quoteAfflink: null,
        gameCreator: null,
        roomJoined: null,
        errorMessage: null
      };

    case SERVICE_ERROR:
      return {
        ...state,
        isCreating: false,
        isCreated: false,
        isStarting: false,
        isStarted: false,
        isJoining: false,
        isJoined: false,
        inGame: false,
        gameId: null,
        gameEndTime: null,
        gameStartTime: null,
        quoteToType: null,
        quoteAfflink: null,
        gameCreator: null,
        roomJoined: null,
        errorMessage: action.payload
      };

    default:
      return state;
  }
}