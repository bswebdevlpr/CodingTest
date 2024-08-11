// DP 메모이제이션
// 종만북 솔루션
// 이게 런타임에러가 뜬다고?
function solution(n) {
  const MOD = 1000000007;
  var answer = 0;
  const memo = new Array(n + 1).fill(-1);

  // 재귀구현
  // function exSearch(width) {
  //   if (width <= 1) return 1;

  //   let ret = memo[width];
  //   if (ret !== -1) return ret;

  //   return (memo[width] = (exSearch(width - 2) + exSearch(width - 1)) % MOD);
  // }

  // answer = exSearch(n);

  // for loop 구현
  (memo[0] = 1), (memo[1] = 1);
  for (let width = 2; width <= n; width++) {
    memo[width] = (memo[width - 2] + memo[width - 1]) % MOD;
  }
  answer = memo[n];

  return answer;
}
