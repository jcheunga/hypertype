import {loop, Effects} from 'redux-loop-symbol-ponyfill';
import {NavigationActions} from 'react-navigation';
import * as ErrorState from '../../modules/error/ErrorState';
import { findRoomService } from '../../services/roomService';
import AppNavigator from '../navigator/Navigator';

// Initial state
const initialState = {
  isLoading: false,
  inGame: false,
  gameId: null,
  gameStartTime: null,
  gameEndTime: null,
  quoteToType: null,
  quoteAfflink: null
};

// Actions
// Quick Play
const FIND_GAME = 'PlayState/FIND_GAME';
export const FIND_GAME_SUCCESS = 'PlayState/FIND_GAME_SUCCESS';
export const FIND_NEW_GAME_SUCCESS = 'PlayState/FIND_NEW_GAME_SUCCESS';
export const LEAVE_GAME = 'PlayState/LEAVE_GAME';

// Action creators
export function findGame(inGame, user) {
  return {
    type: FIND_GAME,
    payload: {inGame: inGame, user: user}
  };
}

export function leaveGame() {
  return {
    type: LEAVE_GAME
  };
}

// Reducer
export default function PlayStateReducer(state = initialState, action = {}) {

  switch (action.type) {
    case FIND_GAME:
      return loop(
        {
          ...state,
          isLoading: true
        },
        Effects.promise(findRoomService, action.payload)
      );

    case FIND_GAME_SUCCESS:
      return loop(
        {
          ...state,
          isLoading: false,
          inGame: action.payload.inGame,
          gameId: action.payload.gameId,
          gameStartTime: action.payload.gameStartTime,
          gameEndTime: action.payload.gameEndTime,
          quoteToType: action.payload.quoteToType,
          quoteAfflink: action.payload.quoteReferralURL
        },
        Effects.constant(NavigationActions.navigate({
          routeName: 'TypeView'
        }))
      );

    // FIX BACKSPACE FOR ANDROID TO LEAVE GAME OR LEAVE GAME ON PLAY VIEW
    case FIND_NEW_GAME_SUCCESS:
      return {
        ...state,
        isLoading: false,
        inGame: action.payload.inGame,
        gameId: action.payload.gameId,
        gameStartTime: action.payload.gameStartTime,
        gameEndTime: action.payload.gameEndTime,
        quoteToType: action.payload.quoteToType,
        quoteAfflink: action.payload.quoteReferralURL
      };

    case LEAVE_GAME:
      return loop(
        {
          ...state,
          isLoading: false,
          inGame: false,
          gameId: null,
          gameStartTime: null,
          gameEndTime: null,
          quoteToType: null,
          quoteAfflink: null
        },
        Effects.constant(ErrorState.addError(action.payload))
      );

    default:
      return state;
  }
}