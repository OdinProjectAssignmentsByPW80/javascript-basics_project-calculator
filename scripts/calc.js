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

const display = (function () {
  const el = document.querySelector("#display");
  return {
    clear() {
      el.textContent = "0";
    },
    append(num) {
      if (num == "." && el.textContent.includes(".")) return;
      if (el.textContent == "0" && num != ".") el.textContent = num;
      else el.textContent += num;
    },
    backSpace() {
      if (el.textContent.length == 1) el.textContent = 0;
      else el.textContent = el.textContent.slice(0, -1);
    },
    get value() {
      return +el.textContent;
    },
  };
})();

let result = false;
let operand1 = 0;
let operand2 = 0;
let pendingOperation = "none";

function processNumInput(num) {
  if (result) {
    display.clear();
    // todo: perform operation - possibly somewhere else
  }
  result = false;
  display.append(num);
}

const performOp = {
  divide: (x, y) => (y == 0 ? 0 : x / y),
  times: (x, y) => x * y,
  minus: (x, y) => x - y,
  plus: (x, y) => x + y,
  none: () => 0,
};

function processOpInput(op) {
  if (pendingOperation != "none" || op == "equals") {
    operand2 = display.value;
    if (pendingOperation == "divide" && operand2 == 0) {
      display.clear();
      display.append("Err");
    } else {
      operand1 = performOp[pendingOperation](operand1, operand2);
      display.clear();
      display.append(operand1);
      pendingOperation = op;
    }
  } else {
    pendingOperation = op;
    operand1 = display.value;
  }
  result = true;
}

function cancel() {
  display.clear();
  result = false;
  operand1 = 0;
  operand2 = 0;
  pendingOperation = "none";
}

/*
  todo: display overflow
  todo: fix after equals
  todo: fix only last operation pressed should be used
  todo: ops should probably be an obj (like enum)
  todo: see about objectify calc like display
*/
