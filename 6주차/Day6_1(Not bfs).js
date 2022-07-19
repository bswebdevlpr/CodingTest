// 코딩테스트 연습
// 깊이/너비 우선 탐색(DFS/BFS)
// 게임 맵 최단거리

function solution(maps) {

    const goal = [maps.length-1, maps[0].length-1];
    
    let answerArr = [];
    
    
    let i = 0;
    
    function findRoute(prev, xPos, yPos, amount, history){
        if(xPos == goal[0] && yPos == goal[1]){
            answerArr.push(amount+1);
            // console.log("정답: ");
            // for(let elem of history){
            //     console.log(elem, "=>");
            // }
            // console.log("카운트="+amount);
            return;
        }
        // history.push([xPos, yPos]);
        // console.log("prev="+prev, [xPos, yPos], "=>");
        
        // 표 범위를 벗어나지 않고, 길이며, 이전 위치가 아니라면 이동
        if(xPos < maps.length && maps[xPos+1][yPos] == 1 && !(xPos+1 == prev[0] && yPos == prev[1])){
            prev = [xPos, yPos];
            findRoute(prev, xPos+1, yPos, amount+1, history);
        } 
        if(yPos < maps[0].length && maps[xPos][yPos+1] == 1 && !(xPos == prev[0] && yPos+1 == prev[1])){
            prev = [xPos, yPos];
            findRoute(prev, xPos, yPos+1, amount+1, history);
        } 
        if(xPos > 0 && maps[xPos-1][yPos] == 1 && !(xPos-1 == prev[0] && yPos == prev[1])){
            prev = [xPos, yPos];
            findRoute(prev, xPos-1, yPos, amount+1, history);
        } 
        if(yPos > 0 && maps[xPos][yPos-1] == 1 && !(xPos == prev[0] && yPos-1 == prev[1])){
            prev = [xPos, yPos];
            findRoute(prev, xPos, yPos-1, amount+1, history);
        }
        console.log("막힘!", history);
        return;
    }
    
    findRoute([-1, -1], 0, 0, 0, []);
    console.log(answerArr);
    
    return answer = 0;
}

solution([[1, 0, 1, 1, 1], [1, 0, 1, 0, 1], [1, 0, 1, 1, 1], [1, 1, 1, 0, 1], [0, 0, 0, 0, 1]]);