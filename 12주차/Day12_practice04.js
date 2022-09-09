// 코딩테스트 연습
// 2022 KAKAO TECH INTERNSHIP
// 코딩 테스트 공부

function solution(alp, cop, problems) {
    /*
        1. alp - 알고력, cop - 코딩력
        2. 알고력과 코딩력을 1 높이는데 1 시간이 필요함.
        3. 각 문제당 올라가는 alp, cop가 정해져있음.
        4. 문제를 푸는데 걸리는 시간이 정해져있고, 여러번 풀 수 있음.
        => 모든 문제를 풀 수 있는 알고력과 코딩력을 얻는 최단시간을 구해라.
        
        ==Pseudo Code==
        1. 모든 문제를 풀 수 있을 능력 max_alp, max_cop을 설정.
        2. 모든 문제를 순차적으로 검색.
            2.1) 풀 수 있으면 풀 수 있는 문제에 현재 문제를 저장.
            2.2) 없으면 max_alp, max_cop을 최대능력으로 설정하고, 풀 수 없는 문제에 저장하고, 다음 문제로 이동.
            2.3) 모든 문제를 검색했다면
                2.3.1) 풀 수 있는 문제 중 시간대비 능력상승 효율이 가장 높은 문제를 탐색.
                    2.3.1.1) 풀 수 있는 문제가 없다면 2.3.2로 이동.
                2.3.2) 풀 수 없는 문제 중 가장 빠르게 해당 요구 능력치에 도달하는 문제를 탐색.
                2.3.3) 2.3.1)의 문제를 반복 해결하여 능력상승.
                2.3.4) 2.3.2)의 문제의 요구 능력치에 도달하면 
                        2.3.4.1) 풀 수 있게된 문제와 풀고있는 문제의 효율을 비교.
                            2.3.4.1.1) 풀 수 있게된 문제가 효율적이면 푸는 문제를 변경.
                            2.3.4.1.2) 아니면 2.3.2로 돌아감.
        3. 2.를 현재 능력치가 최대 능력치와 같아질 때까지 반복.
    */
    
    let max_alp = 0, max_cop = 0;
    let cost = 0;
    let solvable = [], unsolvable = [];
    
    problems.map(([alp_req, cop_req, alp_rwd, cop_rwd, cost]) => {
        let problem = {
            alp_req: alp_req,
            cop_req: cop_req,
            alp_rwd: alp_rwd,
            cop_rwd: cop_rwd,
            cost: cost,
            rwdPerCost: Math.round((alp_rwd + cop_rwd) / 2)
        };
        
        if(alp >= alp_req && cop >= cop_req){
            solvable.push(problem);
        } else {
            if(max_alp < alp_req) max_alp = alp_req;
            if(max_cop < cop_req) max_cop = cop_req;
            
            unsolvable.push(problem);
        }
    });
    
    let test = 0;
    while(true){
        if(alp >= max_alp && cop >= max_cop) break;
        if(test == 10) break;
        test++;
        
        // 풀 수 없는 도달최고근접 문제 탐색.
        /*
            요구능력 도달이 가장 빠른 문제 탐색
            1. 요구능력 - 현재능력 값이 최소값인 문제를 선택.
        */
        let closestIdx = 0;  // unsolvable
        let nowAvgDiff = Math.round(((unsolvable[closestIdx].alp_req - alp) + (unsolvable[closestIdx].cop_req - cop)) / 2);
        
        for(let i=1; i<unsolvable.length; i++){
            let loopAlpDiff = unsolvable[i].alp_req - alp;
            let loopCopDiff = unsolvable[i].cop_req - cop;
            let loopAvgDiff = Math.round((loopAlpDiff + loopCopDiff) / 2);
            
            // console.log("i="+i);
            // console.log("closest: ", solvable[closestIdx], "nowAvgDiff="+nowAvgDiff);
            // console.log("loop: ", unsolvable[i], "loopAvgDiff="+loopAvgDiff);
            // console.log();
            
            if(nowAvgDiff > loopAvgDiff){
                closestIdx = i;
                nowAvgDiff = loopAvgDiff;
            }
        }
        
        // 풀 수 있는 최대효율 문제 탐색.
        /*
            최대효율 탐색
            1. alp_req와 cop_req 중 현재 능력과 더 차이가 많이 나는쪽 탐색.
            2. cost 1당 더 차이가 많이 나는 쪽의 rwd가 큰 문제를 선택.
        */
        let bestSolvableIdx;  // solvable
        if(solvable.length === 0) {console.log("No solvable"); bestSolvableIdx = -1;}
        else if(solvable.length === 1) bestSolvableIdx = 0;
        else {
            let moreDiff;
            solvable[closestIdx].alp_req > solvable[closestIdx].cop_req ? moreDiff = "alp" : moreDiff = "cop";
            let biggestRwdGainRate = 0;
            
            for(let i=0; i<solvable.length; i++){
                if(moreDiff === "alp"){
                    let loopRwdGainRate = Math.round(solvable[i].alp_rwd / solvable[i].cost);
                    if(biggestRwdGainRate < loopRwdGainRate){
                        biggestRwdGainRate = loopRwdGainRate;
                        bestSolvableIdx = i;
                    }
                } else if(moreDiff === "cop") {
                    let loopRwdGainRate = Math.round(solvable[i].cop_rwd / solvable[i].cost);
                    if(biggestRwdGainRate < loopRwdGainRate){
                        biggestRwdGainRate = loopRwdGainRate;
                        bestSolvableIdx = i;
                    }
                } else {
                    console.log("Error: Wrong moreDiff");
                    return -1;
                }
            }
        }
        console.log("최고근접문제:", unsolvable[closestIdx]);
        console.log("최고효율문제:", solvable[bestSolvableIdx]);
        console.log();
        
        
        // 문제풀기
        
        
        // 풀수있는 - 풀수없는 문제 효율비교.
    }
    
    console.log(solvable, unsolvable);
    
    var answer = 0;
    return answer;
}