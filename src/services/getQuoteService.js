import {
  FETCH_SCORES_SUCCESS,
  FETCH_FAILURE
} from '../modules/highscore/HighscoreState';

import app from '../feathers';

export function fetchScoreService (payload) {

  const fetchquotes = new Promise(function(resolve, reject) {
    app.service("quotes")
      .find({
        query: {
          $limit: 50,
          $sort: {
            wpm: -1
          }
        }
      })
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