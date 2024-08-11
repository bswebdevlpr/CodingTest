// 코딩테스트 연습
// 연습문제
// N-Queen


function solution(n) {
    /*
    1  2  3  4
    5  6  7  8
    9  10 11 12
    13 14 15 16
    */
    
    var answer = 0;
    
    function pushQueen(queens, qNum){
        // console.log("\nqNum="+qNum, "queens: ", queens);
        if(qNum === n) {
            // console.log("ANSWER PLUS")
            // console.log("break\n");
            answer++;
            return;
        }
        let rearRow = queens[queens.length-1][0];
        
        let row = rearRow + 1;
        
        // 위치할 수 있는 모든 col에 대해 비교.
        for(let col=0; col<n; col++){
            // console.log("col="+col);

            // queens의 모든 queen에 대해 조건을 해당하는지 파악하고 col 위치를 옮김.
            for(let i=0; i<queens.length; i++){
                // console.log("queens "+i+"th");
                let prevRow = queens[i][0];
                let prevCol = queens[i][1];

                // 세로에 들어가는지 판단
                if(prevCol === col) {
                    // console.log("col 겹침");
                    break;
                }
                
                let diff = row - prevRow;
                if(prevCol + diff === col || prevCol - diff === col) {
                    // console.log("대각선 겹침");
                    break;
                }
                
                
                if(i === queens.length-1) {
                    let newQueens = queens.slice();
                    let newQnum = qNum + 1;
                    newQueens.push([row, col]);
                    pushQueen(newQueens, newQnum);
                }
                // console.log();
            }
            // console.log()
        }
        return;
    }
    
    for(let col=0; col<n; col++){
        pushQueen([[0, col]], 1);
    }
    
    return answer;
}