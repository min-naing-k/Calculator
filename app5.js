const numberBtns = document.querySelectorAll(".number");
const operatorBtns = document.querySelectorAll(".sign");
const upperText = document.querySelector("#upper-text");
const downText = document.querySelector("#down-text");
const clearBtn = document.querySelector(".clear");
const deleteBtn = document.querySelector(".delete");
const equalBtn = document.querySelector(".equal");

let previousOperand = "";
let currentOperand = "";
let operand = "";
let result = "";
let numberHistory = "";
let signHistory = "";
let startOver = false;

function appendNumber(number) {
   if (startOver) {
      previousOperand = "";
      displayDown(currentOperand);
      displayUp(previousOperand, "");
      startOver = false;
   }

   // if user already click the dot, stop clicking the dot again
   if (number === "." && currentOperand.includes(".")) {
      return;
   }

   if (number === "." && currentOperand === "") {
      currentOperand = `0${number}`;
      displayDown(currentOperand);
      return;
   }

   if (number === "0" && currentOperand === "") {
      return;
   }

   currentOperand += number;

   numberHistory = currentOperand;

   displayDown(currentOperand);
}

function chooseOperation(operation) {
   startOver = false;
   if (currentOperand === "") {
      previousOperand = signHistory === "" ? "0" : signHistory;
      displayUp(previousOperand, operation);
      operand = operation;
      return;
   }

   if (previousOperand !== "") {
      compute();
   }

   operand = operation;
   previousOperand = currentOperand;
   displayDown(previousOperand);
   signHistory = downText.innerText;
   displayUp(signHistory, operand);
   currentOperand = "";
}

function compute() {
   num1 = parseFloat(previousOperand);
   num2 = parseFloat(currentOperand);
   if (isNaN(num1) || isNaN(num2)) return;
   switch (operand) {
      case "+":
         result = num1 + num2;
         break;
      case "-":
         result = num1 - num2;
         break;
      case "*":
         result = num1 * num2;
         break;
      case "/":
         result = num1 / num2;
         break;
      case "%":
         result = num1 % num2;
         break;
      default:
         break;
   }

   currentOperand = result;
   previousOperand = "";
   operand = undefined;
}

function getDisplayNumber(number) {
   // 0.
   const stringNum = number.toString();
   const intNumber = parseFloat(stringNum.split(".")[0]);
   const decimalNumber = stringNum.split(".")[1];
   let displayNumber;
   if (isNaN(intNumber)) {
      displayNumber = "";
   } else {
      displayNumber = intNumber.toLocaleString("en", {
         maximumFractionDigits: 0,
      });
   }

   if (decimalNumber != null) {
      return `${displayNumber}.${decimalNumber}`;
   } else {
      return displayNumber;
   }
}

function displayDown(showData) {
   downText.innerText =
      getDisplayNumber(showData) === "" ? "0" : getDisplayNumber(showData);
}

function displayUp(number1, sign) {
   upperText.innerText = `${number1}${sign}`;
}

numberBtns.forEach((numberBtn) => {
   numberBtn.addEventListener("click", (e) => {
      appendNumber(e.target.value);
   });
});

operatorBtns.forEach((operatorBtn) => {
   operatorBtn.addEventListener("click", () => {
      chooseOperation(operatorBtn.value);
   });
});

equalBtn.addEventListener("click", () => {
   if (currentOperand === "" || previousOperand === "") return;

   if (upperText.innerText.includes("=")) {
      return;
   }

   let num1 = parseFloat(previousOperand);
   let num2 = parseFloat(currentOperand);
   switch (operand) {
      case "+":
         result = num1 + num2;
         break;
      case "-":
         result = num1 - num2;
         break;
      case "*":
         result = num1 * num2;
         break;
      case "/":
         result = num1 / num2;
         break;
      case "%":
         result = num1 % num2;
         break;
      default:
         break;
   }

   upperText.innerText = `${previousOperand} ${operand} ${currentOperand} =`;
   displayDown(result);
   signHistory = downText.innerText;
   startOver = true;
   // numberHistory = parseFloat(upperText.innerText.split(" ")[2]);
   currentOperand = "";
});

clearBtn.addEventListener("click", () => {
   previousOperand = "";
   currentOperand = "";
   numberHistory = "";
   signHistory = "";
   downText.innerText = "0";
   upperText.innerText = "";
});

deleteBtn.addEventListener("click", () => {
   if (currentOperand !== "") {
      currentOperand = currentOperand.toString().slice(0, -1);
      displayDown(currentOperand);
   }
});
