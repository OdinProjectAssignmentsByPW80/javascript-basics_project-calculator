"use strict";

const buttons = document.querySelectorAll(".btn");

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

function processNumInput(num) {
  console.log("Number pressed:", num);
}

function processOpInput(op) {
  console.log("Operation pressed:", op);
}

function cancel() {
  console.log("Cancel pressed");
}

function backSpace() {
  console.log("Backspace pressed");
}
