// https://leetcode.com/problems/n-th-tribonacci-number/?envType=study-plan-v2&envId=leetcode-75

/**
 * @param {number} n
 * @return {number}
 */
var tribonacci = function (n) {
  const dp = [0, 1, 1];
  if (n < 3) return dp[n];

  for (let i = 3; i < n; i++) {
    const newElem = dp[0] + dp[1] + dp[2];

    dp[0] = dp[1];
    dp[1] = dp[2];
    dp[2] = newElem;
  }

  return dp.reduce((acc, cur) => acc + cur, 0);
};
