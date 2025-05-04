/*
  Pragmatic JavaScript
  Chapter 3
  Programming Assignment

  Author: John Kuronya
  Date: 4-28-25
  Filename: script.js
*/

"use strict";

// Define an array of chef objects
let chefs = [
  {
    name: "Gordon Ramsay",
    specialty: "British cuisine",
    weakness: "Short temper",
    restaurantLocation: "London, UK"
  },
  {
    name: "Masaharu Morimoto",
    specialty: "Japanese fusion",
    weakness: "Overcommitting",
    restaurantLocation: "New York, USA"
  },
  {
    name: "Dominique Crenn",
    specialty: "French fine dining",
    weakness: "Perfectionism",
    restaurantLocation: "San Francisco, USA"
  }
];

// Reusable function to display chef data
function displayChefData(index, chef) {
  const container = document.getElementById(`chef${index + 1}`);
  container.innerHTML = `
    <h2>${chef.name}</h2>
    <p><strong>Specialty:</strong> ${chef.specialty}</p>
    <p><strong>Weakness:</strong> ${chef.weakness}</p>
    <p><strong>Restaurant Location:</strong> ${chef.restaurantLocation}</p>
  `;
}

// Reusable function to display error and retry button
function displayError(index, message, retryFunction) {
  const container = document.getElementById(`chef${index + 1}`);
  container.innerHTML = `
    <p style="color: red;">${message}</p>
    <button onclick="retryChef(${index})">Retry</button>
  `;
}

// Retrieve functions for each chef with simulated delay and random failure
function retrieveChef(index) {
  return new Promise((resolve, reject) => {
    const delay = 2000 + index * 1000;
    setTimeout(() => {
      // Simulate random rejection
      if (Math.random() < 0.3) {
        reject(`Failed to load Chef ${index + 1}'s data.`);
      } else {
        resolve(chefs[index]);
      }
    }, delay);
  });
}

// Retry handler
function retryChef(index) {
  retrieveChef(index)
    .then(chef => displayChefData(index, chef))
    .catch(err => displayError(index, err, () => retryChef(index)));
}

// Load all chef data using Promise.allSettled
function loadChefs() {
  const promises = [0, 1, 2].map(index => retrieveChef(index));
  Promise.allSettled(promises).then(results => {
    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        displayChefData(index, result.value);
      } else {
        displayError(index, result.reason, () => retryChef(index));
      }
    });
  });
}

// Start loading
loadChefs();
