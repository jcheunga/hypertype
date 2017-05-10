import {loop, Effects} from 'redux-loop-symbol-ponyfill';
import {NavigationActions} from 'react-navigation';
import * as ErrorState from '../../modules/error/ErrorState';
import { fetchScoreService } from '../../services/highscoreService';

// Initial state
const initialState = {
  isFetching: false,
  isFetched: false,
  hasError: false,
  scores: []
};

// Actions
// Quick Play
const FETCH_SCORES = 'HighscoreState/FETCH_SCORES';
export const FETCH_SCORES_SUCCESS = 'HighscoreState/FETCH_SCORES_SUCCESS';
export const FETCH_FAILURE = 'HighscoreState/FETCH_FAILURE';

// Action creators
export function fetchScores() {
  return {
    type: FETCH_SCORES
  };
}

// Reducer
export default function HighscoreStateReducer(state = initialState, action = {}) {

  switch (action.type) {
    case FETCH_SCORES:
      return loop(
        {
          ...state,
          isFetching: true,
          isFetched: false,
          hasError: false
        },
        Effects.promise(fetchScoreService, action.payload)
      );

    case FETCH_SCORES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isFetched: action.payload.isFetched,
        scores: action.payload.data,
        hasError: false
      };

    case FETCH_FAILURE:
      return {
        ...state,
        isFetching: false,
        isFetched: false,
        hasError: action.payload.hasError,
        scores: [],
      };

    default:
      return state;
  }
}