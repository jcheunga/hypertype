import {
  CREATE_GAME_SUCCESS,
  CREATE_NEW_GAME_SUCCESS,
  START_GAME_SUCCESS,
  JOIN_GAME_SUCCESS,
  JOIN_NEW_GAME_SUCCESS,
  RESPONSE_FAILURE
} from '../modules/multiplay/MultiplayState';

export function createRoomService (payload) {
  const user = "abc";
  const createdGame = true;
  const createGameIdAdded = true;

  const createGame = new Promise(function(resolve, reject) {
    if (createdGame) {
      const createGameId = Date.now() + Math.floor(Math.random() * 1000).toString();
      const quoteToType = getQuoteToType();
      const quoteReferralURL = "www.google.com";
      if (createGameIdAdded) {
        resolve(
          {
            gameId: createGameId
          }
        );
      } else {
        reject({ message: "Error creating game" })
      }
    }
  });

  return createGame
    .then((response) => ({type: payload.inGame ? CREATE_NEW_GAME_SUCCESS : CREATE_GAME_SUCCESS, payload: response }))
    .catch((error) => ({type: RESPONSE_FAILURE, payload: error.message}))
}

export function startGameService (payload) {
  const user = "abc";
  const startedGame = true;
  const startGameIdAdded = true;
  const countdownAmount = 1000;

  const startGame = new Promise(function(resolve, reject) {
    if (startedGame) {
      const startGameId = payload.gameId;
      const quoteToType = getQuoteToType();
      const quoteReferralURL = "www.google.com";
      const countdownStartTime = Date.now();
      const countdownEndTime = countdownStartTime + countdownAmount;
      if (startGameIdAdded) {
        resolve(
          {
            gameId: startGameId,
            countdownStartTime: countdownStartTime,
            countdownEndTime: countdownEndTime,
            quoteToType: quoteToType,
            quoteReferralURL: quoteReferralURL,
            gameStarted: true
          }
        );
      } else {
        reject({ message: "Error starting game" })
      }
    }
  });

  return startGame
    .then((response) => ({type: START_GAME_SUCCESS, payload: response }))
    .catch((error) => ({type: RESPONSE_FAILURE, payload: error.message}))
}

export function joinRoomService (payload) {
  const user = "asd";
  const joinedGame = true;
  const joinGameIdAdded = true;

  const joinGame = new Promise(function(resolve, reject) {
    if (joinedGame) {
      const gameId = payload.gameId;
      if (joinGameIdAdded) {
        resolve(
          {
            gameId: gameId
          }
        );
      } else {
        reject({ message: "Error joining game" })
      }
    }
  });

  return joinGame
    .then((response) => ({type: payload.inGame ? JOIN_NEW_GAME_SUCCESS : JOIN_GAME_SUCCESS, payload: response }))
    .catch((error) => ({type: RESPONSE_FAILURE, payload: error.message}))
}

function getQuoteToType () {
  const quoteArr = ["a", "b", "c"];
  return quoteArr[randomNumber()];
}

function randomNumber () {
  const minimum = 0;
  const maximum = 2;
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}