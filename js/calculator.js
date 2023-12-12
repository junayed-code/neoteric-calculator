const operators = {
  '+': 'addition',
  '-': 'subtraction',
  '×': 'multiplication',
  '÷': 'divide',
  '%': 'percentage',
};

const Calculator = {
  operation(operator, ...values) {
    return Calculator[operators[operator]](...values);
  },

  addition(num1, num2) {
    return +num1 + +num2;
  },

  subtraction(num1, num2) {
    return +num1 - +num2;
  },

  multiplication(num1, num2) {
    return +num1 * +num2;
  },

  divide(num1, num2) {
    return +num1 / +num2;
  },

  percentage(num) {
    return +num / 100;
  },
};

export default Calculator;
