/*
  Pragmatic JavaScript
  Chapter 2
  Programming Assignment

  Author: John Kuronya
  Date: 4/14/25
  Filename: script.js
*/

// Create an in-memory object array for each table in the restaurant
let tables = [
  { tableNumber: 1, capacity: 4, isReserved: false },
  { tableNumber: 2, capacity: 2, isReserved: false },
  { tableNumber: 3, capacity: 6, isReserved: false },
  { tableNumber: 4, capacity: 4, isReserved: false },
  { tableNumber: 5, capacity: 2, isReserved: false }
];

// Create a function reserveTable
function reserveTable(tableNumber, callback, time) {
  const table = tables.find(t => t.tableNumber === tableNumber);
  if (!table) {
    callback(`Table ${tableNumber} does not exist.`);
    return;
  }

  if (!table.isReserved) {
    table.isReserved = true;
    setTimeout(() => {
      callback(`Table ${tableNumber} reserved successfully!`);
    }, time);
  } else {
    callback(`Table ${tableNumber} is already reserved.`);
  }
}

// When the form is submitted, call the reserveTable function

document.getElementById("reservationForm")
.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const tableNumber = parseInt(document.getElementById("tableNumber").value);
  const messageElement = document.getElementById("message");

  reserveTable(tableNumber, function (message) {
    messageElement.textContent = `${name}, ${message}`;
  }, 2000);
});
