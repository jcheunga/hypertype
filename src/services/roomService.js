import {
  FIND_GAME_SUCCESS,
  CREATE_GAME_REQUEST,
  CREATE_GAME_SUCCESS,
  RESPONSE_FAILURE
} from '../modules/play/PlayState';
import * as Utils from '../utils/Utils';
import * as env from '../../env';

export function findRoom(id) {
  let user = id;
  let foundGame = false;
  let createGameIdAdded = true;

  var fetchGame = new Promise(function(resolve, reject) {
    if (user) {
      if (foundGame) {
        if (hasGameId) {
          resolve(
            {
              gameId: "findGameId"
            }
          );
        } else {
          reject({ message: "Error joining" })
        }
      } else {
        let createGameId = Date.now()+Math.floor(Math.random()*1000).toString();
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
    } else {
      if (foundGame) {
        if (hasGameId) {
          resolve(
            {
              gameId: "findGameId"
            }
          );
        } else {
          reject({ message: "Error joining" })
        }
      } else {
        let createGameId = Date.now()+Math.floor(Math.random()*1000).toString();
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
    }
    // resolve({gameId: 'Hey'});
  });

  return fetchGame
    .then((response) => ({type: FIND_GAME_SUCCESS, payload: { gameId: response.gameId }}))
    .catch((error) => ({type: RESPONSE_FAILURE, payload: error.message}))
}

export function createRoom() {

}