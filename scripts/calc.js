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
    if (event.target.id == "equals") equals();
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

const Ops = {
  divide: (x, y) => (y == 0 ? "Err" : x / y),
  times: (x, y) => x * y,
  minus: (x, y) => x - y,
  plus: (x, y) => x + y,
  none: (x, y) => y,
};

function performOP() {
  let result = Ops[input[1]](input[0], input[2]);
  if (String(result).length > 11) result = result.toPrecision(8);
  const pending = input[3] ? input[3] : "none";
  display.clear();
  display.append(result);
  input = [];
  input[0] = result == "Err" ? 0 : result;
  input[1] = pending;
}

let input = [];
let index = 0;

function processNumInput(num) {
  if (input.length % 2 == 0) display.clear();
  display.append(num);
  index = input[1] ? 2 : 0;
  input[index] = display.value;
}

function processOpInput(op) {
  index = input[2] ? 3 : 1;
  input[index] = op;
  if (input.length == 4) performOP();
}

function equals() {
  if (input.length == 3) {
    performOP();
  } else {
    display.clear();
    input.splice(1);
    if (input[0]) processNumInput(input[0]);
    else processNumInput(0);
  }
}

function cancel() {
  input = [];
  index = 0;
  display.clear();
}

/*
  todo: stop overlong input
  todo: bonus - keyboard support
*/

document.addEventListener("keydown", (event) => {
  console.log(event.key, event.code);
  switch (event.code) {
    case "Numpad1":
      processNumInput(1);
      break;
  }
});
