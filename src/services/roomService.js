import {
  FIND_GAME_SUCCESS,
  CREATE_GAME_REQUEST,
  CREATE_GAME_SUCCESS,
  RESPONSE_FAILURE
} from '../modules/play/PlayState';

export function findRoom (id) {
  let user = id;
  let foundGame = false;
  let createGameIdAdded = true;

  var fetchGame = new Promise(function(resolve, reject) {
    if (foundGame) {
      let quoteToType = "Hi there how are you?";
      let quoteReferralURL = "www.google.com";
      let findGameId = "123456";
      let gameStartTime = Date.now(); 
      let gameEndTime = gameStartTime + 10000;
      if (hasGameId) {
        resolve(
          {
            gameId: findGameId,
            gameStartTime: gameStartTime,
            gameEndTime: gameEndTime,
            quoteToType: quoteToType,
            quoteReferralURL: quoteReferralURL
          }
        );
      } else {
        reject({ message: "Error joining" })
      }
    } else {
      let createGameId = Date.now()+Math.floor(Math.random()*1000).toString();
      let quoteToType = "Hi there how are you?";
      let quoteReferralURL = "www.google.com";
      let gameStartTime = Date.now();
      let gameEndTime = gameStartTime + 10000;
      if (createGameIdAdded) {
        resolve(
          {
            gameId: createGameId,
            gameStartTime: gameStartTime,
            gameEndTime: gameEndTime,
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
    .then((response) => ({type: FIND_GAME_SUCCESS, payload: response }))
    .catch((error) => ({type: RESPONSE_FAILURE, payload: error.message}))
}

export function createRoom () {

}

function getQuoteToType () {

}