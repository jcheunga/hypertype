import {
  FIND_GAME_SUCCESS,
  FIND_NEW_GAME_SUCCESS,
  RESPONSE_FAILURE
} from '../modules/play/PlayState';
import { createRandomGameId, getQuoteToType } from '../utils/Utils';

export function findRoomService (payload) {
  const user = payload.id;
  const foundGame = false;
  const createGameIdAdded = true;
  const countdownAmount = 1000;

  const fetchGame = new Promise(function(resolve, reject) {
    if (foundGame) {
      const quoteToType = getQuoteToType();
      const quoteReferralURL = "www.google.com";
      const findGameId = "123456";
      const countdownStartTime = Date.now();
      const countdownEndTime = countdownStartTime + countdownAmount;
      if (hasGameId) {
        resolve(
          {
            gameId: findGameId,
            countdownStartTime: countdownStartTime,
            countdownEndTime: countdownEndTime,
            quoteToType: quoteToType,
            quoteReferralURL: quoteReferralURL
          }
        );
      } else {
        reject({ message: "Error joining" })
      }
    } else {
      const createGameId = createRandomGameId();
      const quoteToType = getQuoteToType();
      const quoteReferralURL = "www.google.com";
      const countdownStartTime = Date.now();
      const countdownEndTime = countdownStartTime + countdownAmount;
      if (createGameIdAdded) {
        resolve(
          {
            gameId: createGameId,
            countdownStartTime: countdownStartTime,
            countdownEndTime: countdownEndTime,
            quoteToType: quoteToType,
            quoteReferralURL: quoteReferralURL
          }
        );
      } else {
        reject({ message: "Error creating" })
      }
    }
  });

  return fetchGame
    .then((response) => ({type: payload.inGame ? FIND_NEW_GAME_SUCCESS : FIND_GAME_SUCCESS, payload: response }))
    .catch((error) => ({type: RESPONSE_FAILURE, payload: error.message}))
}