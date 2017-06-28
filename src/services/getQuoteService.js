import app from '../feathers';
import { getQuoteToType } from '../utils/Utils';

export function fetchQuoteService (payload) {

  const fetchquotes = new Promise(function(resolve, reject) {
    app.service("quotes")
      .find({
        query: {
          $limit: 50
        }
      })
      .then((response) => {
        resolve(getQuoteToType(response.data));
      })
      .catch((error) => {
        reject({
          message: "Cannot fetch quotes"
        })
      });
  });

  return fetchquotes
    .then((response) => ({payload: response }))
    .catch((error) => ({payload: error.message}))
}