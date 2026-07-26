const MinHeapByAI = require("../../../heap/data-structures/heap");

const INF = Infinity;

const graph = [
  [],
  [
    { to: 2, cost: 2 },
    { to: 3, cost: 5 },
  ],
  [
    { to: 3, cost: 1 },
    { to: 4, cost: 4 },
  ],
  [{ to: 4, cost: 2 }],
  [],
];

function dijkstra(start, graph) {
  const dist = Array(graph.length).fill(INF);

  dist[start] = 0;

  // Primary Queue (MinHeap)
  const pq = new MinHeapByAI();

  pq.push({
    node: start,
    cost: 0,
  });

  while (!pq.isEmpty()) {
    const cur = pq.pop();

    if (cur.cost > dist[cur.node]) continue;

    // 현재 노드의 엣지들을 확인
    for (const next of graph[cur.node]) {
      // 기록해놓은 cost에 현재 edge의 cost를 합한다.
      // (cur이 노드가 순환 방문하여 갱신되므로 누적합이 맞다.)
      const nextCost = dist[cur.node] + next.cost;

      // 현재 노드와 연결된 노드들으로의 이동 비용이 저장해놓은 값보다 작아지는 경우 해당 노드도 방문
      if (nextCost < dist[next.to]) {
        dist[next.to] = nextCost;

        pq.push({
          node: next.to,
          cost: nextCost,
        });
      }
    }
  }

  return dist;
}

console.log(dijkstra(1, graph));
