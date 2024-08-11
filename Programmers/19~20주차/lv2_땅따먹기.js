function solution(land) {
    /*
    민수도움
    
    ==Rules==
    1. 같은 열을 연속으로 밟을 수 없다.
    2. 마지막 행에 내려왔을 때 최대 점수를 만들어라.
    */
    let max = -1;
    
    for(let i=1; i<land.length; i++){
        for(let col=0; col<4; col++){
            let prevMax = -1;
            
            for(let prevCol=0; prevCol<4; prevCol++){
                if(prevCol === col) continue;
                if(prevMax < land[i-1][prevCol]) prevMax = land[i-1][prevCol];
            }
            
            land[i][col] += prevMax;
        }
        // console.log(land[i]);
    }

    for(let i=0; i<4; i++){
        if(max < land[land.length-1][i]) max = land[land.length-1][i];
    }
    
    return max;
}