import {
  CREATE_GAME_SUCCESS,
  CREATE_NEW_GAME_SUCCESS,
  START_GAME_SUCCESS,
  JOIN_GAME_SUCCESS,
  JOIN_NEW_GAME_SUCCESS,
  RESPONSE_FAILURE
} from '../modules/multiplay/MultiplayState';

const quoteArr = ["a", "b", "c"];
const minimum = 0;
const maximum = 2;

export function createRoom (payload) {
  const user = "abc";
  const createdGame = true;
  const createGameIdAdded = true;
  const randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

  const fetchGame = new Promise(function(resolve, reject) {
    if (createdGame) {
      const createGameId = Date.now() + Math.floor(Math.random() * 1000).toString();
      const quoteToType = quoteArr[randomnumber];
      const quoteReferralURL = "www.google.com";
      if (createGameIdAdded) {
        resolve(
          {
            gameId: createGameId
          }
        );
      } else {
        reject({ message: "Error creating" })
      }
    }
  });

  return fetchGame
    .then((response) => ({type: CREATE_GAME_SUCCESS, payload: response }))
    .catch((error) => ({type: RESPONSE_FAILURE, payload: error.message}))
}

export function startGame (payload) {
  const user = "abc";
  const startedGame = true;
  const startGameIdAdded = true;
  const countdownAmount = 1000;
  const randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

  const fetchGame = new Promise(function(resolve, reject) {
    if (startedGame) {
      const createGameId = Date.now() + Math.floor(Math.random() * 1000).toString();
      const quoteToType = quoteArr[randomnumber];
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
    .then((response) => ({type: payload.inGame ? CREATE_NEW_GAME_SUCCESS : CREATE_GAME_SUCCESS, payload: response }))
    .catch((error) => ({type: RESPONSE_FAILURE, payload: error.message}))
}

export function joinRoom (payload) {

}

function getQuoteToType () {

}