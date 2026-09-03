// https://leetcode.com/problems/multiply-strings/?envType=problem-list-v2&envId=simulation

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function (num1, num2) {
  if (num1 === "0" || num2 === "0") return "0";

  let ret = "";
  const matrix = [];

  for (let i = num2.length - 1; i >= 0; i--) {
    const right = Number(num2[i]);

    const thisLoop = [];
    for (let k = 0; k < num2.length - 1 - i; k++) thisLoop.push(0);

    let carry = 0;
    for (let j = num1.length - 1; j >= 0; j--) {
      const left = Number(num1[j]);

      const mul = left * right + carry;
      carry = mul >= 10 ? Math.floor(mul / 10) : 0;

      thisLoop.push(mul % 10);
    }
    if (carry > 0) thisLoop.push(carry);

    matrix.push(thisLoop);
  }

  const MAX_COL = matrix[matrix.length - 1].length;
  let carry = 0;
  for (let col = 0; col < MAX_COL; col++) {
    let sum = carry;

    for (let row = 0; row < matrix.length; row++) {
      if (matrix[row].length - 1 < col) continue;

      sum += matrix[row][col];
    }

    carry = sum >= 10 ? Math.floor(sum / 10) : 0;
    ret = (sum % 10) + ret;
  }
  if (carry > 0) ret = carry + ret;

  return ret;
};
