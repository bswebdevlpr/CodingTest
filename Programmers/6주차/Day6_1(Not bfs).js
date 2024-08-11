// 코딩테스트 연습
// 깊이/너비 우선 탐색(DFS/BFS)
// 게임 맵 최단거리
// RangeError: Maximum call stack size exceeded

function solution(maps) {
    const goal = [maps.length-1, maps[0].length-1];
    
    function Node (prev, pos) {
        this.prev = prev;
        this.pos = pos;
    };
    let start = new Node(null, [0, 0]);
    let finList = [];
    let failList = [];
    
    function createRoute(present, len){
        const xPos = present.pos[0];
        const yPos = present.pos[1];
        
        if(xPos == goal[0] && yPos == goal[1]){
            finList.push([present, len]);
            return;
        }
        
        let newNode1 = null;
        let newNode2 = null;
        let newNode3 = null;
        let newNode4 = null;
        
        // 표의 범위를 벗어나지 않으면서 길이면 tree에 할당.
        if(xPos < maps.length && maps[xPos+1][yPos] == 1){
            newNode1 = new Node(present, [xPos+1, yPos]);
            createRoute(newNode1, len + 1);
        }
        if(yPos < maps[0].length && maps[xPos][yPos+1] == 1 ){
            newNode2 = new Node(present, [xPos, yPos+1]);
            createRoute(newNode2, len + 1);
        } 
        if(xPos > 0 && maps[xPos-1][yPos] == 1){
            newNode3 = new Node(present, [xPos-1, yPos]);
            createRoute(newNode3, len + 1);
        } 
        if(yPos > 0 && maps[xPos][yPos-1] == 1){
            newNode4 = new Node(present, [xPos, yPos-1]);
            createRoute(newNode4, len + 1);
        }
        if(!(newNode1 || newNode2 || newNode3 || newNode4)){
            failList.push([present, len]);
            return;
        }
        
    }
    
    createRoute(start, 1);
    console.log("finList: ", finList);
    console.log("failList: ", failList);
    
    let answer = -1;
    return answer;
}

solution([[1, 0, 1, 1, 1], [1, 0, 1, 0, 1], [1, 0, 1, 1, 1], [1, 1, 1, 0, 1], [0, 0, 0, 0, 1]]);