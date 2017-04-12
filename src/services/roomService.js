import {
  FIND_GAME_SUCCESS,
  FIND_NEW_GAME_SUCCESS,
  CREATE_GAME_REQUEST,
  CREATE_GAME_SUCCESS,
  RESPONSE_FAILURE
} from '../modules/play/PlayState';

const quoteArr = ["Hi there how are you?", "Windows Powershell", "Android Emulator"];
const minimum = 0;
const maximum = 2;

export function findRoom (payload) {
  let user = payload.id;
  let foundGame = false;
  let createGameIdAdded = true;
  let countdownAmount = 5000;
  let randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
  
  var fetchGame = new Promise(function(resolve, reject) {
    if (foundGame) {
      let quoteToType = quoteArr[randomnumber];
      let quoteReferralURL = "www.google.com";
      let findGameId = "123456";
      let countdownStartTime = Date.now(); 
      let countdownEndTime = countdownStartTime + countdownAmount;
      if (hasGameId) {
        resolve(
          {
            gameId: findGameId,
            countdownStartTime: countdownStartTime,
            countdownEndTime: countdownEndTime,
            quoteToType: quoteToType,
            quoteReferralURL: quoteReferralURL
          }
        );
      } else {
        reject({ message: "Error joining" })
      }
    } else {
      let createGameId = Date.now()+Math.floor(Math.random() * 1000).toString();
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
    .then((response) => ({type: payload.inGame ? FIND_NEW_GAME_SUCCESS : FIND_GAME_SUCCESS, payload: response }))
    .catch((error) => ({type: RESPONSE_FAILURE, payload: error.message}))
}

export function createRoom () {

}

function getQuoteToType () {

}