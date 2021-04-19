'use strict';

//Add global variables
const results = document.getElementById("click-count");
const allImages = document.getElementById("allImages");
const leftProductImg = document.getElementById("left-image");
const midProductImg = document.getElementById("mid-image");
const rightProductImg = document.getElementById("right-image");
const leftProductPElem = document.getElementById("left-p-tag");
const midProductPElem = document.getElementById("mid-p-tag");
const rightProductPElem = document.getElementById("right-p-tag");

let totalClicks = 0;

let leftProduct = null;
let midProduct = null;
let rightProduct = null;

const ProductPictures = function (name, imagePath) {
  this.name = name;
  this.imagePath = imagePath;
  this.clicks = 0;
  this.timesShown = 0;
  ProductPictures.allImages.push(this);
}

// Array for product name object list
ProductPictures.allImages = [];

// Function that renders new products
function renderProduct() {
  leftProductImg.src = leftProduct.imagePath;
  midProductImg.src = midProduct.imagePath;
  rightProductImg.src = rightProduct.imagePath;

  leftProductPElem.textContent = leftProduct.name;
  midProductPElem.textContent = midProduct.name;
  rightProductPElem.textContent = rightProduct.name;
}

// Function that picks three different products randomly
function randomProduct() {
  const leftProdIndex = Math.floor(Math.random() * ProductPictures.allImages.length);
  let midProdIndex;
  while (midProdIndex === undefined || midProdIndex === leftProdIndex) {
    midProdIndex = Math.floor(Math.random() * ProductPictures.allImages.length);
  }
  let rightProdIndex;
  while (rightProdIndex === undefined || rightProdIndex === leftProdIndex || rightProdIndex === midProdIndex) {
    rightProdIndex = Math.floor(Math.random() * ProductPictures.allImages.length);
  }
  leftProduct = ProductPictures.allImages[leftProdIndex];
  midProduct = ProductPictures.allImages[midProdIndex];
  rightProduct = ProductPictures.allImages[rightProdIndex];
}

// Function to render a list of each product voted and clicked on stats
function displayVotes() {

  // Clears the current list
  results.innerHTML = ` `;
  const h3Elem = document.createElement("h3");
  h3Elem.textContent = `Results:`;
  results.appendChild(h3Elem);
  for (let prod of ProductPictures.allImages) {
    const liElem = document.createElement("li");
    liElem.textContent = `${prod.name}: ${prod.clicks}`;
    results.appendChild(liElem);
  }
}

// Handle the click event
function handleClick(event) {
  const clickedTarget = event.target;
  const id = clickedTarget.id;
  if (totalClicks < 25) {
    if (id === `left-image` || id === `mid-image` || id === `right-image`) {
      // increment total votes
      // increment individual product clicked vote count
      if (id === `left-image`) {
        leftProduct.clicks++;
      } else if (id === `mid-image`) {
        midProduct.clicks++;
      } else if (id === `right-image`) {
        rightProduct.clicks++;
      }
      totalClicks++;
      leftProduct.timesShown++;
      midProduct.timesShown++;
      rightProduct.timesShown++;
      randomProduct();
      renderProduct();
    }
  }
  if (totalClicks === 25) {
    allImages.removeEventListener('click', handleClick);
    displayVotes();
  }
}

new ProductPictures(`bag`, `./images/bag.jpg`);
new ProductPictures(`banana`, `./images/banana.jpg`);
new ProductPictures(`bathroom`, `./images/bathroom.jpg`);
new ProductPictures(`boots`, `./images/boots.jpg`);
new ProductPictures(`breakfast`, `./images/breakfast.jpg`);
new ProductPictures(`bubblegum`, `./images/bubblegum.jpg`);
new ProductPictures(`chair`, `./images/chair.jpg`);
new ProductPictures(`cthulhu`, `./images/cthulhu.jpg`);
new ProductPictures(`dog-duck`, `./images/dog-duck.jpg`);
new ProductPictures(`dragon`, `./images/dragon.jpg`);
new ProductPictures(`pen`, `./images/pen.jpg`);
new ProductPictures(`pet-sweep`, `./images/pet-sweep.jpg`);
new ProductPictures(`scissors`, `./images/scissors.jpg`);
new ProductPictures(`shark`, `./images/shark.jpg`);
new ProductPictures(`sweep`, `./images/sweep.png`);
new ProductPictures(`tauntaun`, `./images/tauntaun.jpg`);
new ProductPictures(`unicorn`, `./images/unicorn.jpg`);
new ProductPictures(`usb`, `./images/usb.gif`);
new ProductPictures(`water-can`, `./images/water-can.jpg`);
new ProductPictures(`wine-glass`, `./images/wine-glass.jpg`);

// listener
allImages.addEventListener('click', handleClick);

randomProduct();
renderProduct();