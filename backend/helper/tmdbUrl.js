const IMAGE_BASE_URL = "http://image.tmdb.org/t/p/";
// Sizes: w300, w780, w1280, original
const BACKDROP_SIZE = "w1280";
// w92, w154, w185, w342, w500, w780, original
const POSTER_SIZE = "w780";
// w92, w154, w185, w342, w500, w780, original
const PERSON_SIZE = "w185";

const URLBACKDROP = `${IMAGE_BASE_URL}${BACKDROP_SIZE}`;
const URLPOSTER = `${IMAGE_BASE_URL}${POSTER_SIZE}`;
const URLPERSON = `${IMAGE_BASE_URL}${PERSON_SIZE}`;

module.exports = { URLBACKDROP, URLPOSTER, URLPERSON };
