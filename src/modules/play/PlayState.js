import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop';
import * as NavigationState from '../../modules/navigation/NavigationState';

// Initial state
const initialState = Map({
  isLoading: false,
  inGame: false,
  gameId: "",
  room: ""
});

// Actions
// Quick Play
const FIND_GAME_REQUEST = 'PlayState/FIND_GAME_REQUEST';
const FIND_GAME_SUCCESS = 'PlayState/FIND_GAME_SUCCESS';
const FIND_GAME_FAILURE = 'PlayState/FIND_GAME_FAILURE';

const CREATE_GAME_SUCCESS = 'PlayState/CREATE_GAME_SUCCESS';
const CREATE_GAME_FAILURE = 'PlayState/CREATE_GAME_FAILURE';

const LEAVE_GAME = 'PlayState/LEAVE_GAME_REQUEST';

// Action creators
export function findGame(id) {
  return {
    type: FIND_GAME_REQUEST,
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
export default function CityStateReducer(state = initialState, action = {}) {
  
  switch (action.type) {
    case FIND_GAME_REQUEST:
      return loop(
        state
          .set('isLoading', true),
        Effects.promise(findRoom, action.payload)
      );

    case FIND_GAME_SUCCESS:
      return loop(
        state
          .set('isLoading', false)
          .set('room', action.payload),
        Effects.constant(NavigationState.pushRoute({
          key: 'Type',
          title: 'Type fast'
        }))
      );

    case FIND_GAME_FAILURE:
      return loop(
        state
          .set('isLoading', true),
        Effects.promise(createRoom, action.payload, CREATE_GAME_SUCCESS)
      );

    case CREATE_GAME_SUCCESS:
      return loop(
        state
          .set('isLoading', false)
          .set('room', action.payload),
        Effects.constant(NavigationState.pushRoute({
          key: 'Type',
          title: 'Type fast'
        }))
      );

    case CREATE_GAME_FAILURE:
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