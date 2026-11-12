function bellmanFord(V, edges, start) {
  // V: 정점 개수
  // edges: [from, to, weight][]
  // start: 시작 정점

  const dist = new Array(V + 1).fill(Infinity);
  dist[start] = 0;

  for (let i = 0; i < V - 1; i++) {
    let updated = false;

    for (let [from, to, weight] of edges) {
      if (dist[from] === Infinity) conitnue;

      if (dist[to] > dist[from] + weight) {
        dist[to] = dist[from] + weight;
        updated = true;
      }
    }

    if (!updated) break;
  }

  for (let [from, to, weight] of edges) {
    if (dist[from] === Infinity) continue;

    if (dist[to] > dist[from] + weight) return null;
  }

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

const start = 1;

console.log(bellmanFord(V, edges, start));
