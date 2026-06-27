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
