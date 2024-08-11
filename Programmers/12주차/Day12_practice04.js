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


    // 풀 수 없는 도달최고근접 문제 탐색.
    /*
        요구능력 도달이 가장 빠른 문제 탐색
        1. 요구능력 - 현재능력 값이 최소값인 문제를 선택.
    */
    function findClosestIDx(){
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
        
        return closestIdx;
    }


    // 풀 수 있는 최대효율 문제 탐색.
    /*
        최대효율 탐색
        1. alp_req와 cop_req 중 현재 능력과 더 차이가 많이 나는쪽 탐색.
        2. cost 1당 더 차이가 적게 나는 쪽의 rwd가 큰 문제를 선택.
    */
    function findBestSolvable(closestIdx){
        let bestSolvableIdx;  // solvable

        if(solvable.length === 0) {console.log("No solvable"); bestSolvableIdx = -1;}
        else if(solvable.length === 1) {
            bestSolvableIdx = -1;

            let moreDiff;
            let alpDiff = unsolvable[closestIdx].alp_req - alp;
            let copDiff = unsolvable[closestIdx].cop_req - cop;
            let biggestRwdGainRate = 1;
            // alp, cop 모두 차이가 0인 경우는 없다고 가정.
            if(alpDiff === 0 || alpDiff > copDiff){
                moreDiff = "cop";
            } else if(copDiff === 0 || copDiff > alpDiff){
                moreDiff = "alp";
            }

            if(moreDiff === "alp"){
                /*
                    1. cop 능력치가 다 채워졌거나, alp가 더 빨리 도달할 수 있거나.
                    2. 1씩 채우는 것과 문제 푸는걸 비교하고 더 많이 리워드 주는걸 선택.
                */
                let localRwdGainRate = solvable[0].alp_rwd / solvable[0].cost;
                if(biggestRwdGainRate < localRwdGainRate){
                    biggestRwdGainRate = localRwdGainRate;
                    bestSolvableIdx = 0;
                }

            } else if(moreDiff === "cop"){
                let localRwdGainRate = solvable[0].cop_rwd / solvable[0].cost;
                if(biggestRwdGainRate < localRwdGainRate){
                    biggestRwdGainRate = localRwdGainRate;
                    bestSolvableIdx = 0;
                }
            } else {
                console.log("Error: wrong moreDiff");
                return "ERROR";
            }
        }
        else {
            let moreDiff;
            let alpDiff = unsolvable[closestIdx].alp_req - alp;
            let copDiff = unsolvable[closestIdx].cop_req - cop;
            if(alpDiff === 0 || alpDiff > copDiff){
                moreDiff = "cop";
            } else if(copDiff === 0 || copDiff > alpDiff){
                moreDiff = "alp";
            }
            let biggestRwdGainRate = 1;
            
            for(let i=0; i<solvable.length; i++){
                if(moreDiff === "alp"){
                    let loopRwdGainRate = solvable[i].alp_rwd / solvable[i].cost;
                    if(biggestRwdGainRate < loopRwdGainRate){
                        biggestRwdGainRate = loopRwdGainRate;
                        bestSolvableIdx = i;
                    }
                } else if(moreDiff === "cop") {
                    let loopRwdGainRate = solvable[i].cop_rwd / solvable[i].cost;
                    if(biggestRwdGainRate < loopRwdGainRate){
                        biggestRwdGainRate = loopRwdGainRate;
                        bestSolvableIdx = i;
                    }
                } else {
                    console.log("Error: Wrong moreDiff");
                    return "Error";
                }
            }
            
            if(biggestRwdGainRate === 1) bestSolvableIdx = -1;
            console.log("biggestRwdGainRate="+biggestRwdGainRate, "bestSolvableIdx="+bestSolvableIdx);
        }

        return bestSolvableIdx;
    }
        


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
    console.log("solvable: ", solvable);
    console.log("unsolvable: ", unsolvable);

    let closestIdx = findClosestIDx();
    let bestSolvableIdx = findBestSolvable(closestIdx);
    console.log();
    
    let nowSolve, willSolve;
    let time = 0;
    while(true){
        // 문제풀기   
        if(time === 3) break;
        console.log("time="+time);

        nowSolve = solvable[bestSolvableIdx];
        willSolve = unsolvable[closestIdx];

        if(alp >= max_alp && cop >= max_cop){
            console.log("total cost: "+cost);
            console.log("max_alp="+max_alp, "max_cop="+max_cop);
            console.log("alp="+alp, "cop="+cop);
            break;
        }
        console.log("max_alp="+max_alp, "max_cop="+max_cop);
        console.log("Before solve: ", "alp="+alp, "cop="+cop, "cost="+cost);
        console.log();
        console.log("풀 문제:", "alp_req="+willSolve.alp_req, "cop_req="+willSolve.cop_req, "alp_rwd="+willSolve.alp_rwd, "cop_rwd="+willSolve.cop_rwd, "cost="+willSolve.cost);
        if(bestSolvableIdx === -1){
            console.log("풀고있는 문제: X");
            let moreDiff = willSolve.alp_req < willSolve.cop_req ? "alp" : "cop";
            if(alpDiff === 0 || alpDiff > copDiff){
                moreDiff = "cop";
            } else if(copDiff === 0 || copDiff > alpDiff){
                moreDiff = "alp";
            }

            if(moreDiff === "alp"){
                while(alp < willSolve.alp_req){
                    alp++;
                    cost++;
                }
            } else {
                while(cop < willSolve.cop_req){
                    cop++;
                    cost++;      
                }
            }

        } else{
            console.log("풀고있는 문제:", "alp_rwd="+nowSolve.alp_rwd, "cop_req="+nowSolve.cop_rwd, "cost="+nowSolve.cost);
            
            while(alp < willSolve.alp_req && cop < willSolve.cop_req){
                alp += nowSolve.alp_rwd;
                cop += nowSolve.cop_rwd;
                cost += nowSolve.cost;

                /*
                1. 1만큼 채우는게 cost적으로 효율인 경우를 어떻게 파악하지?
                2. 다음 문제의 더 빨리 만족할 수 있는 능력을 달성하고 나머지를 1씩 채우는게 낫는지 파악
                */
            }
        }
        console.log("After solve: ", "alp="+alp, "cop="+cop, "cost="+cost);
        console.log("\n");
        
        // 풀고있는 - 풀수있게된 문제 효율비교.
        /*
            1. 풀수없는 문제 array에서 풀수있게된 문제를 제거하고 풀수있는 문제 array에 할당.
            2. 새로운 최고근접문제를 찾고 closestIdx에 할당.
            3. 지금 푸는 문제와 풀수있게된 문제의 효율을 비교.
                1.1) 풀수있게된 문제가 효율이 더 좋으면 지금 푸는문제와 교환, 아니면 유지.
                1.2) 지금 푸는문제와 1씩 올리는 것의 효율을 비교하고 교환 혹은 유지.
        */

        if(alp < willSolve.alp_req && cop < willSolve.cop_req){
            solvable.push(willSolve);
            let head = unsolvable.slice(0, closestIdx);
            let rear = unsolvable.slice(closestIdx+1, unsolvable.length);
            unsolvable = head.concat(rear);

            closestIdx = findClosestIDx();
        }

        bestSolvableIdx = findBestSolvable(closestIdx);

        time++;
    } 
        
    
    var answer = 0;
    return answer;
}

solution(0, 0, [[0,0,2,1,2],[4,5,3,1,2],[4,11,4,0,2],[10,4,0,4,2]]);