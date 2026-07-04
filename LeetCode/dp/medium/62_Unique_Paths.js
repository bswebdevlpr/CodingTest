// https://leetcode.com/problems/unique-paths/description/?envType=study-plan-v2&envId=leetcode-75

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
  if ((m === 1) & (n === 1)) return 1;

  const MAX_ROW = m - 1,
    MAX_COL = n - 1;
  const memo = new Array(m).fill().map(() => new Array(n).fill(0));

  const dfs = (row, col) => {
    if (memo[row][col]) return memo[row][col];

    if (
      (row + 1 === MAX_ROW && col === MAX_COL) ||
      (row === MAX_ROW && col + 1 === MAX_COL)
    ) {
      memo[row][col] = 1;
      return memo[row][col];
    }

    let right = 0,
      down = 0;
    if (row + 1 <= MAX_ROW && col <= MAX_COL) down = dfs(row + 1, col);
    if (row <= MAX_ROW && col + 1 <= MAX_COL) right = dfs(row, col + 1);

    memo[row][col] = down + right;

    return memo[row][col];
  };
  dfs(0, 0);

  return memo[0][0];
};
