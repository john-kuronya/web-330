"use strict";
/*  JavaScript 7th Edition
    Chapter 10
    Chapter case

    Oak Top House
    Author: John Kuronya
    Date: 4/7/25

    Filename: js10a.js
*/

window.addEventListener("load", setupRoom);

// perform setup tasks when page first loads
function setupRoom() {
  let startingX, startingY, tableX, tableY;

   // Page objects
   let room = document.getElementById("room");
   // banquet hall
   let storageTables = document.querySelectorAll("#storage > div.table"); // Tables in the storage room
   let zIndexCounter = 0; // Count the highest z-Index value

   // Function to calculate available seats in the room layout
   function countSeats() {
      let guests = 0;
      let seatCount = document.getElementById("seatCount");
      let tablesToCount = document.querySelectorAll("#room > div.table");
      for (let  items of tablesToCount) {
         guests += parseInt(items.textContent);
      }
      seatCount.textContent = guests;
    }

     // Add tables from the storage to the banquet hall
     for (let items of storageTables) {
         items.onclick = function() {
            let storageCopy = items.cloneNode(true);
            room.appendChild(storageCopy);

            // Increase Z-Index value of new table
            zIndexCounter++;
            storageCopy.style.zIndex = zIndexCounter;

            countSeats();

            // Grab the table in response to the pointerdown event
            storageCopy.addEventListener("pointerdown", grabTable);
      }

      // Grab a table from the banquet hall to begin drag and drop
      function grabTable(e) {

         if (e.shiftKey) {
            // Remove the table from the remove is using shiftClick
            e.target.parentElement.removeChild(e.target);
            countSeats();
         } else {

         startingX = e.clientX;
         startingY = e.clientY;
         e.target.style.touchAction = "none"; // Disable the default action for touch
         zIndexCounter++;
         e.target.style.zIndex = zIndexCounter;

         tableX = e.target.offsetLeft;
         tableY = e.target.offsetTop;

         e.target.addEventListener("pointermove", moveTable);
         e.target.addEventListener("pointerup", dropTable); // Working with DB's, typing out drop table makes my heart skip a beat
         }
      }

      // Move the table with the pointer
      function moveTable(e) {
         let currentX = e.clientX;
         let currentY = e.clientY;
         let deltaX = currentX - startingX;
         let deltaY = currentY - startingY;

         // Calculate the new table position
         e.target.style.left = tableX + deltaX + "px";
         e.target.style.top = tableY + deltaY + "px";
      }

      // Drop the table onto the banquet hall
      function dropTable(e) {
         e.target.removeEventListener("pointermove", moveTable);
         e.target.removeEventListener("pointerup", dropTable);
      }

    }
}