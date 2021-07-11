class Calculator {
  currentOperand = '';
  previousOperand = '';
  operation = undefined;
  constructor(upperText, downText) {
    this.upperText = upperText;
    this.downText = downText;
  }
  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }
  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  getDisplayNumber(number) {
    const stringNum = number.toString();
    const integerDigits = parseFloat(stringNum);
    console.log('integerDigits' + integerDigits);
    let integerDisplay;
    integerDisplay = integerDigits.toLocaleString('en', {
      maximumFractionDigits: 0,
    });
    console.log('integerDisplay' + integerDisplay);
    return integerDisplay;
  }
  updateDisplay() {
    this.downText.innerText = this.getDisplayNumber(this.currentOperand);
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
