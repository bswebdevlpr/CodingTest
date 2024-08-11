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
let n = 6;

let nodes = [];
for (let i = 0; i < n; i++) {
  nodes.push(new Array(n).fill(Infinity));
}

costs.forEach((cost) => {
  nodes[cost[0] - 1][cost[1] - 1] = cost[2];
  nodes[cost[1] - 1][cost[0] - 1] = cost[2];
});

console.log(nodes);

for (let from = 0; from < n; from++) {
  for (let to = 0; to < n; to++) {
    if (from === to) continue;
    for (let via = 0; via < n; via++) {
      if (nodes[from][via] === Infinity || nodes[from][via] === 0) continue;

      const copied = nodes[via].slice().map((num) => num + nodes[from][via]);
      if (nodes[from][to] > copied[to]) nodes[from][to] = copied[to];
    }
  }
}

console.log();
console.log("======RESULT===========");
console.log(nodes);
