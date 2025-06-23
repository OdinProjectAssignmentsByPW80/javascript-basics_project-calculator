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

/**
 * `calc` is an immediately invoked function expression (IIFE) that encapsulates
 * the functionality of a calculator. It manages arithmetic operations,
 * display interactions, and the overall logic for processing user input.
 *
 * @namespace calc
 */
const calc = (function () {
  /**
   * Defines the arithmetic operations supported by the calculator.
   * Each key is an operation name, and its value is a function that
   * takes two numbers and returns the result of the operation.
   *
   * @private
   * @type {object}
   * @property {function(number, number): (number|string)} divide - Divides two
   * numbers. Returns "Err" if the divisor is 0.
   * @property {function(number, number): number} multiply - Multiplies two
   * numbers.
   * @property {function(number, number): number} subtract - Subtracts the
   * second number from the first.
   * @property {function(number, number): number} add - Adds two numbers.
   * @property {function(number, number): number} none - If there is no
   * operation returns the second operand.
   */
  const ops = {
    divide: (x, y) => (y == 0 ? "Err" : x / y),
    multiply: (x, y) => x * y,
    subtract: (x, y) => x - y,
    add: (x, y) => x + y,
    none: (x, y) => y,
  };

  /**
   * `display` is an IIFE that manages interactions with the calculator's
   * display element.
   * It provides methods to clear, append, backspace, and retrieve the current
   * value shown on the display.
   *
   * @private
   * @namespace display
   */
  const display = (function () {
    /**
     * The DOM element representing the calculator's display.
     * @private
     * @type {HTMLElement}
     */
    const el = document.querySelector("#display");

    return {
      /**
       * Clears the display and sets its text content to "0".
       * @memberof display
       */
      clear() {
        el.textContent = "0";
      },
      /**
       * Appends a number or a decimal point to the current display content.
       * Prevents multiple decimal points and handles initial "0" appropriately.
       *
       * @memberof display
       * @param {string|number} num - The number or decimal point to append.
       */
      append(num) {
        if (num == "." && el.textContent.includes(".")) return;
        if (el.textContent == "0" && num != ".") el.textContent = num;
        else el.textContent += num;
      },
      /**
       * Removes the last character from the display. If only one character
       * remains, it sets the display to "0".
       * @memberof display
       */
      backSpace() {
        if (el.textContent.length == 1) el.textContent = 0;
        else el.textContent = el.textContent.slice(0, -1);
      },
      /**
       * Gets the current numeric value displayed on the calculator.
       * The value is converted to a number using the unary plus operator.
       *
       * @memberof display
       * @type {number}
       */
      get value() {
        return +el.textContent;
      },
    };
  })();

  /**
   * Stores the current state of the calculator input.
   * This array typically holds numbers and an operation in the format:
   * `[operand1, operator, operand2, pendingOperator]`
   *
   * @private
   * @type {Array<number|string>}
   */
  let input = [];

  /**
   * Tracks the current index for inserting values into the `input` array.
   * @private
   * @type {number}
   */
  let index = 0;

  return {
    /**
     * Processes numerical input from the user.
     * Updates the display and stores the number in the `input` array.
     *
     * @memberof calc
     * @param {string|number} num - The numerical value entered by the user.
     */
    processNumInput(num) {
      if (input.length % 2 == 0) display.clear();
      display.append(num);
      index = input[1] ? 2 : 0;
      input[index] = display.value;
    },
    /**
     * Processes operation input from the user.
     * Stores the operator in the `input` array and triggers a calculation
     * if there are enough operands and a previous operation.
     *
     * @memberof calc
     * @param {string} op - The operation string (e.g., "add", "subtract").
     */
    processOpInput(op) {
      index = input[2] ? 3 : 1;
      input[index] = op;
      if (input.length == 4) this.performOP();
    },
    /**
     * Executes the pending calculation when the "equals" button is pressed.
     * If there's an active operation (length is 3), it performs the operation.
     * Otherwise, it clears the display and resets the input to the last result
     * or 0.
     *
     * @memberof calc
     */
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
    /**
     * Resets the calculator to its initial state, clearing all input and the
     * display.
     * @memberof calc
     */
    cancel() {
      input = [];
      index = 0;
      display.clear();
    },
    /**
     * Delegates the backspace action to the display module.
     * Removes the last character from the calculator's display.
     *
     * @memberof calc
     */
    backSpace() {
      display.backSpace();
    },
    /**
     * Performs the arithmetic operation stored in the `input` array.
     * It calculates the result, updates the display, and prepares for the next
     * operation.
     * Handles division by zero and large number precision.
     *
     * @memberof calc
     */
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
