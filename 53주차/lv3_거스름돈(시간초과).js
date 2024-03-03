let cnt = 0;

function solution(n, money) {
  money = money.sort((a, b) => b - a);

  // 나머지에 따라 경우의 수가 무한히 나뉨
  // dfs
  dfs(money, n, 0);

  return cnt % 1000000007;
}

function dfs(money, operand, idx) {
  const operator = money[idx];
  const quot = Math.floor(operand / operator);

  for (let i = 0; i <= quot; i++) {
    const newOperand = operand - operator * i;
    if (newOperand === 0) {
      cnt++;
      break;
    }

    dfs(money, newOperand, idx + 1);
  }
}
