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
- > Your calculator should not evaluate more than a single pair of numbers at a time. Example: you enter a number (`12`), followed by an operator button (`+`), a second number button (`7`), and a second operator button (`-`). Your calculator should then do the following: first, evaluate the initial pair of numbers (`12 + 7`), then display the result of that calculation (`19`). Finally, use that result (`19`) as the first number in a new calculation, along with the next operator (`-`). An example of the behaviour we’re looking for can be seen in this <span id="example-link">[student’s calculator live preview](https://g-o-t-w.github.io/calculator-app/)</span>.

### Extra Credit

> 1. Add a . button and let users input decimals! Make sure you don’t let them type more than one though, like:
> 12.3.56.5. Disable the . button if there’s already a decimal separator in the display.
> 2. Add a “backspace” button, so the user can undo their last input if they click the wrong number.
> 3. Add keyboard support!

## Result

Check out the live interactive demo [here &rArr;](https://odinprojectassignmentsbypw80.github.io/javascript-basics_project-calculator/)

## Review

Although the project meets the brief there are still a few outstanding issues:
1. It is possible for the user to overflow the display by entering more than 11 digits;
2. The delete button allows the user to modify answers as well as their input;
3. When evaluating sequential operations (without using the equals button) dividing by zero does not generate an error message. Instead, the zero is ignored and the next operation is performed between the initial number and the subsequent number.

The second issue is present in the linked exemplar ([above](#example-link)). Additionally, this example appends input digits to answers after the equals button has been pressed.

This is not a judgment on another student's project but rather a probable indicator for the level of expected outcomes.

As usual I attempted the problem on my own, rather than allowing myself to be walked through the steps. I implemented my solution as a pair of nested IFEE functions returning objects that contained their own functions as a personal challenge to test my understanding and application of the higher tier concepts at this stage of the program; and to create a level of safety for the variables I created. I must assume this would be easier using JavaScript classes which have not yet been covered.

Also, as usual, my planning and design phase was found somewhat lacking in practice. I can only commit to the process and continue to refine my skills; however, as much as I chafe against it, even my somewhat mediocre planning was of huge benefit after my second revision.
