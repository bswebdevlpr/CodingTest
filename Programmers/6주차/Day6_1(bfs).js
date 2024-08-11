// 코딩테스트 연습
// 깊이/너비 우선 탐색(DFS/BFS)
// 게임 맵 최단거리


function solution(maps) {
    const goal = [maps.length-1, maps[0].length-1];
    
    function Node(pos, depth){
        this.pos = pos;
        this.depth = depth;
    }
    const start = new Node([0, 0], 1);
    maps[0][0] = 0;
    
    let needVisit = [start];
    const vx = [1, 0, -1, 0];
    const vy = [0, 1, 0, -1];
    
    let answerNode = null;
    
    while(needVisit.length > 0){
        const present = needVisit.shift();
        const xPos = present.pos[0];
        const yPos = present.pos[1];
        
        if(xPos == goal[0] && yPos == goal[1]){
            answerNode = present;
            break;
        }
        
        for(let i=0; i<4; i++){
            const cx = xPos + vx[i];
            const cy = yPos + vy[i];
            if(cx<0 || cy<0 || cx > goal[0] || cy > goal[1]) continue;
            if(maps[cx][cy] ==1){
                needVisit.push(new Node([cx, cy], present.depth+1));
                maps[cx][cy] = 0;
            }
            
        }
   }
    
    let answer = answerNode == null ? -1 : answerNode.depth;
    return answer;
}


solution([[1, 0, 1, 1, 1], [1, 0, 1, 0, 1], [1, 0, 1, 1, 1], [1, 1, 1, 0, 1], [0, 0, 0, 0, 1]]);