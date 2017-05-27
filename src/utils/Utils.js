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
  const quoteArr = ["aaaaa aaaaa aaaaa", "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", "Lorem Ipsum is simply dummy text of the printing and typesetting industry."];
  return quoteArr[getRandomNumberBetweenRange(0, quoteArr.length)];
}

export function countdownToSeconds (countdownValue) {
  return Math.abs(Math.round((countdownValue - Date.now()) / 1000));
}