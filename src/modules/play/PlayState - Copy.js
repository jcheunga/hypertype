import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop';
import * as NavigationState from '../../modules/navigation/NavigationState';

// Initial state
const initialState = Map({
  playerId: "ABC123",
  isLoading: false,
  inGame: false,
  gameId: "",
  room: ""
});

// Actions
// Quick Play
const FIND_GAME = 'PlayState/FIND_GAME';
const FIND_GAME_SUCCESS = 'PlayState/FIND_GAME_SUCCESS';
export const CREATE_GAME_REQUEST = 'PlayState/CREATE_GAME_REQUEST';
export const CREATE_GAME_SUCCESS = 'PlayState/CREATE_GAME_SUCCESS';
export const RESPONSE_FAILURE = 'PlayState/RESPONSE_FAILURE';
const LEAVE_GAME = 'PlayState/LEAVE_GAME';

// Action creators
export function findGame(id) {
  return {
    type: FIND_GAME,
    payload: id
  };
}

export function leaveGame(id) {
  return {
    type: LEAVE_GAME,
    payload: id
  };
}

// Reducer
export default function PlayStateReducer(state = initialState, action = {}) {
  
  switch (action.type) {
    case FIND_GAME:
      return loop(
        state
          .set('isLoading', true),
        Effects.promise(findRoom, action.payload)
      );

    case FIND_GAME_REQUEST:
      return loop(
        state
          .set('isLoading', true),
        Effects.promise(joinRoom, action.payload, FIND_GAME_SUCCESS)
      );

    case FIND_GAME_SUCCESS:
      return loop(
        state
          .set('isLoading', false)
          .set('inGame', true)
          .set('room', action.payload),
        Effects.constant(NavigationState.pushRoute({
          key: 'Type',
          title: 'Type fast'
        }))
      );
    
    case CREATE_GAME_REQUEST:
      return loop(
        state
          .set('isLoading', true),
        Effects.promise(findRoom, action.payload)
      );

    case CREATE_GAME_SUCCESS:
      return loop(
        state
          .set('isLoading', false)
          .set('inGame', true)
          .set('room', action.payload),
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
        .set('errorMessage', action.payload);

    case LEAVE_GAME:
      return state
        .set('isLoading', false)
        .set('inGame', false)
        .set('gameId', "");

    default:
      return state;
  }
}