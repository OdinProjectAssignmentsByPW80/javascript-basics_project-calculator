/**
 * @file color_mode.js
 * @author Paul Williams <advanced_solution_delivery@outlook.com>
 * @version 0.12.03
 * @date 2025-06-16
 * @summary Handles switching between light and dark mode display. Updates to
 * user preference on page load and on preference change; and, allows user to
 * manually switch on click.
 */

/**
 * @typedef {Object} Modes
 * @property {string} light - Represents the light mode.
 * @property {string} dark - Represents the dark mode.
 */

/**
 * An object containing constants for light and dark modes.
 * @type {Modes}
 */
const modes = {
  light: "light_mode",
  dark: "dark_mode",
};

/**
 * Represents the DOM element for the mode toggle switch.
 * @type {HTMLElement}
 */
const toggle = document.querySelector("#mode-toggle");

/**
 * Manages the current color scheme state.
 *
 * This is an immediately invoked function expression (IIFE) that creates a closure
 * to manage the 'mode' state, allowing for inversion and retrieval of the current
 * and next color scheme.
 *
 * @returns {object} An object with methods to interact with the color scheme
 * state.
 * @property {function(): void} invertMode - Toggles the current mode between
 * dark and light.
 * @property {function(): string} currentMode - Returns the current color scheme
 * mode.
 * @property {function(): string} nextMode - Inverts the mode and then returns
 * the new mode.
 */
const currentColorScheme = (function () {
  /**
   * The private variable holding the current color scheme mode.
   * Initializes to `modes.dark` by default.
   * @private
   * @type {string}
   */
  let mode = modes.dark;
  return {
    /**
     * Inverts the current color scheme mode. If the mode is currently dark, it
     * becomes light, and vice-versa.
     * @returns {void}
     */
    invertMode() {
      mode = mode == modes.dark ? modes.light : modes.dark;
    },
    /**
     * Returns the current color scheme mode.
     * @returns {string} The current mode, either `modes.dark` or `modes.light`.
     */
    currentMode() {
      return mode;
    },
    /**
     * Inverts the color scheme mode and then returns the newly set mode.
     * @returns {string} The mode after inversion, either `modes.dark` or
     * `modes.light`.
     */
    nextMode() {
      this.invertMode();
      return mode;
    },
  };
})();

/**
 * Adds an event listener to the toggle element.
 * When the toggle is clicked, it updates the color scheme to the next mode.
 *
 * @param {Event} event - The click event object.
 */
toggle.addEventListener("click", () => {
  setColorScheme(currentColorScheme.nextMode());
});

/**
 * Determines the preferred color scheme based on the user's system settings.
 *
 * This function checks if the `window` and `window.matchMedia` APIs are
 * available, then queries the system for its preferred color scheme.
 *
 * @returns {string} - Returns `modes.dark` if the system prefers a dark color
 * scheme, otherwise returns `modes.light`.
 */
const prefersDark = function () {
  return window &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
    ? modes.dark
    : modes.light;
};

/**
 * Attaches an event listener to the `DOMContentLoaded` event.
 *
 * When the DOM is fully loaded, it calls `updateCurrentScheme()`
 * with the user's preferred dark/light mode setting.
 */
document.addEventListener("DOMContentLoaded", () => {
  updateCurrentScheme(prefersDark());
});

/**
 * Adds an event listener to the `prefers-color-scheme` media query.
 *
 * When the user's system color scheme preference changes (e.g., from light
 * to dark or vice-versa), this listener triggers an update of the
 * current scheme based on the new preference.
 */
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", () => {
    updateCurrentScheme(prefersDark());
  });

/**
 * Updates the current color scheme based on a preference.
 *
 * If the provided preference (`pref`) differs from the `currentColorScheme`'s
 * current mode, it inverts the `currentColorScheme`'s mode.
 * Finally, it sets the color scheme to the preferred value.
 *
 * @param {string} pref - The preferred color scheme mode (e.g., `modes.dark` or
 * `modes.light`).
 */
function updateCurrentScheme(pref) {
  if (pref != currentColorScheme.currentMode()) currentColorScheme.invertMode();
  setColorScheme(pref);
}

/**
 * Sets the color scheme for the document.
 *
 * This function updates the classes of relevant elements to reflect the
 * new color scheme and also updates the text content of the mode toggle
 * span to indicate the current scheme.
 *
 * @param {string} scheme - The desired color scheme, typically 'dark_mode'
 * or 'light_mode'.
 */
function setColorScheme(scheme) {
  // Determine which classes to remove and add based on the scheme.
  let [remove, add] =
    scheme == "dark_mode" ? ["light", "dark"] : ["dark", "light"];

  // Select all elements that currently have the 'remove' class.
  const elements = document.querySelectorAll("." + remove);

  // Iterate through the elements and toggle their classes.
  for (let e of elements) {
    e.classList.remove(remove);
    e.classList.add(add);
  }

  // Update the text content of the mode toggle to show the new scheme - the
  // name of the material icon to display
  document.querySelector("#mode-toggle span").textContent = scheme;
}
