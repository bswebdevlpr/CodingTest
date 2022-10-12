function solution(tickets) {
    /*
    BFS
    
    CAUTION
    1. 가능한 경로가 2개 이상이면 알파벳 순서가 앞서는 경로를 return.
    */
    
    let idx = {};
    tickets.map(([from, to]) => {
        if(!idx[from]) idx[from] = [to];
        else idx[from].push(to);
    });
    // console.log(idx);
    
    function bfs(idx, answer=[], prev="ICN"){
        if(!idx[prev] || idx[prev].length === 0) {
            let entries = Object.entries(idx);
            for(let [key, val] of entries){
                if(val.length !== 0) {
                    // console.log("Invalid Return Value");
                    // console.log();
                    return [-1];
                }
            }
            
            answer.push(prev);
            // console.log("FIN: ", answer);
            // console.log();
            return [answer]
        }
        
        let results = [];
        
        answer.push(prev);
        // console.log("\nidx:", idx);
        // console.log("prev="+prev, answer);

        // 사전순 빠른거 먼저 넣는걸로 수정해야함.
        for(let i=0; i<idx[prev].length; i++){
            // console.log("i="+i, "idx[prev]="+idx[prev])
            // console.log()
            let newIdx = JSON.parse(JSON.stringify(idx));
            let head = newIdx[prev].slice(0, i);
            let rear = newIdx[prev].slice(i+1, newIdx[prev].length);
            let newPrev = newIdx[prev][i];
            newIdx[prev] = head.concat(rear);
            let newAnswer = answer.slice();
            
            results = [...results, ...bfs(newIdx, newAnswer, newPrev)];
        }
        
        return results;
    }
    let result = bfs(idx);
    // console.log(idx);
    // console.log(result);
    result = result.filter(elem => elem !== -1);
    // console.log(result);
    result = result.sort((arr2, arr1) => {
        // console.log("\n",arr2, "<=>", arr1);
        for(let i=0; i<arr2.length; i++){
            // console.log(arr2[i][0],"-", arr1[i][0]);
            // console.log(arr2[i][0].charCodeAt() - arr1[i][0].charCodeAt());
            for(let j=0; j<3; j++){
                let result = arr2[i][j].charCodeAt() - arr1[i][j].charCodeAt();
                if(result < 0) return -1;
                else if(result > 0) return 1;
            }
        }
        return 0;
    });
    // console.log(result);


    return result[0];
}


solution([["ICN", "SFO"], ["ICN", "ATL"], ["SFO", "ATL"], ["ATL", "ICN"], ["ATL","SFO"]]);