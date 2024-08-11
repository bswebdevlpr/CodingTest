
// 코딩테스트 연습
// 2022 KAKAO BLIND RECRUITMENT
// 파괴되지 않은 건물

// 누적합 문제, 재밌었음


function solution(board, skills) {
    /*
    1. 내구도 0 이하가 되면 파괴
    2. 내구도가 0 이하가 되어도 공격을 받으면 계속 내구도가 깎임
    
    
    skill[0]: type - 1(적 공격), - 2(아군 회복)
    skill[1], skill[2]: left up
    skill[3], skill[4]: right down
    skill[5]: degree
    */
    
    let matrix = new Array(board.length).fill(0).map(row => new Array(board[0].length).fill(0));
    
    for (let skill of skills){
        if(skill[0] == 1) skill[5] = -skill[5];
        
        // 왼쪽 위 설정
        matrix[skill[1]][skill[2]] += skill[5];
        
        let maxCol = skill[4]+1 > matrix[0].length - 1 ? -1 : skill[4]+1;
        let maxRow = skill[3]+1 > matrix.length - 1 ? -1 : skill[3]+1;
        
        if(maxCol != -1)
            matrix[skill[1]][maxCol] += -skill[5];
        if(maxRow != -1)
            matrix[maxRow][skill[2]] += -skill[5];
        if(maxCol != -1 && maxRow != -1)
            matrix[maxRow][maxCol] += skill[5];
    }
    // console.log("누적합: ", matrix)
    
    for(let i=0; i<matrix.length; i++){
            for(let j=1; j<matrix[0].length; j++){
                matrix[i][j] += matrix[i][j-1];
            }
        }
    // console.log("누적합 1차 - 행 방향:", matrix);

    for(let j=0; j<matrix[0].length; j++){
        for(let i=1; i<matrix.length; i++){
            matrix[i][j] += matrix[i-1][j];
        }
    }
    // console.log("누적합 2차 - 열 방향:", matrix);
    
    
    for(let i=0; i<board.length; i++){
        for(let j=0; j<board[0].length; j++){
            board[i][j] += matrix[i][j];
        }
    }
    
    // console.log("누적합 더한 결과: ", board);
    
    let answer = 0;
    for(let row of board){
        for(let elem of row){
            if(elem > 0) answer++;
        }
    }
    
    return answer;
}