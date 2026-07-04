// https://leetcode.com/problems/unique-paths/description/?envType=study-plan-v2&envId=leetcode-75

// TOP-DOWN
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

// BOTTOM-UP
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
  // m x n 크기의 DP 테이블을 1로 초기화합니다.
  // (첫 번째 행과 첫 번째 열은 무조건 직진밖에 없으므로 경로가 1개뿐입니다)
  const dp = Array.from({ length: m }, () => Array(n).fill(1));

  // 첫 행(row=0)과 첫 열(col=0)은 이미 1로 채워졌으므로 (1, 1)부터 시작합니다.
  for (let row = 1; row < m; row++) {
    for (let col = 1; col < n; col++) {
      // 현재 칸으로 오는 방법 = 위에서 내려오는 방법 + 왼쪽에서 오는 방법
      dp[row][col] = dp[row - 1][col] + dp[row][col - 1];
    }
  }

  // 맨 오른쪽 아래 목적지의 값을 리턴합니다.
  return dp[m - 1][n - 1];
};
