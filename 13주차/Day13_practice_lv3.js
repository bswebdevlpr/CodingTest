// 코딩테스트 연습
// 깊이/너비 우선 탐색(DFS/BFS)
// 네트워크


function solution(n, computers) {
    /*
        답안참조
        
        1. 방문여부를 따지는 array 생성.
        2. 모든 컴퓨터에 대해 방문여부를 따짐.
        3. 2.가 방문되지 않은 경우 새로운 네트워크를 생성.
    */
    
    let visited = new Array(n).fill(false);
    let willVisit = [];
    
    function createNetwork(comIdx) {
        willVisit.push(comIdx);
        
        while(willVisit.length > 0){
            let nowVisit = willVisit.pop();
            visited[nowVisit] = true;
            
            for(let j=0; j<computers[0].length; j++){
                if(computers[nowVisit][j] === 1 && !visited[j]) {
                    willVisit.push(j);
                }
            }
            
            // console.log("visited: ", visited);
            // console.log("willVisit: ", willVisit);
        }
    }
    
    let networkCnt = 0;
    for(let i=0; i<n; i++){
        if(!visited[i]) {
            createNetwork(i);
            networkCnt++;
        }
    }
    
    return networkCnt;
}