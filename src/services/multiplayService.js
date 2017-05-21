import {
  CREATE_GAME_SUCCESS,
  START_GAME_SUCCESS,
  JOIN_GAME_SUCCESS,
  START_GAME_FOR_JOINS_SUCCESS,
  LEAVE_GAME
} from '../modules/multiplay/MultiplayState';
import { createRandomGameId, getQuoteToType } from '../utils/Utils';

import app from '../feathers';

// IF BOTH IN SAME GAMEID AND PRESS PLAY AGAIN THEN CREATE NEW ID AND SEND TO BOTH PEOPLE

export function createRoomService (payload) {
  const user = payload.user;

  const createGame = new Promise(function(resolve, reject) {
    const quoteToType = getQuoteToType();
    const createGameId = createRandomGameId();

    const createRoomData = {
      gameId: createGameId,
      quoteToType: quoteToType,
      quoteAfflink: quoteToType,
      playerList: [
        {
          playerId: payload.user.usernames,
          gameCreator: true,
          wpm: 0,
          completed: false
        }
      ]
    };

    app.service("multirooms").create(createRoomData)
      .then((response) => {
        console.log(response);
        resolve(
          {
            gameId: response.gameId,
            isCreated: true,
            room: response
          }
        );
      }).catch((error) => {
        console.log(error);
        reject({ message: error })
      });
  });

  return createGame
    .then((response) => ({type: CREATE_GAME_SUCCESS, payload: response }))
    .catch((error) => ({type: LEAVE_GAME, payload: error.message}))
}

export function startGameService (payload) {
  const user = payload.user;
  const roomId = payload.room._id;
  const countdownAmount = 5000;

  const startGame = new Promise(function(resolve, reject) {

    const countdownStartTime = Date.now();
    const gameStartTime = countdownStartTime + countdownAmount;
    const gameEndTime = gameStartTime + 120000;

    app.service("multirooms")
      .patch(roomId, {
          gameStartTime: gameStartTime,
          gameEndTime: gameEndTime,
          gameStarted: true
      })
      .then((response) => {
        resolve(
          {
            gameId: response.gameId,
            gameStartTime: response.gameStartTime,
            gameEndTime: response.gameEndTime,
            quoteToType: response.quoteToType,
            quoteAfflink: response.quoteToType,
            isStarted: true,
            room: response
          }
        );
      })
      .catch((error) => {
        console.log(error);
        reject({ message: "Error creating" });
      });
  });

  return startGame
    .then((response) => ({type: START_GAME_SUCCESS, payload: response }))
    .catch((error) => ({type: LEAVE_GAME, payload: error.message}))
}

export function joinRoomService (payload) {
  const gameId = payload.gameId;
  const user = payload.user;

  const joinGame = new Promise(function(resolve, reject) {

    app.service("multirooms")
      .find({
        $limit: 1,
        query: {
          gameId: gameId
        }
      })
      .then((response) => {
        const playerToAdd = {
          playerId: payload.user.usernames,
          gameCreator: false,
          wpm: 0,
          completed: false
        };
        const roomId = response.data[0]._id;
        const patchedplayerList = response.data[0].playerList;
        patchedplayerList.push(playerToAdd);
        return app.service("multirooms").patch(roomId, {
          playerList: patchedplayerList
        });
      })
      .then((response) => {
        resolve(
          {
            gameId: response.gameId,
            room: response,
            isJoined: true
          }
        );
      })
      .catch((error) => {
        console.log(error);
        reject({ message: "Error joining" });
      });
  });

  return joinGame
    .then((response) => ({type: JOIN_GAME_SUCCESS, payload: response }))
    .catch((error) => ({type: LEAVE_GAME, payload: error.message}))
}

export function startGameForJoinsService (payload) {
  let user = payload.user;

  const startGameForJoins = new Promise(function(resolve, reject) {
    if (startedGame) {
      const startGameId = payload.gameId;
      const quoteToType = getQuoteToType();
      const quoteAfflink = "www.google.com";
      const countdownStartTime = Date.now();
      const gameStartTime = countdownStartTime + countdownAmount;
      if (startGameIdAdded) {
        resolve(
          {
            gameId: startGameId,
            countdownStartTime: countdownStartTime,
            gameStartTime: gameStartTime,
            quoteToType: quoteToType,
            quoteAfflink: quoteAfflink,
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