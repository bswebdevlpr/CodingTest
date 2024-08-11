// 코딩테스트 연습
// 2021 카카오 채용연계형 인턴십
// 거리두기 확인하기


function solution(places) {
    
    // 맨해튼거리 |r1 - r2| + |c1 - c2|
    
    // 모든 응시자에 대해 다른 응시자들과의 거리두기를 하고 있는지 계산
    // 맨해튼 거리 내의 모든 요소들에 대해 파티션으로 나뉘어져 있지 않은 응시자가 있는지 계산
    // 맨해튼거리 => 본인을 둘러싸는 요소들 + 상하좌우로 한칸씩 더
    var answer = [];
    
    // input point에 대하여 맨해튼 거리 내의 응시자들과 거리두기를 지키고 있는지 파악 후 0 또는 1을 반환.
    function findMHDist(matrix, centerPos){
        let inDist = [];
        
        // 각 모든 응시자에 대하여 맨해튼 거리 내에 응시자가 있는지 구하기 (본인보다 행이 작은 응시자에 대해서는 X)
        for(let i=centerPos[0]; i<matrix.length; i++){
            for(let j=0; j<matrix[0].length; j++){
                if(i == centerPos[0] && j == centerPos[1]) continue;
                
                // 요소가 P일 때 맨해튼 거리에 들어간다면
                if(matrix[i][j] == 'P'){
                    let mhDist = Math.abs(centerPos[0] - i) + Math.abs(centerPos[1] - j);
                    // console.log("in 맨해튼거리: ", i, j);
                    if(mhDist <= 2){
                        if(mhDist == 1) return 0; // 거리가 1이면 바로 옆에 앉아 있으므로 바로 0 return.
                        
                        inDist.push([i, j]);
                    }
                }
            }
        }
        
        // MHDist 내의 응시자와의 관계
        /*
        1. 같은 행 또는 열에 존재하는 경우: 그 사이에 X가 존재하는지 파악
        2. 대각선인 경우: center와 해당 응시자와의 네모박스의 나머지 요소가 전부 X인지 파악
        */
        let result = 1;
        
        for(let [xPos, yPos] of inDist){
            // console.log(xPos, yPos,"는 ");
            // 같은 행에 위치한 경우
            if(xPos == centerPos[0]){
                // console.log("같은 행에 위치");
                if(yPos > centerPos[1]){
                    if(matrix[xPos][yPos-1] != 'X') result = 0;
                } else{
                    if(matrix[xPos][yPos+1] != 'X') result = 0;
                }
            } 
            
            // 같은 열에 위치한 경우
            else if(yPos == centerPos[1]){
                // console.log("같은 열에 위치");
                if(matrix[xPos-1][yPos] != 'X') result = 0;
            }
            
            // 대각선에 위치한 경우
            else{
                // console.log("대각선에 위치");
                let leftUp = [xPos<centerPos[0] ? xPos:centerPos[0], yPos<centerPos[1] ? yPos:centerPos[1]];
                let rightDown = [xPos>centerPos[0] ? xPos:centerPos[0], yPos>centerPos[1] ? yPos:centerPos[1]];
                // console.log("leftUp="+leftUp, "rightDown="+rightDown);
                for(let i=leftUp[0]; i<=rightDown[0]; i++){
                    for(let j=leftUp[1]; j<=rightDown[1]; j++){
                        if((i==xPos && j==yPos) || (i==centerPos[0] && j==centerPos[1])) continue;
                        if(matrix[i][j] != 'X') {
                            result = 0;
                        }
                    }
                }
            }
            if(result == 0) return result;
        }
        
        return result;
    }
    
    answer = places.map((matrix) => {
        // console.log("MATRIX: ", matrix);
        let result = 1;
        
        /*
        == 맨해튼 거리 이내일 때 거리두기 허용되지 않는 경우 ==
        - 상하좌우로 파티션 구분이 되어있지 않을 때
        
        == 이외 ==
        - 응시자가 없는 경우
        */
        
        for(let i=0; i<matrix.length; i++){
            for(let j=0; j<matrix[0].length; j++){
                if(matrix[i][j] == 'P'){
                    // console.log("응시자 : ", i, j);
                    result = findMHDist(matrix, [i, j]);
                    if(result == 0) return result;
                    // console.log(result);
                }
            }
        }
        return result;
    });
    
    return answer;
}