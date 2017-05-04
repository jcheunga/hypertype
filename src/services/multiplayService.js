import {
  CREATE_GAME_SUCCESS,
  START_GAME_SUCCESS,
  JOIN_GAME_SUCCESS,
  START_GAME_FOR_JOINS_SUCCESS,
  LEAVE_GAME
} from '../modules/multiplay/MultiplayState';
import { createRandomGameId, getQuoteToType } from '../utils/Utils';

// IF BOTH IN SAME GAMEID AND PRESS PLAY AGAIN THEN CREATE NEW ID AND SEND TO BOTH PEOPLE

export function createRoomService (payload) {
  const user = "abc";
  const createdGame = true;
  const createGameIdAdded = true;

  const createGame = new Promise(function(resolve, reject) {
    if (createdGame) {
      const createGameId = createRandomGameId();
      const quoteToType = getQuoteToType();
      const quoteReferralURL = "www.google.com";
      if (createGameIdAdded) {
        resolve(
          {
            gameId: createGameId,
            isCreated: true
          }
        );
      } else {
        reject({ message: "Error creating" })
      }
    }
  });

  return createGame
    .then((response) => ({type: CREATE_GAME_SUCCESS, payload: response }))
    .catch((error) => ({type: LEAVE_GAME, payload: error.message}))
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
            isStarted: true
          }
        );
      } else {
        reject({ message: "Error starting" })
      }
    }
  });

  return startGame
    .then((response) => ({type: START_GAME_SUCCESS, payload: response }))
    .catch((error) => ({type: LEAVE_GAME, payload: error.message}))
}

export function joinRoomService (payload) {
  const gameId = payload.gameId;
  const user = "asd";
  const joinedGame = true;
  const joinGameIdAdded = true;

  // PLACEHOLDER - NEED TO SEARCH FOR IT
  const quoteToType = getQuoteToType();
  const quoteReferralURL = "www.google.com";

  const joinGame = new Promise(function(resolve, reject) {
    if (joinedGame) {
      if (joinGameIdAdded) {
        resolve(
          {
            gameId: gameId,
            isJoined: true
          }
        );
      } else {
        reject({ message: "Error joining" })
      }
    }
  });

  return joinGame
    .then((response) => ({type: JOIN_GAME_SUCCESS, payload: response }))
    .catch((error) => ({type: LEAVE_GAME, payload: error.message}))
}

export function startGameForJoinsService (payload) {
  console.log("startgameforjoinsservice called");
  const user = "abc";
  const startedGame = true;
  const startGameIdAdded = true;
  const countdownAmount = 1000;

  const startGameForJoins = new Promise(function(resolve, reject) {
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
            isStarted: true
          }
        );
      } else {
        reject({ message: "Error starting" })
      }
    }
  });

  return startGameForJoins
    .then((response) => ({type: START_GAME_FOR_JOINS_SUCCESS, payload: response }))
    .catch((error) => ({type: LEAVE_GAME, payload: error.message}))
}