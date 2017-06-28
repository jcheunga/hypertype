import {
  FIND_GAME_SUCCESS,
  FIND_NEW_GAME_SUCCESS,
  LEAVE_GAME
} from '../modules/play/PlayState';
import { createRandomGameId, getQuoteToType } from '../utils/Utils';

import app from '../feathers';

export function findRoomService (payload) {
  const user = payload.user;
  const countdownAmount = 10000;
  const countdownCutOffAmount = 4000;

  const fetchGame = new Promise(function(resolve, reject) {
    app.service("rooms")
      .find({
        $limit: 1,
        query: {
          gameStartTime: {
            $gte: Date.now() + countdownCutOffAmount
          }
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
          return app.service("rooms").patch(roomId, {
            playerList: patchedplayerList
          });
        } else {
          const quoteData = getQuoteToType();
          const createGameId = createRandomGameId();
          const countdownStartTime = Date.now();
          const gameStartTime = countdownStartTime + countdownAmount;
          const gameEndTime = gameStartTime + 120000;

          const createRoomData = {
            gameId: createGameId,
            gameStartTime: gameStartTime,
            gameEndTime: gameEndTime,
            quoteData: quoteData,
            playerList: [
              {
                playerId: payload.user.usernames,
                gameCreator: true,
                wpm: 0,
                completed: false
              }
            ]
          };
          return app.service("rooms").create(createRoomData);
        }
      })
      .then((response) => {
        resolve(
          {
            gameId: response.gameId,
            gameStartTime: response.gameStartTime,
            gameEndTime: response.gameEndTime,
            quoteData: response.quoteData,
            room: response,
            inGame: true
          }
        );
      })
      .catch((error) => {
        reject({ message: error });
      });
  });

  const fetchQuote = new Promise(function(resolve, reject) {

  });

  return fetchGame
    .then((response) => ({type: payload.inGame ? FIND_NEW_GAME_SUCCESS : FIND_GAME_SUCCESS, payload: response }))
    .catch((error) => ({type: LEAVE_GAME, payload: error.message}))
}