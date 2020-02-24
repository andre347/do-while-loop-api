import fetch from "node-fetch";
// Basic do while loop
// Logs a message to the console
// @andre347_

function doLoop() {
  // create an empty message
  let message = "";
  // we want to log a message 5 times
  let i = 5;
  // execute this code block..
  do {
    message += `The number decreased to ${i} \n`;
    // decrement i in each loop - so 5, 4, 3, 2, 1
    i--;
  } while (i > 0);
  // while i is more than 0 log something to the console
  console.log(message);
}

// make sure we call our function
// console.time("Timer");
// doLoop();
// console.timeEnd("Timer");

// API Pagination
// Returns data if there are more pages of data
// SWAPI API: https://swapi.co/
// @andre347_

async function getPages() {
  // set some variables
  const baseUrl = `https://swapi.co/api/people/?format=json&page=`;
  let page = 1;
  // create empty array where we want to store the people objects for each loop
  let people = [];
  // create a lastResult array which is going to be used to check if there is a next page
  let lastResult = [];
  do {
    // try catch to catch any errors in the async api call
    try {
      // use node-fetch to make api call
      const resp = await fetch(`${baseUrl}${page}`);
      const data = await resp.json();
      lastResult = data;
      data.results.forEach(person => {
        // destructure the person object and add to array
        const { name, height, films } = person;
        people.push({ name, height, films });
      });
      // increment the page with 1 on each loop
      page++;
    } catch (err) {
      console.error(`Oeps, something is wrong ${err}`);
    }
    // keep running until there's no next page
  } while (lastResult.next !== null);
  // let's log out our new people array
  console.log(people);
}

console.time("Time my API call");
getPages();
console.timeEnd("Time my API call");
