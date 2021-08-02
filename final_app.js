class Calculator {
   currentOperand = "";
   previousOperand = "";
   operation = undefined;

   // for equalBtn
   prev = "";
   current = "";
   sign = "";
   equalSign = "";
   clickEqual = false;

   constructor(upperText, downText) {
      this.upperText = upperText;
      this.downText = downText;
      this.downText.innerText = "0";
   }
   clear() {
      this.currentOperand = "";
      this.previousOperand = "";
      this.operation = undefined;
   }
   appendNumber(number) {
      if (number === "." && this.currentOperand.includes(".")) return;
      // when user click the .(dot), and then we add 0 in front of it
      if (number === "." && this.currentOperand === "") {
         this.currentOperand = "0";
      }
      this.currentOperand = this.currentOperand.toString() + number.toString();
   }
   // 11,000
   getDisplayNumber(number) {
      // 1000
      const stringNum = number.toString(); // 1000 string
      const integerDigits = parseFloat(stringNum.split(".")[0]); // 1000 number
      const decimalDigits = stringNum.split(".")[1]; // "" string
      let integerDisplay;
      if (isNaN(integerDigits)) {
         integerDisplay = this.previousOperand;
      } else {
         integerDisplay = integerDigits.toLocaleString("en", {
            maximumFractionDigits: 0,
         });
         // 0
      }
      if (decimalDigits != null) {
         return `${integerDisplay}.${decimalDigits}`; // 0.3
      } else {
         return integerDisplay;
      }
   }

   chooseOperation(operation) {
      // 5 + 5
      if (this.currentOperand === "") {
         this.operation = operation; // +
         // this.previousOperand = '0';
         return;
      }
      if (this.previousOperand !== "") {
         this.compute();
      }
      this.operation = operation;
      this.previousOperand = this.currentOperand;
      this.currentOperand = "";
      console.log("previous" + this.previousOperand);
      console.log("current" + this.currentOperand);
   }
   compute() {
      // we need ====> prev + current = result (downText)
      let result;
      const prev = parseFloat(this.previousOperand);
      const current = parseFloat(this.currentOperand);
      if (isNaN(prev) || isNaN(current)) return;
      switch (this.operation) {
         case "+":
            result = prev + current;
            break;
         case "-":
            result = prev - current;
            break;
         case "*":
            result = prev * current;
            break;
         case "/":
            result = prev / current;
            break;
         case "%":
            result = prev % current;
            break;
         default:
            break;
      }
      this.prev = prev;
      this.current = current;
      this.sign = this.operation;
      this.equalSign = "=";

      this.currentOperand = result; // 0
      this.previousOperand = ""; // ''
      this.operation = undefined;
      console.log("currentOperand" + this.currentOperand);
      console.log("previousOperand" + this.previousOperand);
   }
   delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1);
   }
   updateDisplay(equalBtn = null) {
      // 5 * 2 = 10 from compute
      // currentOperand = 10 previousOperand = '' operation = undefined
      this.downText.innerText =
         this.getDisplayNumber(this.currentOperand) === ""
            ? "0"
            : this.getDisplayNumber(this.currentOperand);
      // when user click the operation button
      if (this.operation != null) {
         this.upperText.innerText = `
      ${
         this.getDisplayNumber(this.previousOperand) === ""
            ? "0"
            : this.getDisplayNumber(this.previousOperand)
      }${this.operation}
      `;
      } else {
         this.upperText.innerText = "";
      }
      if (equalBtn != null) {
         if (this.currentOperand !== "") {
            if (this.prev) {
               this.upperText.innerText = `${this.prev}${this.sign}${this.current}${this.equalSign}`;
               this.prev = "";
            }
         }
      }
   }
}

const numberBtns = document.querySelectorAll(".number");
const operatorBtns = document.querySelectorAll(".sign");
const upperText = document.querySelector("#upper-text");
const downText = document.querySelector("#down-text");
const clearBtn = document.querySelector(".clear");
const deleteBtn = document.querySelector(".delete");
const equalBtn = document.querySelector(".equal");

const calculator = new Calculator(upperText, downText);

numberBtns.forEach((numberBtn) => {
   numberBtn.addEventListener("click", (e) => {
      calculator.appendNumber(e.target.value);
      calculator.updateDisplay();
   });
});

operatorBtns.forEach((operatorBtn) => {
   operatorBtn.addEventListener("click", (e) => {
      calculator.chooseOperation(operatorBtn.value);
      calculator.updateDisplay();
   });
});

equalBtn.addEventListener("click", (e) => {
   calculator.compute();
   calculator.updateDisplay(equalBtn.value);
});

clearBtn.addEventListener("click", (e) => {
   calculator.clear();
   calculator.updateDisplay();
});

deleteBtn.addEventListener("click", (e) => {
   calculator.delete();
   calculator.updateDisplay();
});
