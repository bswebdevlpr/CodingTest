function floydWarshall(V, edges) {
  V++;

  const dist = Array.from({ length: V }, () => new Array(V).fill(Infinity));

  for (let i = 1; i < V; i++) dist[i][i] = 0;

  for (let [from, to, weight] of edges)
    dist[from][to] = Math.min(dist[from][to], weight);

  for (let k = 1; k < V; k++)
    for (let i = 1; i < V; i++)
      for (let j = 1; j < V; j++)
        if (dist[i][j] > dist[i][k] + dist[k][j])
          dist[i][j] = dist[i][k] + dist[k][j];

  return dist;
}

const V = 5;
const edges = [
  [1, 2, 4],
  [1, 3, 3],
  [2, 3, -2],
  [2, 4, 2],
  [3, 4, 5],
  [4, 5, 1],
  [3, 5, 7],
];

console.log(floydWarshall(V, edges));
