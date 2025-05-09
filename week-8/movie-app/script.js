/*
  Pragmatic JavaScript
  Chapter 4
  Programming Assignment

  Author: John Kuronya
  Date: 5/5/25
  Filename: script.js
*/

"use strict";

const movies = [
  {
    title: "Inception",
    director: "Christopher Nolan",
    year: 2010,
    synopsis: "A thief who steals corporate secrets through the use of dream-sharing technology is given a chance to erase his past crimes by planting an idea into the mind of a CEO."
  },
  {
    title: "The Matrix",
    director: "The Wachowskis",
    year: 1999,
    synopsis: "A hacker discovers the reality he lives in is a simulated world controlled by machines, and joins a rebellion to free humanity."
  },
  {
    title: "Interstellar",
    director: "Christopher Nolan",
    year: 2014,
    synopsis: "A team of explorers travels through a wormhole in space in an attempt to ensure humanity's survival."
  }
];

function fetchMovie(title) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const movie = movies.find(m => m.title.toLowerCase() === title.toLowerCase());
      if (movie) {
        resolve(movie);
      } else {
        reject("Movie not found. Please try a different title.");
      }
    }, 1500);
  });
}

document.getElementById("movie-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const titleInput = document.getElementById("title-input").value.trim();
  const errorMessage = document.getElementById("error-message");
  const titleElem = document.getElementById("movie-title");
  const directorElem = document.getElementById("movie-director");
  const yearElem = document.getElementById("movie-year");
  const synopsisElem = document.getElementById("movie-synopsis");

  // Clear previous output
  errorMessage.textContent = "";
  titleElem.textContent = "";
  directorElem.textContent = "";
  yearElem.textContent = "";
  synopsisElem.textContent = "";

  try {
    const movie = await fetchMovie(titleInput);
    titleElem.textContent = `Title: ${movie.title}`;
    directorElem.textContent = `Director: ${movie.director}`;
    yearElem.textContent = `Release Year: ${movie.year}`;
    synopsisElem.textContent = `Synopsis: ${movie.synopsis}`;
  } catch (error) {
    errorMessage.textContent = error;
  }
});
