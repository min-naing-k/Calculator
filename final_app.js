class Calculator {
  currentOperand = '';
  previousOperand = '';
  haveDot = false;
  operation = undefined;
  constructor(upperText, downText) {
    this.upperText = upperText;
    this.downText = downText;
    this.downText.innerText = '0';
  }
  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
    this.upperText.innerText = '';
    this.downText.innerText = '0';
  }
  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    if (number === '.' && this.currentOperand === '') {
      this.currentOperand = '0';
    }
    this.currentOperand = this.currentOperand.toString() + number.toString();
    console.log('CurrentOperand' + this.currentOperand);
  }
  // 11,000
  getDisplayNumber(number) {
    // 0.3
    const stringNum = number.toString();
    const integerDigits = parseFloat(stringNum.split('.')[0]); // 0
    console.log('integerDigits' + integerDigits);
    const decimalDigits = stringNum.split('.')[1]; // 3
    console.log('decimalDigits' + decimalDigits);
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = this.previousOperand;
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0,
      });
      // 0
    }
    if (decimalDigits != null) {
      console.log('integerDisplay' + integerDisplay);
      return `${integerDisplay}.${decimalDigits}`; // 0.3
    } else {
      console.log('integerDisplay' + integerDisplay);
      return integerDisplay;
    }
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }
  compute() {
    let result;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case '+':
        result = prev + current;
        break;
      case '-':
        if (prev > current) {
          result = prev - current;
        } else {
          result = current - prev;
        }
        break;
      case '*':
        result = prev * current;
        break;
      case '/':
        result = prev / current;
        break;
      case '%':
        result = prev % current;
        break;
      default:
        break;
    }
    this.currentOperand = result;
    this.previousOperand = '';
    this.operation = undefined;
  }
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
  updateDisplay() {
    this.downText.innerText = this.getDisplayNumber(this.currentOperand);
    if (this.operation != null) {
      this.upperText.innerText = `
      ${this.getDisplayNumber(this.previousOperand)}${this.operation}
      `;
    } else {
      this.upperText.innerText = '';
    }
  }
}

const numberBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.sign');
const upperText = document.querySelector('#upper-text');
const downText = document.querySelector('#down-text');
const clearBtn = document.querySelector('.clear');
const deleteBtn = document.querySelector('.delete');
const equalBtn = document.querySelector('.equal');

const calculator = new Calculator(upperText, downText);

numberBtns.forEach((numberBtn) => {
  numberBtn.addEventListener('click', (e) => {
    calculator.appendNumber(e.target.value);
    calculator.updateDisplay();
  });
});

operatorBtns.forEach((operatorBtn) => {
  operatorBtn.addEventListener('click', (e) => {
    calculator.chooseOperation(operatorBtn.value);
    calculator.updateDisplay();
  });
});

equalBtn.addEventListener('click', (e) => {
  calculator.compute();
  calculator.updateDisplay();
});

clearBtn.addEventListener('click', (e) => {
  calculator.clear();
});

deleteBtn.addEventListener('click', (e) => {
  calculator.delete();
  calculator.updateDisplay();
});
