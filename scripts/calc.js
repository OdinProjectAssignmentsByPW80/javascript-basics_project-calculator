"use strict";

/* #region  EVENT LISTENERS */

/* #region  MOUSE INPUT */
const buttons = document.querySelectorAll(".btn");

buttons.forEach((el) =>
  el.addEventListener("click", (event) => {
    if (event.target.classList.contains("num")) {
      calc.processNumInput(event.target.textContent);
    }
    if (event.target.classList.contains("op")) {
      calc.processOpInput(event.target.id);
    }
    if (event.target.id == "equals") calc.equals();
    if (event.target.id == "cancel") calc.cancel();
    if (event.target.id == "back-space") calc.backSpace();
  })
);
/* #endregion */

/* #region  KEYBOARD INPUT */
const keycodes = {
  num: [
    "Numpad0",
    "Numpad1",
    "Numpad2",
    "Numpad3",
    "Numpad4",
    "Numpad5",
    "Numpad6",
    "Numpad7",
    "Numpad8",
    "Numpad9",
    "NumpadDecimal",
  ],
  op: ["NumpadDivide", "NumpadSubtract", "NumpadMultiply", "NumpadAdd"],
};

document.addEventListener("keydown", (event) => {
  if (keycodes.num.includes(event.code)) processNumInput(event.key);
  if (keycodes.op.includes(event.code)) {
    processOpInput(event.code.slice(6).toLowerCase());
  }
  if (event.code == "NumpadEnter") equals();
  if (event.code == "Backspace") display.backSpace();
  if (event.code == "Escape") cancel();
});
/* #endregion */

/* #endregion */

const calc = (function () {
  const ops = {
    divide: (x, y) => (y == 0 ? "Err" : x / y),
    multiply: (x, y) => x * y,
    subtract: (x, y) => x - y,
    add: (x, y) => x + y,
    none: (x, y) => y,
  };
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
  let input = [];
  let index = 0;
  return {
    processNumInput(num) {
      if (input.length % 2 == 0) display.clear();
      display.append(num);
      index = input[1] ? 2 : 0;
      input[index] = display.value;
    },
    processOpInput(op) {
      index = input[2] ? 3 : 1;
      input[index] = op;
      if (input.length == 4) this.performOP();
    },
    equals() {
      if (input.length == 3) {
        this.performOP();
      } else {
        display.clear();
        input.splice(1);
        if (input[0]) this.processNumInput(input[0]);
        else this.processNumInput(0);
      }
    },
    cancel() {
      input = [];
      index = 0;
      display.clear();
    },
    backSpace() {
      display.backSpace();
    },
    performOP() {
      let result = ops[input[1]](input[0], input[2]);
      if (String(result).length > 11) result = result.toPrecision(8);
      const pending = input[3] ? input[3] : "none";
      display.clear();
      display.append(result);
      input = [];
      input[0] = result == "Err" ? 0 : result;
      input[1] = pending;
    },
  };
})();

/*
  todo: stop overlong input
  todo: fix: x divide 0 then op2 instead of equals does not crash but ignores 0
  todo: and performs op2 on x and next number input.
*/
