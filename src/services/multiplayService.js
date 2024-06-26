import {
  CREATE_GAME_SUCCESS,
  START_GAME_SUCCESS,
  JOIN_GAME_SUCCESS,
  START_GAME_FOR_JOINS_SUCCESS,
  SERVICE_ERROR
} from '../modules/multiplay/MultiplayState';
import { createRandomGameId } from '../utils/Utils';

import app from '../feathers';

// IF BOTH IN SAME GAMEID AND PRESS PLAY AGAIN THEN CREATE NEW ID AND SEND TO BOTH PEOPLE

export function createRoomService (payload) {
  const user = payload.user;

  const createGame = new Promise(function(resolve, reject) {
    const createGameId = createRandomGameId();

    const createRoomData = {
      gameId: createGameId,
      gameStarted: false,
      playerList: [
        {
          playerId: user.usernames,
          gameCreator: true,
          wpm: 0,
          completed: false
        }
      ]
    };

    app.service("multirooms").create(createRoomData)
      .then((response) => {
        resolve(
          {
            gameId: response.gameId,
            isCreated: true,
            room: response
          }
        );
      }).catch((error) => {
        reject({ message: error })
      });
  });

  return createGame
    .then((response) => ({type: CREATE_GAME_SUCCESS, payload: response }))
    .catch((error) => ({type: SERVICE_ERROR, payload: error.message}))
}

export function startGameService (payload) {
  const user = payload.user;
  const roomId = payload.room._id;
  const countdownAmount = 5;

  const startGame = new Promise(function(resolve, reject) {

    app.service("multirooms")
      .patch(roomId, {
          countdownTime: countdownAmount,
          gameStarted: true
      })
      .then((response) => {
        resolve(
          {
            gameId: response.gameId,
            countdownTime: response.countdownTime,
            quoteData: response.quoteData,
            isStarted: true,
            room: response
          }
        );
      })
      .catch((error) => {
        reject({ message: "Error creating" });
      });
  });

  return startGame
    .then((response) => ({type: START_GAME_SUCCESS, payload: response }))
    .catch((error) => ({type: SERVICE_ERROR, payload: error.message}))
}

export function joinRoomService (payload) {
  const gameId = payload.gameId;
  const user = payload.user;

  const joinGame = new Promise(function(resolve, reject) {

    app.service("multirooms")
      .find({
        $limit: 1,
        query: {
          gameId: gameId,
          gameStarted: false
        }
      })
      .then((response) => {
        if (response.total !== 0) {
          const playerToAdd = {
            playerId: user.usernames,
            gameCreator: false,
            wpm: 0,
            completed: false
          };
          const roomId = response.data[0]._id;
          const patchedplayerList = response.data[0].playerList;
          let matched = false;
          for (let i = 0; i < patchedplayerList.length; i++) {
            if (patchedplayerList[i].playerId === user.usernames) {
              matched = true;
              break;
            }
          }
          if (!matched) {
            patchedplayerList.push(playerToAdd);
          }
          return app.service("multirooms").patch(roomId, {
            playerList: patchedplayerList
          });
        } else {
          throw new Error("Invalid ID entered");
        }
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
        reject({ message: error });
      });
  });

  return joinGame
    .then((response) => ({type: JOIN_GAME_SUCCESS, payload: response }))
    .catch((error) => ({type: SERVICE_ERROR, payload: error.message}))
}

export function startGameForJoinsService (payload) {
  const room = payload.room;

  const startGameForJoins = new Promise(function(resolve, reject) {

    if (room._id) {
      resolve(
        {
          gameId: room.gameId,
          countdownTime: room.countdownTime,
          quoteData: room.quoteData,
          isStarted: true,
          room: room
        }
      );
    } else {
      reject({ message: "Error starting" })
    }
  });

  return startGameForJoins
    .then((response) => ({type: START_GAME_FOR_JOINS_SUCCESS, payload: response }))
    .catch((error) => ({type: SERVICE_ERROR, payload: error.message}))
}