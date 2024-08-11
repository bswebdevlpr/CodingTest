function solution(n, s, a, b, fares) {
  var answer = 0;
  (s -= 1), (a -= 1), (b -= 1);

  const nodes = [];
  for (let i = 0; i < n; i++) {
    nodes.push(new Array(n).fill(Infinity));
    nodes[i][i] = 0;
  }

  fares.forEach((fare) => {
    nodes[fare[0] - 1][fare[1] - 1] = fare[2];
    nodes[fare[1] - 1][fare[0] - 1] = fare[2];
  });

  floyd_warshall(n, nodes, s, a, b);

  let min = nodes[s][a] + nodes[s][b];
  nodes.forEach((row, idx) => {
    const sum = row[s] + row[a] + row[b];
    min = Math.min(sum, min);
  });
  answer = min;

  return answer;
}

// O(n^3)
function floyd_warshall(n, nodes) {
  for (let via = 0; via < n; via++) {
    for (let from = 0; from < n; from++) {
      for (let to = 0; to < n; to++) {
        if (nodes[from][to] > nodes[from][via] + nodes[via][to])
          nodes[from][to] = nodes[from][via] + nodes[via][to];
      }
    }
  }
}
