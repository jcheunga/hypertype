import {
  FIND_GAME_SUCCESS,
  FIND_NEW_GAME_SUCCESS,
  LEAVE_GAME
} from '../modules/play/PlayState';
import { createRandomGameId, getQuoteToType } from '../utils/Utils';

import app from '../feathers';

export function findRoomService (payload) {
  const user = payload.user;
  const countdownAmount = 5000;
  const countdownCutOffAmount = 5000;

  const fetchGame = new Promise(function(resolve, reject) {
    app.service("rooms")
      .find({
        $limit: 1,
        query: {
          completed: false,
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
          patchedplayerList.push(playerToAdd);
          return app.service("rooms").patch(roomId, {
            playerList: patchedplayerList
          });
        } else {
          const quoteToType = getQuoteToType();
          const createGameId = createRandomGameId();
          const countdownStartTime = Date.now();
          const gameStartTime = countdownStartTime + countdownAmount;
          const gameEndTime = gameStartTime + 120000;

          const createRoomData = {
            gameId: createGameId,
            gameStartTime: gameStartTime,
            gameEndTime: gameEndTime,
            quoteToType: quoteToType,
            quoteAfflink: quoteToType,
            completed: false,
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
            quoteToType: response.quoteToType,
            quoteAfflink: response.quoteAfflink,
            inGame: true
          }
        );
      })
      .catch((error) => {
        reject({ message: error });
      });
  });

  return fetchGame
    .then((response) => ({type: payload.inGame ? FIND_NEW_GAME_SUCCESS : FIND_GAME_SUCCESS, payload: response }))
    .catch((error) => ({type: LEAVE_GAME, payload: error.message}))
}