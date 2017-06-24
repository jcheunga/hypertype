export function getTodayFormatted() {
  //Get the todays date with the format yyyyMMdd
  return new Date().toISOString().slice(0,10).split('-').join('');
}

export function getRandomNumberBetweenRange(max, min) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function createRandomGameId () {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const letterPart = alphabet[getRandomNumberBetweenRange(0, 26)] + alphabet[getRandomNumberBetweenRange(0, 26)];
  const numberPart = getRandomNumberBetweenRange(1000, 9999).toString();
  const totalGameId = letterPart + numberPart;
  return totalGameId
}

export function createRandomGuestUserId () {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const letterPart = alphabet[getRandomNumberBetweenRange(0, 26)] + alphabet[getRandomNumberBetweenRange(0, 26)];
  const numberPart = getRandomNumberBetweenRange(1000, 9999).toString();
  const totalGameId = letterPart + numberPart;
  const gameId = "Guest" + totalGameId;
  return gameId
}

export function getQuoteToType () {
  const quoteArr = ["Aaaaa Aaaaa Aaaaa", "Lorem Ipsum is simply.", "Lorem"];
  return quoteArr[getRandomNumberBetweenRange(0, quoteArr.length)];
}

export function countdownToSeconds (countdownValue) {
  if (countdownValue) {
    return Math.round((Date.now() - countdownValue) / 1000);
  }
}

export function sortMapResponse (playerList) {
  if (playerList !== undefined) {
    return playerList.sort((a, b) => {
      return b.wpm - a.wpm;
    })
  }
}

import converter from 'number-to-words';

export function getOrdinalValue (playerList, user) {
  let sortedList = playerList.sort((a, b) => {
    return b.wpm - a.wpm;
  });

  for (var i = 0; i < sortedList.length; i++) {
    if (sortedList[i].completed === true) {
      if (sortedList[i].playerId === user.usernames) {
        return converter.toOrdinal(i + 1);
      }
    }
  }
}