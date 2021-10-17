function onClick(e) {
  e.preventDefault();
  // get form values
  let daWord = document.getElementById("daWord").value;
  // let s = document.getElementById("selector");
  // let type = s.options[s.selectedIndex].value;

  // check if number is empty
  if (daWord === "") {
    daWord = "random";
  }

  // setup URL
  let url =
    "https://www.dictionaryapi.com/api/v3/references/spanish/json/" +
    daWord +
    "?key=5b38b52e-269c-448b-bfed-d0de7a6e6f4c";

  fetch(url)
    .then(function (response) {
      // make sure the request was successful
      if (response.status != 200) {
        return {
          text: "Error calling the Numbers API service: " + response.statusText
        };
      }
      return response.json();
    })
    .then(function (json) {
      var output = document.getElementById("results");
      if (typeof json[0] === "string") {
        output.innerHTML = `Sorry, I don't know that word. Did you mean: <ul><li>
        ${json.join(`</li><li>`)}
        </li></ul>`;
      } else {
        var outputTxt = "";
        outputTxt = `
      <h1>${daWord} <span class="phonetic"> (${json[0].hwi.prs[0].mw})</span> </h1>
      <hr>
      <h2>Translations <span class="audioDesc">Press any for  &#128264;</span></h2>
      <ol>
      `;
        let wordLen = daWord.length;
        for (let i = 0; i < json.length; i++) {
          if (json[i].meta.id.substr(0, wordLen) === daWord.toLowerCase()) {
            if (
              json[i].meta.id.length == wordLen ||
              json[i].meta.id.indexOf(":") != -1
            ) {
              outputTxt +=
                '<li><a class= "sound" onmousedown="getSound(this)">' +
                json[i].shortdef.join(
                  '</li></a><li><a class = "sound" onmousedown="getSound(this)">'
                ) +
                "</li>";
            }
          }
        }
        outputTxt += "</ol>";

        output.innerHTML = outputTxt;
      }

      // update DOM with response
      // updateResult(json[0].shortdef[0]);
      //updateResult(json.text);
    });
}

// function getSound(val) {
//   var sound = new Audio();
//   let info = val.innerHTML;
//   if (info.indexOf(":") != -1) {
//     info = info.substr(info.indexOf(":") + 2);
//   }

//   let link = "https://media.merriam-webster.com/audio/prons/es/me/mp3/";

//   // setup URL
//   let url =
//     "https://www.dictionaryapi.com/api/v3/references/spanish/json/" +
//     info +
//     "?key=5b38b52e-269c-448b-bfed-d0de7a6e6f4c";

//   fetch(url)
//     .then(function (response) {
//       // make sure the request was successful
//       if (response.status != 200) {
//         return {
//           text: "Error calling the Numbers API service: " + response.statusText
//         };
//       }
//       return response.json();
//     })
//     .then(function (json) {
//       if (typeof json[0] === "string") {
//         alert("ERROR");
//       } else {
//         link +=
//           json[0].hwi.prs[0].sound.audio.substr(0, 1) +
//           "/" +
//           json[0].hwi.prs[0].sound.audio +
//           ".mp3";
//         sound.src = link;
//         sound.play();
//       }
//     });

//   //[subdirectory]/[base filename].[format]";
// }

function updateResult(info) {
  //document.getElementById('results').textContent = info;
  document.getElementById("results").innerHTML += info;
}

var a = document.getElementById("woo");
if (a) {
  a.addEventListener("click", onClick);
}
