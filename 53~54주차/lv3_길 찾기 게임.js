class Node {
  x;
  y;

  num;

  parent;
  left;
  right;

  constructor(x, y, num) {
    this.x = x;
    this.y = y;
    this.num = num;
  }
}

function solution(nodeinfo) {
  var answer = [[]];

  // 트리 작성
  // y좌표가 가장 큰 노드가 루트노드
  nodeinfo = nodeinfo.sort((b, a) => {
    const diff = a[1] - b[1];

    return diff < 0 ? diff : b[0] - a[0];
  });
  let root, nowNode;
  nodeinfo.forEach(([x, y], idx) => {
    const newNode = new Node(x, y, idx + 1);

    if (idx === 0) {
      root = newNode;
    }

    if (newNode.y === nowNode.y) {
      const parentNode = nowNode.parent;

      newNode.parent = parentNode;

      if (newNode.x < parentNode.x) parentNode.left = newNode;
      else parentNode.right = newNode;

      // depth3부터 적용안됨
      // => parent가 될 수 있는 노드가 두개 이상인 시점
      // 현재 만들어진 트리를 bfs 하면서 넣을 위치를 찾아야할듯.
    } else if (newNode.y < nowNode.y) {
      newNode.parent = nowNode;
    }
  });

  // 루트 포인터 갱신

  // 전위 순회

  // 후위 순회

  return answer;
}

function findLoc(root, newNode) {
  let nowNode = root;
  while (nowNode.left && nowNode.right) {
    // 고민필요
  }
}
