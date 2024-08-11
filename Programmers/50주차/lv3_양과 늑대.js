const LAMB = 0,
  WOLF = 1;

function solution(info, edges) {
  // bfs로 해서 형제끼리는 서로 갈 수 있다고 가정하고 해보자.
  // IDENTIFICATION

  // CODES
  var answer = 0;

  const nodeDict = createNodeDict(info, edges);
  answer = bfs(info.length, nodeDict);

  return answer;
}

function bfs(n, nodeDict) {
  const bfs = [],
    visited = new Array(n).fill(false);

  const results = [];
  let loop = 0;
  bfs.push([0, [], [0, 0]]); // idx, history, counts
  while (loop < bfs.length) {
    const now = bfs[loop];

    const idx = now[0],
      history = now[1],
      counts = now[2];
    const nowNode = nodeDict[idx];

    // 현재 노드를 방문 후, 늑대 수가 더 많거나 같다면 결과 반환.
    // 진행할 수 있는 노드가 없어도 반환.
    counts[nowNode.animal]++;
    if (counts[WOLF] >= counts[LAMB]) {
      results.push(now);
      loop++;
      continue;
    }
    history.push(idx);

    // 기존 bfs와 다르게 여기서는 부모노드를 타고 올라가 방문되지 않은 형제 노드까지 다음 방문에 추가한다.
    // idx의 left,right 그리고 history의 모든 노드에 대해 history에 들어있지 않은 left, right를 전부 추가.
    const visitable = [];
    history.forEach((historyIdx) => {
      const nowNode = nodeDict[historyIdx];

      if (nowNode.left && !history.includes(nowNode.left))
        visitable.push(nowNode.left);
      if (nowNode.right && !history.includes(nowNode.right))
        visitable.push(nowNode.right);
    });

    if (visitable.length === 0) {
      results.push(now);
    } else {
      visitable.forEach((visitableIdx) => {
        bfs.push([visitableIdx, history.slice(), counts.slice()]);
      });
    }

    loop++;
  }

  let max = -1;
  results.forEach(([idx, history, counts]) => {
    max = Math.max(counts[0], max);
  });

  return max;
}

class Node {
  constructor(animal) {
    this.animal = animal;
  }
  setLeft(left) {
    this.left = left;
  }
  setRight(right) {
    this.right = right;
  }
}

function createNodeDict(info, edges) {
  const nodeDict = {};

  // creates nodes
  edges.forEach(([parentIdx, childIdx]) => {
    if (!nodeDict[parentIdx]) nodeDict[parentIdx] = new Node(info[parentIdx]);

    if (!nodeDict[childIdx]) {
      nodeDict[childIdx] = new Node(info[childIdx]);
    }

    if (!nodeDict[parentIdx].left) nodeDict[parentIdx].setLeft(childIdx);
    else if (!nodeDict[parentIdx].right) nodeDict[parentIdx].setRight(childIdx);
    else return -1;
  });

  return nodeDict;
}
