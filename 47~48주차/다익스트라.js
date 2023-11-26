const costs = [
  [4, 1, 10],
  [3, 5, 24],
  [5, 6, 2],
  [3, 1, 41],
  [5, 1, 24],
  [4, 6, 50],
  [2, 4, 66],
  [2, 3, 22],
  [1, 6, 25],
];
const n = 6;

const nodes = [];
for (let i = 0; i < n; i++) {
  nodes.push(new Array(n).fill(Infinity));
}

costs.forEach((cost) => {
  nodes[cost[0] - 1][cost[1] - 1] = cost[2];
  nodes[cost[1] - 1][cost[0] - 1] = cost[2];
});

console.log(nodes);

const visited = new Array(n).fill(false);
const start = 0;
let now = start;
let min = Infinity,
  minIdx = -1;
let trigger = true; // 어느 노드와도 연결되지 않은 노드가 포함되는 경우를 위한 stop trigger.
// 모든 노드가 방문될때까지 반복한다.
while (visited.includes(false) && trigger) {
  // 현재 행에 대해 방문했음을 표시.
  visited[now] = true;
  console.log("visit:", now);
  console.log("visited:", visited);

  // 현재 행에 이전값을 더하고 start 행의 값들과 비교한다. start 행인 경우 패스한다.
  if (now !== start) {
    console.log("now:", nodes[now]);
    console.log("before change:", nodes[start]);
    for (let i = 0; i < n; i++) {
      if (i === now) nodes[now][i] = 0;
      else nodes[now][i] += min;

      if (nodes[now][i] > 0 && nodes[now][i] < nodes[start][i]) {
        console.log(
          `Changed! column${i}`,
          nodes[start][i],
          "to",
          nodes[now][i]
        );
        nodes[start][i] = nodes[now][i];
      }
    }
    console.log(">>>", nodes[now]);
    console.log("after change:", nodes[start]);
  }

  // 다음 행으로 이동하기 위한 최솟값을 찾음.
  // 시작 행의 원소값과 비교하여 해당 값이 작지 않으면 이동하지 않는다.
  (trigger = false), (min = Infinity);
  nodes[start].forEach((num, idx) => {
    if (!visited[idx] && num > 0 && min > num) {
      min = num;
      minIdx = idx;
      trigger = true;
    }
  });
  now = minIdx;

  console.log("loop end");
  console.log();
}

console.log();
console.log("======RESULT===========");
console.log(visited);
console.log(nodes);
