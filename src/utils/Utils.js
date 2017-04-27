export function getTodayFormatted() {
  //Get the todays date with the format yyyyMMdd
  return new Date().toISOString().slice(0,10).split('-').join('');
}

export function getRandomNumberBetweenRange(max, min) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function createRandomGameId () {
  var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var letterPart = alphabet[getRandomNumberBetweenRange(0, 26)] + alphabet[getRandomNumberBetweenRange(0, 26)];
  var numberPart = getRandomNumberBetweenRange(1000, 9999).toString();
  var totalGameId = letterPart + numberPart;
  return totalGameId
}

export function getQuoteToType () {
  const quoteArr = ["a", "b", "c"];
  return quoteArr[getRandomNumberBetweenRange(0, 3)];
}

export function countdownToSeconds (countdownValue) {
  return Math.round((countdownValue - Date.now()) / 1000);
}