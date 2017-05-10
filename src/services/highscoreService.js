import {
  FETCH_SCORES_SUCCESS,
  FETCH_FAILURE
} from '../modules/highscore/HighscoreState';

import app from '../feathers';

export function fetchScoreService (payload) {

  const fetchScores = new Promise(function(resolve, reject) {
    app.service("highscores")
      .find()
      .then((res) => {
        resolve({
          data: res.data,
          isFetched: true
        });
      })
      .catch((err) => {
        reject({
          message: err,
          hasError: true
        })
      });
  });

  return fetchScores
    .then((response) => ({type: FETCH_SCORES_SUCCESS, payload: response }))
    .catch((error) => ({type: FETCH_FAILURE, payload: error}))
}