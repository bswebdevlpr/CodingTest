// 다익스트라의 단점, 간선의 가중치가 음수면 사용할 수 없다는 점을 보완한 알고리즘.

const INF = Infinity;
const dist = Array(4).fill(INF);
dist[1] = 0;

// 모든 간선을 계속 보면서 거리 갱신(Relaxation)을 반복한다.
function bellmanFord(V, edges) {
  // 노드가 길게 (1 → 2 → 3 → 4 → 5 처럼) 연결되어 있으면
  // 한 번의 순회만으로는 마지막 노드까지 최단 거리가 전파되지 않을 수 있다.
  // 노드가 V개라면 최장 단순 경로는 간선이 최대 V-1개이다.
  for (let i = 1; i <= V - 1; i++) {
    for (const [from, to, cost] of edges) {
      if (dist[from] === Infinity) continue;

      if (dist[to] > dist[from] + cost) dist[to] = dist[from] + cost;
    }
  }
}
