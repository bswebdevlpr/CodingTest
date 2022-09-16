// 코딩테스트 연습
// 깊이/너비 우선 탐색(DFS/BFS)
// 단어 변환

function solution(begin, target, words) {
    /*
        1. 한 번에 한 개의 알파벳만 바꿀 수 있습니다.
        2. words에 있는 단어로만 변환할 수 있습니다.
    */


    let targetInWords = false;
    words.map(word => {
        if(word === target) targetInWords = true;
    })

    if(!targetInWords) return 0;

    function bfs(begin, passed=[], depth=0){ 
        /*
            1. words에서 begin과 하나만 다른 경우를 모두 queue에 push. depth++.
            2. queue의 모든 경우에 대해 words에서 하나만 다른 경우를 queue에 모두 push. depth++.
                ! 되돌아 가는 경우는 어떻게?
                    1) words에서 바뀌기 전의 경우와 본인을 제거하고 인자로 넘겨준다.
                    2) 거쳐온 word를 따로 배열에 넣고 인자로 넘겨준다. V
            3. 
        */
        if(begin === target) return [depth];
        passed.push(begin);
        
        let queue = [];
        let results = [];
        
        for(let i=0; i<words.length; i++){
            let word = words[i];
            if(passed.includes(word)) continue;
            
            let cntDiff = 0;
            
            for(let j=0; j<word.length; j++){
                if(cntDiff > 1) break;
                if(begin[j] !== word[j]){
                    cntDiff++;
                }
            }
            
            if(cntDiff === 1) queue.push(word);
        }
        
        if(queue.length === 0) return [-1];
        
        queue.map(newBegin => {
            results = results.concat(bfs(newBegin, passed, depth+1));
        });
        // console.log("begin="+begin, "passed:", passed, "depth="+depth);
        // console.log("results:", results);
        return results;
    }
    
    let bfsResults = bfs(begin);
    let answer = words.length;
    bfsResults.map(result => {
       if(result !== -1 && result < answer){
           answer = result
       } 
    });
    
    return answer;
    
}