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
  let user;
  let createdGame = true;
  let createGameIdAdded = true;
  let countdownAmount = 1000;
  let randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

  let fetchGame = new Promise(function(resolve, reject) {
    if (createdGame) {
      let createGameId = Date.now() + Math.floor(Math.random() * 1000).toString();
      let quoteToType = quoteArr[randomnumber];
      let quoteReferralURL = "www.google.com";
      let countdownStartTime = Date.now(); 
      let countdownEndTime = countdownStartTime + countdownAmount;
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

export function startGame (payload) {

}

export function joinRoom (payload) {

}

function getQuoteToType () {

}