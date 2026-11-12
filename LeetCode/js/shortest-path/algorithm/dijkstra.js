class Heap {
  constructor(cmp = (a, b) => a - b) {
    this.q = [];
    this.cmp = cmp;
  }

  push(val) {
    const q = this.q,
      cmp = this.cmp;
    q.push(val);

    let i = q.length - 1;
    while (i > 0) {
      let p = (i - 1) >> 1;
      if (cmp(q[p], q[i]) <= 0) break;

      [q[i], q[p]] = [q[p], q[i]];
      i = p;
    }
  }

  pop() {
    const q = this.q,
      cmp = this.cmp;
    if (q.length === 0) return undefined;
    if (q.length === 1) return q.pop();

    let head = q[0];
    q[0] = q.pop();
    let i = 0;
    while (i < q.length) {
      let o = i;
      let l = 2 * i + 1,
        r = l + 1;

      if (l < q.length && cmp(q[l], q[i]) < 0) i = l;
      if (r < q.length && cmp(q[r], q[i]) < 0) i = r;
      if (i === o) break;

      [q[o], q[i]] = [q[i], q[o]];
    }

    return head;
  }

  get size() {
    return this.q.length;
  }
  get queue() {
    return this.q;
  }
}

const dijkstra = (graph, start, n) => {
  const dist = new Array(n).fill(Infinity);
  dist[start] = 0;

  const q = [start];
  let head = 0;
  while (head < q.length) {
    const from = q[head];

    for ([to, cost] of graph[from])
      if (dist[to] > dist[from] + cost) {
        dist[to] = dist[from] + cost;
        q.push(to);
      }

    head++;
  }

  console.log(dist);
};

const dijkstra_heap = (graph, start, n) => {
  const dist = new Array(n).fill(Infinity),
    visited = new Array(n).fill(false);
  dist[start] = 0;

  const minHeap = new Heap((a, b) => a[1] - b[1]);
  minHeap.push([start, 0]);

  while (minHeap.size > 0) {
    const [to, acc] = minHeap.pop();
    if (visited[to]) continue;
    visited[to] = true;

    for (let [next, cost] of graph[to])
      if (!visited[next] && dist[next] > acc + cost) {
        dist[next] = acc + cost;
        minHeap.push([next, acc + cost]);
      }
  }

  console.log(dist);
};

const graph = [
  [
    [1, 4],
    [2, 2],
  ],
  [
    [2, 1],
    [3, 5],
  ],
  [
    [1, 1],
    [3, 8],
    [4, 10],
  ],
  [
    [4, 2],
    [5, 6],
  ],
  [[5, 3]],
  [],
];
const start = 0;
const n = 6;

dijkstra(graph, start, n);
dijkstra_heap(graph, start, n);
