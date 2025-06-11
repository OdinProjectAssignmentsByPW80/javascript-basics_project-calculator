# Project: Calculator

A project to build a basic calculator gui that works in the browser.

Completed as part of the **JavaScript Basics** section of the **Foundation Course** at
[TheOdinProject](https://www.theodinproject.com).

---

## Assignment

Full details [available here &rArr;](https://www.theodinproject.com/lessons/foundations-calculator).

Key functionality from the text:

- numeric input
- numeric display
- operations:
  - add
  - subtract
  - multiply
  - divide
  - equals
  - clear
- round answers with long decimals so that they don’t overflow the display
- handle divide by zero errors
- consecutive operator presses should not run operations, only the last operation pressed should be used for the next operation
- clear should wipe existing data not just clear display
- > When a result is displayed, pressing a new digit should clear the result and start a new calculation instead of appending the digit to the existing result
- > Your calculator should not evaluate more than a single pair of numbers at a time. Example: you enter a number (`12`), followed by an operator button (`+`), a second number button (`7`), and a second operator button (`-`). Your calculator should then do the following: first, evaluate the initial pair of numbers (`12 + 7`), then display the result of that calculation (`19`). Finally, use that result (`19`) as the first number in a new calculation, along with the next operator (`-`). An example of the behaviour we’re looking for can be seen in this [student’s calculator live preview](https://g-o-t-w.github.io/calculator-app/).

### Extra Credit

> 1. Add a . button and let users input decimals! Make sure you don’t let them type more than one though, like:
> 12.3.56.5. Disable the . button if there’s already a decimal separator in the display.
> 2. Add a “backspace” button, so the user can undo their last input if they click the wrong number.
> 3. Add keyboard support!

## Result

*coming soon*
<!-- Check out the live interactive demo [here &rArr;](https://odinprojectassignmentsbypw80.github.io/javascript-basics_project-etch-a-sketch/)

>[!NOTE]
> The page does not work properly in Mozilla FireFox (at least not version 139.01 (64-bit), which was up to date at time
> of writing); although everything seems fine on Google Chrome. This is also respectively true for LibreWolf (using
> Mozilla's Gecko engine) and Edge (using Google's Blink Engine).
>
> As best as I can tell it is something to do with the way the height and width of the .pixel divs are being calculated.
> They report correctly in the console and inspector rules, but they are wrong on screen and in the layout information.
>
> I will bare this in mind for the future. But, I am not prepared to do a workaround at this point.

## Review

Once again fell foul to improper planning, although some aspects were down to a lack of understanding on my part.

I'm not sure why, but I thought one could edit css directly with JavaScript. In retrospect this is obviously not the
case - JavaScript interacts with the DOM not the css. It can add classes and styles to elements in the DOM, but this
does not modify the css directly.

The code feels, for want of a better word, 'janky'. The `html` and `css` I let slide as I focused on JavaScript. This is
going to be a problem for me going forward. I find it difficult to properly focus on all 3 elements one at a time;
instead either emphasising one to the detriment of the other two or simultaneously editing all three in a somewhat
chaotic manner.

I should also probably go back to have another look at the different types of functions; focusing on the benefits and
limitations for each. -->
