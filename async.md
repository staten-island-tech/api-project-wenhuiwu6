## Async Await

Below We had chatGPT analyze my demo from class.

- It opens a simple web page.
- Behind the scenes, it **talks to a Pokémon website (an API)** to get info about **Charmander**.
- If everything works, it **shows Charmander’s name on the page**.
- If something goes wrong, it **catches the error** and logs `"no bueno"` in the console.

We’ll break it into two parts:

1. `index.html` – the **webpage structure**
2. `poke.js` – the **JavaScript brain** that fetches Pokémon data

---

## 2. `index.html` – The Simple Webpage

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Fetch API</title>
  </head>
  <body>
    Open the console!
    <h2 id="api-response"></h2>
    <script src="poke.js"></script>
  </body>
</html>
```

### What’s going on here?

- `<!DOCTYPE html>` – Says: “This is an HTML5 page.”
- `<html lang="en">` – The page is in English.
- `<head> ... </head>` – Hidden info about the page:

  - `meta` tags handle things like text encoding and mobile layout.
  - `<title>Fetch API</title>` – The title that shows on the browser tab.

### The important part for us is the `<body>`:

```html
<body>
  Open the console!
  <h2 id="api-response"></h2>
  <script src="poke.js"></script>
</body>
```

- The text **“Open the console!”** reminds you to open DevTools → Console so you can see logs.
- `<h2 id="api-response"></h2>`

  - This is an **empty heading** where we’ll put the Pokémon’s name.
  - The `id="api-response"` is like a name tag so JavaScript can find it.

- `<script src="poke.js"></script>`

  - This **loads your JavaScript file**.
  - Think of it as: “Attach the brain file called `poke.js` to this page.”

---

## 3. `poke.js` – The Pokémon Fetching Brain

```js
const URL = "https://pokeapi.co/api/v2/pokemon/charmander";

async function getData(URL) {
  try {
    const response = await fetch(URL);
    if (response.status != 200) {
      throw new Error(response);
    } else {
      const data = await response.json(); //makes the data into JSON object we can use
      console.log(data);
      document.getElementById("api-response").textContent = data.name;
    }
  } catch (error) {
    console.log(error);
    console.log("no bueno");
  }
}
getData(URL);
```

Let’s explain this piece by piece.

---

### 3.1 The URL

```js
const URL = "https://pokeapi.co/api/v2/pokemon/charmander";
```

- `const` means this variable **will not be changed**.
- `URL` is the **address** of the Pokémon API for **Charmander**.
- This website is like a **Pokédex server** that returns data about a Pokémon.

---

### 3.2 The `async function getData(URL)`

```js
async function getData(URL) {
  ...
}
```

- `function getData(URL)` – We’re creating a function named **getData** that takes a **URL** as input.
- The word **`async`** means:

  - “This function will do **asynchronous** work.”
  - In human words: **It’s going to do something that takes time**, like calling a website.
  - Inside an `async` function, we can use the word **`await`**.

---

## 4. What is `await fetch(URL)`?

```js
const response = await fetch(URL);
```

- `fetch(URL)` is like **sending a request** to the Pokémon server:

  - “Hey, can you give me the data for the Pokémon at this URL?”

- `await` means:

  - “Pause this function here and **wait** for the server to answer.”
  - JavaScript doesn’t freeze the whole browser, only this function. The rest of the page can still move and work.

The result we get back is stored in `response`.

---

## 5. Response Status Numbers (Very Important!)

```js
if (response.status != 200) {
  throw new Error(response);
}
```

- `response.status` is a **number** that tells us how the request went.
- These numbers are called **HTTP status codes**.

Think of it like grade codes on your homework:

- **200** → ✅ “OK!” Everything worked.
- **404** → ❓ “Not found.” Like asking for a Pokémon that doesn’t exist.
- **500** → 💥 “Server error.” The server (the website) is broken or messed up.
- **400** → 🤨 “Bad request.” Something is wrong with the way you asked.

In your code:

- You’re saying: **“If the status is NOT 200, something went wrong.”**
- Then you do:

  ```js
  throw new Error(response);
  ```

  - “Throwing” an error means: **“Hey, something broke – jump to the `catch` section!”**

---

## 6. Turning the Response into Usable Data

If the status **is** 200, we go to the `else`:

```js
const data = await response.json(); //makes the data into JSON object we can use
console.log(data);
document.getElementById("api-response").textContent = data.name;
```

### Step by step:

1. `await response.json()`

   - The server first sends back data in a **text-like format** called JSON (like a nicely formatted note).
   - `response.json()` **parses** it (turns it) into a **JavaScript object** you can use.
   - We `await` this too, because it also takes a bit of time.

2. `const data = ...`

   - Now `data` is a huge object filled with info about Charmander.

3. `console.log(data);`

   - This prints the whole object into the **console** so you can inspect it.

4. `document.getElementById("api-response").textContent = data.name;`

   - `document.getElementById("api-response")` finds the `<h2>` from the HTML page.
   - `.textContent = data.name;` changes the inside text to the Pokémon’s name.
   - So now our webpage will show:

     > **charmander**

---

## 7. What is `try { ... } catch (error) { ... }`?

Your whole function is wrapped in:

```js
try {
  // do risky stuff here
} catch (error) {
  // handle problems here
}
```

### Imagine this like:

- `try` – “Try to do this stuff. It might fail.”
- `catch` – “If anything goes wrong in the try block, **don’t crash the whole program**, run this instead.”

In your code:

```js
try {
  const response = await fetch(URL);
  if (response.status != 200) {
    throw new Error(response);
  } else {
    const data = await response.json();
    console.log(data);
    document.getElementById("api-response").textContent = data.name;
  }
} catch (error) {
  console.log(error);
  console.log("no bueno");
}
```

- If:

  - The internet is down, or
  - The URL is wrong, or
  - The server replies with a bad status…

- Then an **error** is “thrown,” and the code **jumps straight to `catch`**.

Inside `catch`:

```js
console.log(error);
console.log("no bueno");
```

- `console.log(error);` shows what went wrong.
- `"no bueno"` is just a funny message meaning “this is not good.”

---

## 8. Calling the Function

At the bottom:

```js
getData(URL);
```

- This actually **runs** your function.
- It starts the whole process:

  1. Call the Pokémon API.
  2. Wait for the response.
  3. Check the status code.
  4. If status is 200, read the data and show the name.
  5. If anything goes wrong, use `catch` to handle it.

---

## 9. Quick Middle School Summary

- **HTML file**: the skeleton of the page, with a spot (`<h2 id="api-response">`) where the Pokémon’s name will appear.
- **JavaScript file**: the brain that:

  - uses an **async function** to fetch data from a Pokémon API
  - uses **await** to pause while waiting for the server
  - checks `response.status` (200 means OK)
  - uses `try` and `catch` to safely handle errors
  - updates the web page with `data.name` (Charmander!)

---
