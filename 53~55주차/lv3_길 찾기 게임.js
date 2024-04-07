class Node {
  x;
  y;

  idx;

  parent;
  left;
  right;

  /**
   *
   * @param {*} x
   * @param {*} y
   * @param {*} idx
   */
  constructor(x, y, idx) {
    this.x = x;
    this.y = y;
    this.idx = idx;

    this.parent = null;
    this.left = null;
    this.right = null;
  }
}

function solution(nodeinfo) {
  nodeinfo = nodeinfo
    .map(([x, y], idx) => [x, y, idx + 1])
    .sort((b, a) => a[1] - b[1]);
  // console.log(nodeinfo);

  // 트리 생성 및 확인
  const root = createTree(nodeinfo);
  // printAll(root);

  // 전위 순회
  const preorder = preorderTraverse(nodeinfo, root);
  // 후위 순회
  const postorder = postorderTraverse(nodeinfo, root);

  return [preorder, postorder];
}

// 좌표에 따른 트리구조 생성
function createTree(nodeinfo) {
  const root = new Node(nodeinfo[0][0], nodeinfo[0][1], nodeinfo[0][2]);
  for (let i = 1; i < nodeinfo.length; i++) {
    const info = nodeinfo[i];

    const newNode = new Node(info[0], info[1], info[2]);
    findLoc(root, newNode);
  }

  return root;
}

function findLoc(nowNode, newNode) {
  // 현재노드가 상위노드인 경우
  if (newNode.y < nowNode.y) {
    // 자식노드가 없는 경우,
    if (!nowNode.left && !nowNode.right) {
      // 현재 노드 x좌표 기준 left or right 할당.
      if (newNode.x < nowNode.x) nowNode.left = newNode;
      else nowNode.right = newNode;
      newNode.parent = nowNode;

      return;
    }

    // 자식노드가 둘 다 있는 경우
    else if (nowNode.left && nowNode.right) {
      // if x좌표가 left와 더 가까운 경우 left로 이동
      if (newNode.x < nowNode.x) nowNode = nowNode.left;
      // else if x좌표가 right와 더 가까운 경우 right로 이동
      else nowNode = nowNode.right;
    }

    // 자식노드가 하나인 경우,
    // 있는쪽으로 그냥 이동
    else {
      nowNode = nowNode.left ? nowNode.left : nowNode.right;
    }
  }
  // 현재노드가 형제노드인 경우
  else {
    if (newNode.x < nowNode.x) nowNode.parent.left = newNode;
    else nowNode.parent.right = newNode;
    newNode.parent = nowNode.parent;

    return;
  }

  findLoc(nowNode, newNode);
}

function printAll(node) {
  console.log("this:", node.idx);
  if (node.left) console.log("left:", node.left.idx);
  if (node.right) console.log("right:", node.right.idx);
  console.log();

  if (node.left) printAll(node.left);
  if (node.right) printAll(node.right);
}

function preorderTraverse(nodeinfo, root) {
  const order = [];
  const visited = new Array(nodeinfo.length).fill(false);

  let nowNode = root;
  while (visited.includes(false)) {
    if (!visited[nowNode.idx - 1]) {
      visited[nowNode.idx - 1] = true;
      order.push(nowNode.idx);
    }

    if (nowNode.left && !visited[nowNode.left.idx - 1]) nowNode = nowNode.left;
    else if (nowNode.right && !visited[nowNode.right.idx - 1])
      nowNode = nowNode.right;
    else nowNode = nowNode.parent;
  }

  return order;
}

function postorderTraverse(nodeinfo, root) {
  const order = [];
  const visited = new Array(nodeinfo.length).fill(false);

  let nowNode = root;
  while (visited.includes(false)) {
    if (nowNode.left && !visited[nowNode.left.idx - 1]) nowNode = nowNode.left;
    else if (nowNode.right && !visited[nowNode.right.idx - 1])
      nowNode = nowNode.right;
    else {
      visited[nowNode.idx - 1] = true;
      order.push(nowNode.idx);

      nowNode = root;
    }
  }

  return order;
}

solution([
  [5, 3],
  [11, 5],
  [13, 3],
  [3, 5],
  [6, 1],
  [1, 3],
  [8, 6],
  [7, 2],
  [2, 2],
]);
