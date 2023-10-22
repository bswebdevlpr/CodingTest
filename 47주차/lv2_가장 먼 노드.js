// bfs
// depth 구하기 => 상위 노드에서 하위 노드 바라보기

function solution(n, edges) {
  let answer;

  const nodeDict = {},
    distDict = {};
  edges.forEach((edge) => {
    if (!nodeDict[edge[0]])
      nodeDict[edge[0]] = { visited: false, childs: [edge[1]], depth: 0 };
    else nodeDict[edge[0]].childs.push(edge[1]);

    if (!nodeDict[edge[1]]) {
      nodeDict[edge[1]] = { visited: false, childs: [edge[0]], depth: 0 };
    } else nodeDict[edge[1]].childs.push(edge[0]);
  });

  const bfs = [1];
  nodeDict["1"].visited = true;

  let idx = 0;
  while (idx < bfs.length) {
    const nowNode = nodeDict[bfs[idx]];

    for (let childNodeNum of nowNode.childs) {
      const childNode = nodeDict[childNodeNum];

      if (!childNode.visited) {
        bfs.push(childNodeNum);

        childNode.visited = true;
        childNode.depth = nowNode.depth + 1;
      }
    }

    idx++;
  }

  let cnt = 0;
  const sorted = Object.values(nodeDict).sort((b, a) => a.depth - b.depth);
  const max = sorted[0].depth;
  for (let obj of sorted) {
    if (obj.depth !== max) break;
    cnt++;
  }

  answer = cnt;

  return answer;
}
