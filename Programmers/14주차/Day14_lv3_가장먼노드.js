function solution(n, edge) {
    /*
    ==Pseudo Code==
    1. 1에서 n에 도달하는 최단거리를 구함. (bfs)
    2. 1.을 모든 노드에 대해 반복.
    3. 2.의 결과에서 최대값을 구함.
    4. 3.의 결과와 동일한 결과값을 카운트함.
    */
    let nodeObj = {};
    edge.map(([left, right]) => {
        if(!nodeObj[left]){
           nodeObj[left] = {
               subtrees: [right],
               depth: n
           };
        } else {
           nodeObj[left].subtrees.push(right);
        }
        
        if(!nodeObj[right]){
           nodeObj[right] = {
               subtrees: [left],
               depth: n
           };
        } else {
           nodeObj[right].subtrees.push(left);
        }
    });
    // console.log(nodeObj);
    
    /*
    ==bfs - Pseudo Code==
    1. 현재 노드가 searchNode이면 depth를 return.
    2. 지나온 노드를 현재 노드의 subtree에서 제외.
    3. subtree가 없을때까지 진행된 경우, 원하는 노드에 갈 수 없는 길이므로 -1을 return.
    4. 현재 노드에서 갈 수 있는 모든 루트에 대해 bfs를 실행.
    */
    function bfs(nowNode, searchNode, passed=[], depth=0){
        // console.log("\nNOW: "+nowNode, "depth="+depth);
        // console.log("passed: ", passed);
        if(nowNode === searchNode) {
            if(depth < nodeObj[nowNode].depth){
                nodeObj[nowNode].depth = depth;
                // console.log("New Depth="+depth);
                // console.log();
            }
            return;
        }
        
        let subtrees = nodeObj[nowNode].subtrees;
        let nonPassed = [];
        subtrees.map(subtree => {
           if(!passed.includes(subtree)) nonPassed.push(subtree);
        });
        if(nonPassed.length === 0){
            // console.log("Reached LeafNode");
            // console.log();
            return;
        }
        
        nonPassed.map(subtree => {
            let newPassed = passed.slice();
            let newDepth = depth + 1;
            newPassed.push(subtree);
            // console.log("TO: "+subtree);
            return bfs(subtree, searchNode, newPassed, newDepth);
        });
    }
    
    
    for(let i=2; i<=n; i++){
        // console.log("Start to search Node "+i);
        bfs(1, i);
    }
    // console.log(nodeObj);
    
    
    let maxDepth = 0;
    for(let i=2; i<=n; i++){
        let nowDepth = nodeObj[i].depth;
        if(maxDepth < nowDepth) maxDepth = nowDepth;
    }
    // console.log(maxDepth);
    
    var answer = 0;
    for(let i=2; i<=n; i++){
        let nowDepth = nodeObj[i].depth;
        if(nowDepth === maxDepth) answer++;
    }
    
    return answer;
}

solution(6, [[3, 6], [4, 3], [3, 2], [1, 3], [1, 2], [2, 4], [5, 2]]);