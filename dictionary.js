const API_KEY = "?key=bc0fa825-5ff5-4a2e-ab7a-800738ae1630";
const ENDPOINT =
  "https://www.dictionaryapi.com/api/v3/references/collegiate/json/";

document.querySelector("#dict-form").onsubmit = async (e) => {
  e.preventDefault();
  const word = e.srcElement[0].value;
  const data = await getDictData(word);
  console.log("Data for", word, data);
  writeDictData(data);
};

/**
 * getDictData
 * @param {string} word The word being defined
 */
function getDictData(word) {
  return fetch(ENDPOINT + word + API_KEY).then((r) => {
    return r.json();
  });
}

/**
 * writeDictData
 * @param {object} data the data from Miriam Webster
 */
function writeDictData(data) {
  const output = document.querySelector(".results");
  try {
    // Webster returns suggestions
    if (typeof data[0] === "string") {
      output.innerHTML = `Sorry, I don't know that word. Did you mean: <ul><li>
    ${data.join(`</li><li>`)}
    </li></ul>`;
    }

    // Webster returns nothing
    else if (data.length === 0) {
      output.innerHTML = `Sorry, I don't know that word. Try again?`;
    }

    // Webster finds it
    else if (data[0].hwi) {
      let def = data[0].def[0].sseq;
      while (typeof def[0] !== "string") {
        def = def[0];
      }
      console.log(def);
      output.innerHTML = `
      <h1>${data[0].meta.id} <span class="phonetic"> (${
        data[0].hwi.prs[0].mw
      })</span></h1>
      <hr>
      <h3>Definition</h3>
        ${`<span class="part-of-speech">${data[0].fl}</span>
          <p>${replaceDef(def[1].dt[0][1])}</p>`}
    `;
    }
  } catch (error) {
    output.innerHTML = `
      Sorry, there was an error. Please try another word.
    `;
  }
  return;
}

function replaceDef(str) {
  console.log("str:", str);
  str = str.replace(/{bc}/g, ":");

  return str;
}
