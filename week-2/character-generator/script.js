/*
  Pragmatic JavaScript
  Chapter 1
  Programming Assignment

  Author: John Kuronya
  Date: 3/24/25
  Filename: script.js
*/

"use strict";

document.addEventListener("DOMContentLoaded", function () {
  function createCharacter(name, gender, characterClass) {
      return {
          getName: () => name,
          getGender: () => gender,
          getClass: () => characterClass
      };
  }

  document.getElementById("generateHero").addEventListener("click", function (e) {
      e.preventDefault(); // Prevent page reload

      // Get form values
      const nameInput = document.getElementById("heroName");
      const genderInput = document.getElementById("heroGender");
      const classInput = document.getElementById("heroClass");

      // Ensure elements exist
      if (!nameInput || !genderInput || !classInput) {
          console.error("Form elements not found.");
          return;
      }

      const charName = nameInput.value.trim();
      const charGender = genderInput.value;
      const charClass = classInput.value;

      // Ensure values are provided
      if (!charName || !charGender || !charClass) {
          alert("Please fill out all fields.");
          return;
      }

      // Create character
      const character = createCharacter(charName, charGender, charClass);

      // Display character information
      document.getElementById("characterOutput").innerHTML = `
          <p><strong>Name:</strong> ${character.getName()}</p>
          <p><strong>Gender:</strong> ${character.getGender()}</p>
          <p><strong>Class:</strong> ${character.getClass()}</p>
      `;
  });
});


