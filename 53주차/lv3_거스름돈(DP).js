function solution(n, money) {
  const dp = [1, ...new Array(n).fill(0)];
  // DP는 중복되는 연산을 이용하여 결과를 도출하는 방법임.

  // i: 사용된 화폐종류
  // j: 거스름돈
  for (let i = 0; i < money.length; i++) {
    const coin = money[i];
    for (let j = 0; j < n + 1; j++) {
      if (j >= coin) dp[j] += dp[j - coin];
    }
  }

  return dp[n] % 1000000007;
}

solution(5, [1, 2, 5]);
