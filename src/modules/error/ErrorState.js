import {loop, Effects} from 'redux-loop';

// Initial state
const initialState = {
  errorMessage: ""
};

// Actions
// Quick Play
const ADD_ERROR = 'ErrorState/ADD_ERROR';
const REMOVE_ERROR = 'ErrorState/REMOVE_ERROR';

// Action creators
export function addError(error) {
  return {
    type: ADD_ERROR,
    payload: error
  }
}

export function removeError() {
  return {
    type: REMOVE_ERROR
  }
}

// Reducer
export default function ErrorStateReducer(state = initialState, action = {}) {

  switch (action.type) {
    case ADD_ERROR:
      return {
        ...state,
        errorMessage: action.payload
      };

    case REMOVE_ERROR:
      return {
        ...state,
        errorMessage: ""
      };

    default:
      return state;
  }
}