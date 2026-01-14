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

async function getAllData() {
  try {
    const response = await fetch(
      "https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=100"
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
    <div class="card bg-white p-4 rounded shadow"
        data-name="${data.attributes.titles.en}" 
      <h2 class="card-title font-bold">
        ${data.attributes.titles.en}
      </h2>
      <h2 class="card-title text-sm text-gray-500">
        ${data.attributes.titles.ja_jp}
      </h2>
      <p class="card-alt text-sm">
        ${data.attributes.synopsis}
      </p>
      <img
        class="card-img mt-2 rounded"
        src="${data.attributes.posterImage.medium}"
      />
    </div>`;
  container.insertAdjacentHTML("afterbegin", html);
}
data.data.forEach((item) => inject(item));

document.getElementById("searchForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const value = document.getElementById("title").value.toLowerCase();
  const container = document.querySelector(".container");
  container.innerHTML = "";
  let found = false;

  anime.forEach((item) => {
    if (item.name.toLowerCase().includes(value)) {
      inject(item);
      found = true;
    }
  });
  if (!found) {
    container.innerHTML = "<p>No anime found.</p>";
  }
});

//the second api, testing if api work
async function searchAnimeAPI(searchTerm) {
  try {
    const response = await fetch(
      `https://kitsu.io/api/edge/anime?filter[text]=${searchTerm}`
    );
    //the search term here allows u to search the anime u tryna find ex: Evangelion
    if (!response.ok) {
      throw new Error("Search API failed");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.log(error);
  }
}

document
  .getElementById("searchForm")

  .addEventListener("submit", async function () {
    const container = document.querySelector(".container");
    const value = document.getElementById("title").value;
    container.innerHTML = "";

    const results = await searchAnimeAPI(value);

    if (!results || results.length === 0) {
      container.innerHTML = "<p class='text-center'>No anime found.</p>";
      return;
    }
    results.forEach((item) => inject(item));
  });
