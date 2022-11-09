// 시간초과
function solution(A, B) {
    /*
        RULES
        1. 모든 사원은 자연수 하나를 부여받음.
        2. 각 사원은 딱 한번 경기를 진행.
        3. 각 경기당 각팀에서 한명씩 나와 서로의 수를 공개하고, 숫자가 큰 쪽이 1점을 얻음.
        4. 숫자가 같으면 점수 X.
        
        GOAL: B팀이 A팀의 엔트리를 보고 얻을 수 있는 최고 승점을 구해라.
            => 이기는 경우가 가장 많은 경우의 수를 구해라.
           
        IDEAS
        1. 어떻게 해야 가장 많이 이길 수 있을까...
        2. 1차 시도 dfs
           
        PSUEDO CODE 
        1. 
    */
    
    var answer = -1;
    
    function dfs(left, entry=[], cnt=0){
        // console.log("cnt="+cnt, "entry:", entry)
        if(left.length === 0) {
            return [cnt];
            // return [entry];
        }
            
        let result = [];
        
        // 남은 원소를 돌며 동일한 순서의 A 원소보다 큰 경우에 재귀.
        for(let i=0; i<left.length; i++){
            if(left[i] < A[entry.length]) {
                // result = [...result, [...entry, left[i]]];
                result = [...result, cnt];
                continue;
            }
            
            let newLeft = [];
            let newEntry = [...entry];
            for(let j=0; j<left.length; j++){
                if(j === i) newEntry.push(left[j]);
                else newLeft.push(left[j]);
            }
            let newCnt = cnt + 1;
            
            result = [...result, ...dfs(newLeft, newEntry, newCnt)];
        }
        
        return result;
    }
    
    let result = dfs(B);
    // console.log(result);
    
    let max = -1;
    result.map(num => {if(max < num) max = num});
    
    return max;
}