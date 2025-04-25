"use strict";
/*
   JavaScript 7th Edition
   Chapter 11
   Chapter Case

   Author: John Kuronya
   Date: 4/21/25

   Filename: js11.js


*/

window.addEventListener("load", init);

function init() {
   // Page Objects
   let stories = document.getElementById("stories");
   let news = document.getElementById("news");
   let sInput = document.getElementById("sInput");
   let sButton = document.getElementById("sButton");
   let suggestBox = document.getElementById("suggestBox");

// Create a request object
const xhr = new XMLHttpRequest();

// Handle the changing request state
xhr.onreadystatechange = function() {
   if (xhr.readyState === 4) {

      if (xhr.status >= 200 && xhr.status < 300) {
         // Manage the response
         stories.innerHTML = xhr.responseText;

      } else {
         console.log("Request failed: " + xhr.statusText);
      }

   }
}

// Open the request and send it
xhr.open("get", "commentary.html");
xhr.send(null);

// Retrieve archived articles from the web server
sButton.onclick = () => {
   fetch("archives.pl?skey=" + encodeURIComponent(sInput.value))
   .then (response => {
      if (response.ok) {
         return response.text();
      } else {
         return "Unable to retrieve commentary";
      }
   })
   .then(comtext => stories.innerHTML = comtext )
   .then (() => {
      let topic = sInput.value.toLowerCase();
      getGIF(topic);
   })
   .catch ( stories.innerHTML = "Network Failure");
}

// Fetch current headlines from the web server
fetch("headlines.xml")
.then (response => response.text())
.then (str => new DOMParser().parseFromString(str, "text/xml"))

// Write the XML content to HTML
.then (dom => {
   let items = dom.querySelectorAll("item");
   // Loop through each story item
   for (let story of items) {
      // Write the story content and append it to the page
      let headline = story.children[0].textContent;
      let link = story.children[1].textContent;
      let summary = story.children[2].textContent;
      let htmlCode = `<article><h2><a href="${link}">${headline}</a></h2>
                      <p>${summary}</p></article>`;
      news.insertAdjacentHTML("beforeend", htmlCode);
   }
 });

// Suggest keywords as text is entered in the search box
sInput.onkeyup = () => {
   if (sInput.vaue === "") {
      suggestBox.style.display = "none";
   } else {
      // Retrieve a list of matching keywords
      fetch("keywords.pl?suggest=" + encodeURIComponent(sInput.value))
      .then (response => response.json())
      // Build the suggestion box
      .then(keywords => {
         suggestBox.innerHTML = "";
         if (keywords.matches.length === 0) {
            // No suggestions to display
            suggestBox.style.display = "none";
         } else {
            // Display suggestions
            suggestBox.style.display = "block";
            // Create a list of suggestions
            for (let word of keywords.matches) {
               let suggestion = document.createElement("div");
               suggestion.textContent = word;
               suggestBox.appendChild(suggestion);

               // Add suggestion to search box when clicked
               suggestion.onclick = () => {
                  sInput.value = word;
                  suggestBox.style.display = "none";
                  sButton.click();
               }
            }
         }
      })
   }
}
}

// Fetch a GIF for a given topic from Giphy.com
function getGIF(topic) {
const url = "https://api.giphy.com/v1/gifs/random";
const key = "Gt2wVVyJlRqRyPrsj2jUdBuZxJNcgpQ4";
fetch(`${url}?api_key=${key}&tag=${topic}&limit=1&rating=pg`)
.then(response => response.json())
.then(obj => {
   let newImg = document.createElement("img");
   newImg.src = obj.data.images.fixed_height.url;
   stories.appendChild(newImg)
})

}