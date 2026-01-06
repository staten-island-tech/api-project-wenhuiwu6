import "./style.css";
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vite.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector('#counter'))

// const URL = "https://kitsu.io/api/edge/anime?page[limit]=5&page[offset]=500";

// async function getData(URL) {
//   try {
//     const response = await fetch(URL);
//     if (response.status != 200) {
//       throw new Error(response);
//     } else {
//       const data = await response.json(); //makes the data into JSON object we can use
//       console.log(data);
//       document.getElementById("api-response").textContent = data.name;
//     }
//   } catch (error) {
//     console.log(error);
//     console.log("no bueno");
//   }
// }
// getData(URL);

// async function getAllData() {
//   try {
//     const response = await fetch(
//       "https://kitsu.io/api/edge/anime?page[limit]=5&page[offset]=1000"
//     );
//     if (response.status != 200) {
//       throw new Error(repsonse);
//     } else {
//       const data = await response.json();
//       data.data.forEach((card) => console.log(card));
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }
// getAllData();

async function getAllData() {
  try {
    const response = await fetch(
      "https://kitsu.io/api/edge/anime?page[limit]=5&page[offset]=1000"
    );
    if (response.status != 200) {
      throw new Error(repsonse);
    } else {
      const data = await response.json();
      data.data.forEach((card) => console.log(card));
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}
getAllData();

const data = await getAllData();

function inject(data) {
  const container = document.querySelector(".container");
  const html = `
    <div class="card"
      <h2 class="card-title">${data.attributes.titles.en}</h2>
      <p class="card-alt">${data.attributes.synopsis}</p>
      <img class="card-img" src="${data.attributes.posterImage.tiny}"></img>
    </div>`;
  container.insertAdjacentHTML("afterbegin", html);
}
data.data.forEach((item) => inject(item));

// <img class="card-img" src="${data.posterImage.tiny}"></img>
// not working
if (data.attributes.titles.en === "undefined") {
  error;
}
