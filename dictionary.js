const API_KEY = "?key=bc0fa825-5ff5-4a2e-ab7a-800738ae1630";
const ENDPOINT =
  "https://www.dictionaryapi.com/api/v3/references/collegiate/json/";

/**
 * getDictData
 * @param {string} word The word being defined
 */
function getDictData(word) {
  fetch(ENDPOINT + word + API_KEY)
    .then((r) => {
      return r.json();
    })
    .then((json) => console.log(json));
}
