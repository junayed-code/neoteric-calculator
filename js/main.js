import { toNumber, numberFormat } from './utilities.js';
import Calc from './calculator.js';
const $$ = document;

class App {
  MAX_CHAR = 15;
  firstNumber = 0;
  equation = $$.getElementById('equation');
  mainDisplay = $$.getElementById('calculate-value');

  constructor() {
    // Add event listener
    $$.querySelector('.container-button').addEventListener(
      'click',
      this.handleAllBtnClick
    );
    $$.getElementById('percent').addEventListener(
      'click',
      this.handlePercentBtn
    );
    $$.getElementById('delete').addEventListener('click', this.handleDeleteBtn);
    $$.getElementById('clear').addEventListener('click', this.handleClearBtn);
    $$.getElementById('equal').addEventListener('click', this.handleEqualBtn);
  }

  get displayValue() {
    return this.mainDisplay.value;
  }

  updateMainDisplay(newValue = '', ignoreDecimal) {
    this.mainDisplay.value = numberFormat(newValue, ignoreDecimal);
  }

  updateEquationDisplay(newValue = '') {
    this.equation.value = newValue;
  }

  skipToPutNumber(number) {
    const { displayValue } = this;
    if (
      (number === '.' && displayValue.includes('.')) ||
      displayValue.length >= this.MAX_CHAR
    ) {
      return true;
    }
    return false;
  }

  putNumberToDisplay(number) {
    if (this.skipToPutNumber(number)) return;
    this.updateMainDisplay(this.displayValue + number, false);
  }

  handleDeleteBtn = () => {
    if (this.isFirstNumber) return;
    this.updateMainDisplay(this.displayValue.slice(0, -1), false);
  };

  handleClearBtn = () => {
    this.updateMainDisplay(); // Clear the main dispaly
    this.updateEquationDisplay(); // Clear the equation display
    this.operator = '';
  };

  handlePercentBtn = () => {
    const { displayValue } = this;
    const result = Calc.percentage(toNumber(displayValue));
    this.updateMainDisplay(result);
    this.updateEquationDisplay(`${displayValue}%`);
  };

  handleEqualBtn = () => {
    const { operator, displayValue, equation } = this;
    if (!operator) return;

    const secondNumber = toNumber(displayValue);
    const result = Calc.operation(operator, this.firstNumber, secondNumber);
    this.updateEquationDisplay(
      `${equation.value} ${numberFormat(displayValue)} =`
    );
    this.updateMainDisplay(result);
    this.operator = '';
  };

  handleAllBtnClick = ({ target }) => {
    const { number, operator } = target.dataset;
    if (number) {
      if (this.isFirstNumber) {
        this.updateMainDisplay(); // Clear the main display
        this.isFirstNumber = false;
      }
      return this.putNumberToDisplay(number);
    }

    if (operator) {
      // Calculate by operator
      if (this.operator && !this.isFirstNumber) {
        this.handleEqualBtn();
      }

      this.operator = operator;
      this.isFirstNumber = true;
      this.firstNumber = toNumber(this.displayValue);
      this.updateEquationDisplay(
        `${numberFormat(this.displayValue)} ${operator}`
      );
    }
  };
}

new App();
