import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop';
import * as NavigationState from '../../modules/navigation/NavigationState';
import { findRoom, createRoom } from '../../services/roomService'

// Initial state
const initialState = Map({
  isLoading: false,
  inGame: false,
  gameId: "",
  countdownStartTime: "",
  countdownEndTime: "",
  errorMessage: "",
  quoteToType: "",
  quoteReferralURL: ""
});

// Actions
// Quick Play
const FIND_GAME = 'PlayState/FIND_GAME';
export const FIND_GAME_SUCCESS = 'PlayState/FIND_GAME_SUCCESS';
export const RESPONSE_FAILURE = 'PlayState/RESPONSE_FAILURE';
const LEAVE_GAME = 'PlayState/LEAVE_GAME';

// Action creators
export function findGame(id) {
  return {
    type: FIND_GAME,
    payload: id
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
          .set('isLoading', true)
          .set('errorMessage', ""),
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

    case RESPONSE_FAILURE:
      return state
        .set('isLoading', false)
        .set('inGame', false)
        .set('gameId', "")        
        .set('countdownStartTime', "")
        .set('countdownEndTime', "")
        .set('quoteToType', "")
        .set('quoteReferralURL', "")
        .set('errorMessage', action.payload);

    case LEAVE_GAME:
      return state
        .set('isLoading', false)
        .set('inGame', false)
        .set('gameId', "")
        .set('countdownStartTime', "")
        .set('countdownEndTime', "")
        .set('quoteToType', "")
        .set('quoteReferralURL', "")
        .set('errorMessage', "You left the game");

    default:
      return state;
  }
}