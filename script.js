const num_buttons = document.querySelectorAll(".numbers");
const first = document.querySelector(".first");
const second = document.querySelector(".second");
const three = document.querySelector(".three");
const four = document.querySelector(".four");
const five = document.querySelector(".five");
const six = document.querySelector(".six");
const seven = document.querySelector(".seven");
const eight = document.querySelector(".eight");
const nine = document.querySelector(".nine");
const zero = document.querySelector(".zero");
const clear = document.querySelector(".clear");
const calcInput = document.querySelector(".calcInput");
const plus = document.querySelector(".plus");
const minus = document.querySelector(".minus");
const multi = document.querySelector(".multi");
const divi = document.querySelector(".divi");
const equal = document.querySelector(".equal");
first.addEventListener("click", () => {
  calciInput(1);
});
second.addEventListener("click", () => {
  calciInput(2);
});
three.addEventListener("click", () => {
  calciInput(3);
});
four.addEventListener("click", () => {
  calciInput(4);
});
five.addEventListener("click", () => {
  calciInput(5);
});
six.addEventListener("click", () => {
  calciInput(6);
});
seven.addEventListener("click", () => {
  calciInput(7);
});
eight.addEventListener("click", () => {
  calciInput(8);
});
nine.addEventListener("click", () => {
  calciInput(9);
});
zero.addEventListener("click", () => {
  calciInput(0);
});
plus.addEventListener("click", () => {
  calciInput("+");
});
minus.addEventListener("click", () => {
  calciInput("-");
});
multi.addEventListener("click", () => {
  calciInput("*");
});
divi.addEventListener("click", () => {
  calciInput("/");
});
const expression = [];
let full_expression;
function calciInput(input) {
  expression.push(input);
  full_expression = calcInput.placeholder = expression.join("");
}
clear.addEventListener("click", () => {
  expression.length = 0; 
  full_expression = ""; 
  calcInput.value = "";
  calcInput.placeholder = "Enter numbers and operations"; 
});

equal.addEventListener("click", () => {
  const parsedExpression = full_expression.match(/\d+|[\+\-\*\/]/g);
  if (!parsedExpression) {
    console.log("Invalid expression");
    return;
  }
   calcInput.placeholder = evaluateExpression(parsedExpression);
  
});
function evaluateExpression(expressionArray) {
  let numbers = [];
  let operators = [];

  // Operator precedence
  const precedence = { "+": 1, "-": 1, "*": 2, "/": 2 };

  // Function to apply an operation
  function applyOperation() {
    let b = numbers.pop();
    let a = numbers.pop();
    let operator = operators.pop();
    let func = new Function("a", "b", `return a ${operator} b;`);
    numbers.push(func(a, b));
  }
  for (let item of expressionArray) {
    if (["+", "-", "*", "/"].includes(item)) {
      
      while (
        operators.length > 0 &&
        precedence[operators[operators.length - 1]] >= precedence[item]
      ) {
        applyOperation();
      }
      operators.push(item);
    } else {
      numbers.push(Number(item)); 
    }
  }
  // Apply remaining operations
  while (operators.length > 0) {
    applyOperation();
  }
  return numbers[0];
}


