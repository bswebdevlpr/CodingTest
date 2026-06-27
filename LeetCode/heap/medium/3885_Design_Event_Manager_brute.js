/**
 * @param {number[][]} events
 */
var EventManager = function (events) {
  this.sort = (arr) =>
    arr.sort(([e2, p2], [e1, p1]) => {
      if (p2 > p1) return -1;
      else if (p2 === p1 && e2 < e1) return -1;
      else return 1;
    });
  this.heap = this.sort(events);
  this.heapIdxMap = (() => {
    const map = new Map();
    this.heap.forEach(([ei, _], idx) => map.set(ei, idx));
    return map;
  })();

  this.shiftUp = function (idx) {
    while (true) {
      const parentIdx = Math.floor((idx - 1) / 2);
      if (parentIdx < 0) return;

      const node = this.heap[idx],
        parent = this.heap[parentIdx];
      const winner = this.sort([node, parent])[0];

      if (winner == node) {
        temp = [...this.heap[idx]];
        this.heap[idx] = parent;
        this.heap[parentIdx] = temp;

        this.heapIdxMap.set(parent[0], idx);
        this.heapIdxMap.set(node[0], parentIdx);
        idx = parentIdx;
      } else {
        this.heapIdxMap.set(node[0], idx);
        return;
      }
    }
  };

  this.shiftDown = function (i) {
    let temp;
    const now = this.heap[i];

    while (true) {
      if (i > this.heap.length - 1) return;

      const leftIdx = 2 * i + 1,
        rightIdx = 2 * i + 2;

      const left = leftIdx < this.heap.length && this.heap[leftIdx],
        right = rightIdx < this.heap.length && this.heap[rightIdx];

      // priority가 같은 경우 eventId가 더 작은 요소를 위로 올려야함
      const sorted = this.sort([now, left, right].filter((e) => e));
      const winner = sorted[0];

      if (winner == left) {
        temp = [...this.heap[i]];
        this.heap[i] = left;
        this.heap[leftIdx] = temp;

        this.heapIdxMap.set(left[0], i);
        this.heapIdxMap.set(now[0], leftIdx);
        i = leftIdx;
      } else if (winner == right) {
        temp = [...this.heap[i]];
        this.heap[i] = right;
        this.heap[rightIdx] = temp;

        this.heapIdxMap.set(right[0], i);
        this.heapIdxMap.set(now[0], rightIdx);
        i = rightIdx;
      } else {
        this.heapIdxMap.set(now[0], i);
        return;
      }
    }
  };
};

/**
 * @param {number} eventId
 * @param {number} newPriority
 * @return {void}
 */
EventManager.prototype.updatePriority = function (eventId, newPriority) {
  const idx = this.heapIdxMap.get(eventId);

  const [_, oldP] = this.heap[idx];

  this.heap[idx][1] = newPriority;

  if (oldP < newPriority) this.shiftUp(idx);
  else if (oldP > newPriority) this.shiftDown(idx);
};

/**
 * @return {number}
 */
EventManager.prototype.pollHighest = function () {
  if (this.heap.length === 0) return -1;

  let temp = this.heap[0];
  this.heap[0] = this.heap[this.heap.length - 1];
  this.heap[this.heap.length - 1] = temp;

  this.heapIdxMap.set(this.heap[0][0], 0);
  this.heapIdxMap.delete(this.heap[this.heap.length - 1][0]);

  const [eventId, _] = this.heap.pop();

  if (this.heap.length > 1) {
    this.shiftDown(0);
  }

  return eventId;
};

/**
 * Your EventManager object will be instantiated and called as such:
 * var obj = new EventManager(events)
 * obj.updatePriority(eventId,newPriority)
 * var param_2 = obj.pollHighest()
 */
