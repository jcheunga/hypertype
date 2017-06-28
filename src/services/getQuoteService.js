import app from '../feathers';
import { getQuoteToType } from '../utils/Utils';

export function fetchQuoteService (payload) {

  const fetchquotes = new Promise(function(resolve, reject) {
    app.service("quotes")
      .find()
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