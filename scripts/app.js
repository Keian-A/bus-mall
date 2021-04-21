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

// variable to set number of votes
const voteAttempts = 25;

let totalClicks = 0;

let leftProduct = null;
let midProduct = null;
let rightProduct = null;

const ProductArray = function (name, imagePath) {
  this.name = name;
  this.imagePath = imagePath;
  this.clicks = 0;
  this.timesShown = 0;
  ProductArray.allImages.push(this);

  storeItems();
}

// Array for product name object list
ProductArray.allImages = [];

function searchStorage() {
  let stringifiedVotes = localStorage.getItem(`previousVotes`);
  if (stringifiedVotes) {
    let votesParsed = JSON.parse(stringifiedVotes);
    ProductArray.allImages = votesParsed;
    // console.log(votesParsed);
    renderProduct();
  } else {
    createProducts();
  }
}

// Stores the object list array in storage
function storeItems() {
  let stringifiedVotes = JSON.stringify(ProductArray.allImages);
  localStorage.setItem(`previousVotes`, stringifiedVotes);
}

// Function that renders new products
function renderProduct() {

  randomProduct();

  leftProductImg.src = leftProduct.imagePath;
  midProductImg.src = midProduct.imagePath;
  rightProductImg.src = rightProduct.imagePath;

  leftProductPElem.textContent = leftProduct.name;
  midProductPElem.textContent = midProduct.name;
  rightProductPElem.textContent = rightProduct.name;
}

// Function that picks three different products randomly
function randomProduct() {

  // variable to hold product order to prevent a duplicate after a round
  let productOrder = [];

  // add products to the productOrder array to prevent a duplicate
  productOrder.push(leftProduct);
  productOrder.push(midProduct);
  productOrder.push(rightProduct);
  while (productOrder.includes(leftProduct)) {
    let leftProdIndex = Math.floor(Math.random() * ProductArray.allImages.length);
    leftProduct = ProductArray.allImages[leftProdIndex];
  }
  productOrder.push(leftProduct);
  while (productOrder.includes(midProduct)) {
    let midProdIndex = Math.floor(Math.random() * ProductArray.allImages.length);
    midProduct = ProductArray.allImages[midProdIndex];
  }
  productOrder.push(midProduct);
  while (productOrder.includes(rightProduct)) {
    let rightProdIndex = Math.floor(Math.random() * ProductArray.allImages.length);
    rightProduct = ProductArray.allImages[rightProdIndex];
  }
  productOrder.push(rightProduct);
}

// Function to render a list of each product voted and clicked on stats
function displayVotes() {

  // Clears the current list
  results.innerHTML = ` `;
  const h3Elem = document.createElement("h3");
  h3Elem.textContent = `Results:`;
  results.appendChild(h3Elem);
  for (let prod of ProductArray.allImages) {
    const liElem = document.createElement("li");
    liElem.textContent = `${prod.name}: chosen ${prod.clicks} times, shown ${prod.timesShown} times`;
    results.appendChild(liElem);
  }
}

// Handle the click event
function handleClick(event) {
  const clickedTarget = event.target;
  const id = clickedTarget.id;
  if (totalClicks < voteAttempts) {
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

      renderProduct();
    }
  }
  if (totalClicks === voteAttempts) {
    allImages.removeEventListener('click', handleClick);
    displayVotes();

    // call chart function here
    renderChart();

    // call function to store information in image array to local storage
    storeItems();
  }
}

function renderChart() {
  // changes the instructions to different text content
  const instructions = document.getElementById("instructions");
  instructions.innerHTML = ` `;
  const h3Elem = document.createElement("h3");
  h3Elem.textContent = `Here are the results from this trial:`
  instructions.appendChild(h3Elem);

  // collects all names of all the photos and stores in an array for chart to display on X axis
  let labelData = [];
  for (let prod of ProductArray.allImages) {
    labelData.push(prod.name);
  }

  // collects all values of votes and stores in an array for chart to display on Y axis
  let voteData = [];
  for (let prod of ProductArray.allImages) {
    voteData.push(prod.clicks);
  }

  console.log(voteData, labelData);

  var ctx = document.getElementById('productChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labelData,
      datasets: [{
        label: '# of Votes',
        data: voteData,
        backgroundColor: [
          'rgba(173, 219, 127, 1)',
          'rgba(145, 70, 219, 1)',
          'rgba(118, 223, 223, 1)',
          'rgba(173, 219, 127, 1)',
          'rgba(145, 70, 219, 1)',
          'rgba(118, 223, 223, 1)',
          'rgba(173, 219, 127, 1)',
          'rgba(145, 70, 219, 1)',
          'rgba(118, 223, 223, 1)',
          'rgba(173, 219, 127, 1)',
          'rgba(145, 70, 219, 1)',
          'rgba(118, 223, 223, 1)',
          'rgba(173, 219, 127, 1)',
          'rgba(145, 70, 219, 1)',
          'rgba(118, 223, 223, 1)',
          'rgba(173, 219, 127, 1)',
          'rgba(145, 70, 219, 1)',
          'rgba(118, 223, 223, 1)',
          'rgba(173, 219, 127, 1)',
          'rgba(145, 70, 219, 1)',
          'rgba(118, 223, 223, 1)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  allImages.innerHTML = ` `;
  const chartDiv = document.getElementById("chartDiv");
  chartDiv.setAttribute(`class`, `shown`)
}

function createProducts() {
  new ProductArray(`bag`, `./images/bag.jpg`);
  new ProductArray(`banana`, `./images/banana.jpg`);
  new ProductArray(`bathroom`, `./images/bathroom.jpg`);
  new ProductArray(`boots`, `./images/boots.jpg`);
  new ProductArray(`breakfast`, `./images/breakfast.jpg`);
  new ProductArray(`bubblegum`, `./images/bubblegum.jpg`);
  new ProductArray(`chair`, `./images/chair.jpg`);
  new ProductArray(`cthulhu`, `./images/cthulhu.jpg`);
  new ProductArray(`dog duck`, `./images/dog-duck.jpg`);
  new ProductArray(`dragon`, `./images/dragon.jpg`);
  new ProductArray(`pen`, `./images/pen.jpg`);
  new ProductArray(`pet sweep`, `./images/pet-sweep.jpg`);
  new ProductArray(`scissors`, `./images/scissors.jpg`);
  new ProductArray(`shark`, `./images/shark.jpg`);
  new ProductArray(`sweep`, `./images/sweep.png`);
  new ProductArray(`tauntaun`, `./images/tauntaun.jpg`);
  new ProductArray(`unicorn`, `./images/unicorn.jpg`);
  new ProductArray(`usb`, `./images/usb.gif`);
  new ProductArray(`water can`, `./images/water-can.jpg`);
  new ProductArray(`wine glass`, `./images/wine-glass.jpg`);
}

// listener
allImages.addEventListener('click', handleClick);

searchStorage();