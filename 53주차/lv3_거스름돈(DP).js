function solution(n, money) {
  const dp = new Array(money.length)
    .fill()
    .map(() => new Array(n + 1).fill(0).fill(1, 0, 1));
  // DP는 중복되는 연산을 이용하여 결과를 도출하는 방법임.
  dp[0] = new Array(n + 1).fill(1);

  // i: 사용된 화폐종류
  // j: 거스름돈
  for (let i = 1; i < money.length; i++) {
    const coin = money[i];
    for (let j = 1; j < n + 1; j++) {
      dp[i][j] =
        j < coin ? dp[i - 1][j] : (dp[i][j] = dp[i - 1][j] + dp[i][j - coin]);
    }
  }

  return dp[money.length - 1][n] % 1000000007;
}

solution(5, [1, 2, 5]);
