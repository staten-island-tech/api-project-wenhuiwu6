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

let data = [];
async function getAllData() {
  try {
    const response = await fetch(
      "https://kitsu.io/api/edge/anime?page[limit]=5&page[offset]=1000"
    );
    if (response.status != 200) {
      throw new Error(repsonse);
    } else {
      data = await response.json();
      data.data.forEach((card) => console.log(card));
    }
  } catch (error) {
    console.log(error);
  }
}

function inject(item) {
  const container = document.querySelector(".container");
  console.log("we are putting this in", item);
  const html = `
    <div class="card"
         data-name="${item.name}"
         data-img="${item.image}"
         data-alt="${item.alt}"
         data-year="${item.year}">
      <img class="card-img" src="${item.image}">
      <h2 class="card-name">${item.name}</h2>
      <p class="card-alt">${item.alt}</p>
      <p class="card-year">Year: ${item.year}</p>
      <button class="toRead">Read</button>
    </div>`;
  container.insertAdjacentHTML("afterbegin", html);
}

getAllData();
console.log("this is data", data);
data.data.forEach((item) => inject(item));
