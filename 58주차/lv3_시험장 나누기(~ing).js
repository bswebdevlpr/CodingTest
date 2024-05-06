class Node {
  constructor(idx, left, right) {
      this.idx = idx;
      this.left = left;
      this.right = right;
      this.parent = null;
      
      this.weight = 0;
      
      this.visited = false;
  }
}

function solution(k, num, links) {
  var answer = 0;
  
  // Create nodes and make them parent
  const nodeDict = {};
  links.map(([left, right], idx) => {
      nodeDict[idx] = new Node(idx, left, right);
  })
  num.forEach((num, idx) => {
      nodeDict[idx].weight = num;
  })
  
  Object.values(nodeDict).forEach(thisNode => {
      if(thisNode.left > -1) nodeDict[thisNode.left].parent = thisNode.idx;
      if(thisNode.right > -1) nodeDict[thisNode.right].parent = thisNode.idx;
  })
  console.log(nodeDict);
  
  const desc = Object.values(nodeDict).sort((b, a) => a.num - b.num);
  console.log(desc);
  
  let beforeMaxNum = 0;
  const groupedWeights = []
  for(let groupIdx=1; groupIdx < k; groupIdx++) {
      const nowNode = desc.find((elem) => elem.visited);
      nowNode.visited = true;
      
      let thisGroupTotalWeight = desc.filter(node => !node.visited).reduce((acc, cur) => acc + cur, 0)
      
      // prerequisite: (총 가중치 - 본인 가중치) / 남은 그룹 수 => 이전 그룹핑의 최대 num을 기록
      let nowMaxWeightInThisGroup = (thisGroupTotalWeight - nowNode.weight) / (k - groupIdx);
      // LOOP
      while(true){
      // if 1.1: 이동할 수 있는 노드가 있는가? to stop
          const movable = [
              nowNode.parent ? nowNode.parent
              // TODO: dfs => 가도됨? 메모이제이션 필요?
          ] // parent, left, right
          // no: stop
          // yes:
              // action 1.1.1: (총 가중치 - 현재 가중치) / 남은 그룹 수
              // action 1.1.2: 1.1.1과 prev weight를 비교한다.
              // if 1.1.1: now is near to avg than prev?
                  // yes: move to next node
                  // no: groupping until prev node
          
          
      // if 1: 고립되는 노드가 생기는가? to stop
      }
      
  }
  groupedWeights.push(desc.filter(node => !node.visited).reduce((acc, cur) => acc + cur.weight, 0));
  
  answer = Math.max(...groupedWeights)
  
  return answer;
}