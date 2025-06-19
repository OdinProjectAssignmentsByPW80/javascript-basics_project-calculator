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
    if (event.target.id == "back-space") display.backSpace();
  })
);

const display = {
  el: document.querySelector("#display"),
  clear() {
    this.el.textContent = "0";
  },
  append(num) {
    if (this.el.textContent == "0") this.el.textContent = num;
    else this.el.textContent += num;
  },
  backSpace() {
    if (this.el.textContent.length == 1) this.el.textContent = 0;
    else this.el.textContent = this.el.textContent.slice(0, -1);
  },
};

let result = false;

function processNumInput(num) {
  if (result) {
    display.clear();
    // todo: perform operation - possibly somewhere else
    result = false;
  }
  display.append(num);
}

function processOpInput(op) {
  result = true;
  console.log("Operation pressed:", op);
}

function cancel() {
  display.clear();
  result = false;
  // todo: reset any other variables that are created
}
