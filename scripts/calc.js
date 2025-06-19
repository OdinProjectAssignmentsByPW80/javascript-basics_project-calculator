"use strict";

const buttons = document.querySelectorAll(".btn");
const display = document.querySelector("#display");

buttons.forEach((el) =>
  el.addEventListener("click", (event) => {
    if (event.target.classList.contains("num")) {
      processNumInput(event.target.textContent);
    }
    if (event.target.classList.contains("op")) {
      processOpInput(event.target.id);
    }
    if (event.target.id == "cancel") cancel();
    if (event.target.id == "back-space") backSpace();
  })
);

let result = false;

function processNumInput(num) {
  if (result) {
    clearDisplay();
    // other things
    result = false;
  }
  appendDisplay(num);
}

function clearDisplay() {
  display.textContent = "0";
}

function appendDisplay(num) {
  if (display.textContent == "0") display.textContent = num;
  else display.textContent += num;
}

function processOpInput(op) {
  result = true;
  console.log("Operation pressed:", op);
}

function cancel() {
  clearDisplay();
  result = false;
}

function backSpace() {
  console.log("Backspace pressed");
}

// clear display
// append display
