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

const partyImages = new Set();
const gifContainer = document.getElementById("gif-container");
let offset = 0;
let uniqueImg = false;

function startParty() {
  console.log("Let's get this party started!");
  const searchButton = document.getElementById("search-btn");
  const clearButton = document.getElementById("clear-btn");
  searchButton.addEventListener("click", function (e) {
    e.preventDefault();
  });
  searchButton.addEventListener("click", addGif);
  clearButton.addEventListener("click", clearParty);
}

function getDownSizedGif(gif) {
  return gif.data.data[0].images.downsized.url;
}

function getGifRoot(url) {
  console.log(url.slice(0, url.indexOf("?")));
  return url.slice(0, url.indexOf("?"));
}

// function which finds a gif and appends it to the page
async function searchGif(term, o = 2, n = 1) {
  console.log("searching");
  const endpoint = "https://api.giphy.com/v1/gifs/search";
  const key = "FzuWJvCfRf2eX3gj35rlYcSOuwroI5KC";
  const result = await axios.get(endpoint, {
    params: {
      api_key: key,
      q: term,
      limit: n,
      offset: o,
    },
  });
  console.log(result);
  console.log(result.data.data[0].images.downsized.url);
  //   let newImg = new Image();
  newImgUrl = getDownSizedGif(result);
  //   newImg.src = newImgUrl;
  // return new image url
  return newImgUrl;
}

async function addGif(term) {
  console.log("adding");
  let newImgUrl = null;
  uniqueImg = false;
  // get a gif
  // check if gif is in set already
  // add image to page
  const newImg = new Image();
  while (!uniqueImg) {
    offset += 1;
    newImgUrl = await searchGif(term, offset);
    newImgUrlRoot = getGifRoot(newImgUrl);
    if (!partyImages.has(newImgUrlRoot)) {
      partyImages.add(newImgUrlRoot);
      uniqueImg = true;
    }
  }
  newImg.src = newImgUrl;
  //   partyImages.add(newImgUrl);
  const newImgDiv = document.createElement("div");
  newImgDiv.classList.add("gif");
  newImgDiv.append(newImg);
  gifContainer.append(newImgDiv);
  offset = 0;
  uniqueImg = false;
  console.log("partyImages length", partyImages.size);
  console.log(partyImages);
  return partyImages;
}

function clearParty() {
  console.log("clearing");
  partyImages.clear();
  gifContainer.innerHTML = "";
}

document.addEventListener("DOMContentLoaded", startParty);
