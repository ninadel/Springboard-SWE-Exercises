// Exercise: https://lessons.springboard.com/AJAX-Giphy-Party-c72b165a313145f6a2d679d37ec785db
// Your application should do the following:

// - Allow the user to search for a GIF and when the form is submitted, make an AJAX request to the Giphy API and return a single GIF
// - Once the Giphy API has responded with data, append the GIF to the page
// - Allow the user to search for as many GIFs as they would like and keep appending them to the page
// - Allow the user to remove all of the GIFs by clicking a button
// - Here is an example of what the application might look like

// https://developers.giphy.com/explorer/
// #gif-container

// button event listeners need to prevent default

function startParty() {
  console.log("Let's get this party started!");
  const searchButton = document.getElementById("search-btn");
  const clearButton = document.getElementById("clear-btn");
  const partyMembers = new Set();
  searchButton.addEventListener("click", function (e) {
    e.preventDefault();
  });
  searchButton.addEventListener("click", searchGif);
  clearButton.addEventListener("click", clearParty);
}

function getDownSizedGif(gif) {
  return gif.data.data[0].images.downsized.url;
}

// function which finds a gif and appends it to the page
async function searchGif(term, n = 1, offset = 0) {
  console.log("searching");
  const endpoint = "https://api.giphy.com/v1/gifs/search";
  const key = "FzuWJvCfRf2eX3gj35rlYcSOuwroI5KC";
  const result = await axios.get(endpoint, {
    params: {
      api_key: key,
      q: term,
      limit: n,
    },
  });
  console.log(result);
  console.log(result.data.data[0].images.downsized.url);
  let newImg = new Image();
  let newImgUrl = result.data.data[0].images.downsized.url;
  newImg.src = newImgUrl;
  const gifContainer = document.getElementById("gif-container");
  gifContainer.append(newImg);
}

function addGif(term) {
  console.log("adding");
  let offset = 0;
  // get a gif
  // check if gif is in set already
}

function clearParty() {
  console.log("clearing");
}

document.addEventListener("DOMContentLoaded", startParty);
