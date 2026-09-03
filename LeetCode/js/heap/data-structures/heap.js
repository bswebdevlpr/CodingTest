/**
 * Key Points
 * 1. 루트를 꺼낸다.
 * 2. reindex 시 tail을 루트 자리에 넣고 shake
 */

class MinHeap {
  heap = [];

  constructor(nums) {
    this.heap = nums.sort((b, a) => b - a);
  }

  reindex() {
    let p = 0;

    const tail = this.heap.pop();
    this.heap[p] = tail;

    while (true) {
      const left = p * 2 + 1,
        right = p * 2 + 2;

      const min = Math.min(
        this.heap[p],
        this.heap[left] ?? Infinity,
        this.heap[right] ?? Infinity,
      );

      if (min === this.heap[left]) {
        const tmp = this.heap[p];
        this.heap[p] = this.heap[left];
        this.heap[left] = tmp;
        p = left;
      } else if (min === this.heap[right]) {
        const tmp = this.heap[p];
        this.heap[p] = this.heap[right];
        this.heap[right] = tmp;
        p = right;
      } else return;
    }
  }
  getMin() {
    const min = this.heap[0];
    this.reindex();
    return min;
  }
}

// from AI
class MinHeapByAI {
  constructor() {
    this.heap = [];
  }

  push(item) {
    // 일단 넣고
    this.heap.push(item);

    // 인덱스 잡고
    let i = this.heap.length - 1;

    // stop condition: heap 길이
    while (i > 0) {
      // 부모 인덱스 찾고 childIdx = (2 * parentIdx + 1)를 이항해서 도출
      let parent = Math.floor((i - 1) / 2);

      // 부모 인덱스가 본인보다 작으면 루프 탈출
      if (this.heap[parent].cost <= this.heap[i].cost) break;

      // 부모와 자식의 값 변경
      [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];

      // 부모와 자식의 인덱스 변경
      i = parent;
    }
  }

  pop() {
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];

    this.heap[0] = this.heap.pop();

    let i = 0;

    while (true) {
      let left = i * 2 + 1,
        right = i * 2 + 2;

      let smallest = i;

      if (
        left < this.heap.length &&
        this.heap[left].cost < this.heap[smallest].cost
      )
        smallest = left;

      if (
        right < this.heap.length &&
        this.heap[right].cost < this.heap[smallest].cost
      )
        smallest = right;

      if (smallest === i) break;

      [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];

      i = smallest;
    }

    return min;
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

module.exports = MinHeapByAI;
