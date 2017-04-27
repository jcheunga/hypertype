import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop-symbol-ponyfill';
import {NavigationActions} from 'react-navigation';
import * as ErrorState from '../../modules/error/ErrorState';
import { findRoomService } from '../../services/roomService';
import AppNavigator from '../navigator/Navigator';

// Initial state
const initialState = Map({
  isLoading: false,
  inGame: false,
  gameId: "",
  countdownStartTime: 0,
  countdownEndTime: 0,
  quoteToType: "",
  quoteReferralURL: ""
});

// Actions
// Quick Play
const FIND_GAME = 'PlayState/FIND_GAME';
export const FIND_GAME_SUCCESS = 'PlayState/FIND_GAME_SUCCESS';
export const FIND_NEW_GAME_SUCCESS = 'PlayState/FIND_NEW_GAME_SUCCESS';
export const RESPONSE_FAILURE = 'PlayState/RESPONSE_FAILURE';
const LEAVE_GAME = 'PlayState/LEAVE_GAME';

// Action creators
export function findGame(inGame) { // FIX THIS WITH ID OF USER
  return {
    type: FIND_GAME,
    payload: {inGame: inGame}
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
        state
          .set('isLoading', true),
        Effects.promise(findRoomService, action.payload)
      );

    case FIND_GAME_SUCCESS:
      return loop(
        state
          .set('isLoading', false)
          .set('inGame', action.payload.inGame)
          .set('gameId', action.payload.gameId)
          .set('countdownStartTime', action.payload.countdownStartTime)
          .set('countdownEndTime', action.payload.countdownEndTime)
          .set('quoteToType', action.payload.quoteToType)
          .set('quoteReferralURL', action.payload.quoteReferralURL),
        Effects.constant(NavigationActions.navigate({ routeName: 'TypeView' }))
      );

    // FIX BACKSPACE FOR ANDROID TO LEAVE GAME OR LEAVE GAME ON PLAY VIEW
    case FIND_NEW_GAME_SUCCESS:
      return state
        .set('isLoading', false)
        .set('inGame', action.payload.inGame)
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