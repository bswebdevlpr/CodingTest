function solution(n, s) {
    var answer = [];
    
    let cases = [];
    
    /*
    Pseudo Code
    1. 합이 s가 되는 모든 경우의 수 구함. 조합.
    */
    
    /*
    1. 스택에 각각의 시작 수를 넣음. 재귀.
    2. 이전 수를 제외한 수 중 넣을 수 있는(합이 s보다 작은) 경우에 넣고 아니면 return.
    3. 합이 s인 경우만 배열 return. 아니면 우짜노?
    */
    function findComb(stack=[], cnt=0, prev=0){
        // console.log("cnt="+cnt, "stack:", stack);
        let sum = 0;
        stack.map(num => sum += num);
        let cases = [];
        
        for(let i=prev; i<s; i++){
            // console.log("i="+i);
            let newSum = sum + i;
            let newCnt = cnt + 1;
            // console.log("newSum="+newSum, "newCnt="+newCnt);
            
            if(newCnt === n && newSum === s) {
                stack.push(i);
                // console.log(stack, "case 추가");
                // console.log()
                return [stack];
            }
            if(newSum > s || newCnt > n) {
                // console.log(stack, "case 해당X");
                // console.log()
                let result = cases.length ? cases : -1;
                return result;
            }
            
            let newStack = stack.slice();
            newStack.push(i);
            let result = findComb(newStack, newCnt, i);
            if(result !== -1 && result.length > 0) cases = [...cases, ...result]; 
            // cases = [...cases, ...findComb(newStack, newCnt, i)];
            // console.log("prev="+prev, cases);
            // console.log();
        }
        return cases;
    }
    cases = findComb();
    // console.log(cases);
    if(cases.length === 0) return [-1];

    let mulMax = 1;
    let mulArray;
    cases.map(c => {
        let tempMul = 1;
        c.map(num => tempMul *= num);
        if(mulMax < tempMul){
            mulMax = tempMul;
            mulArray = c.slice();
        }
    })
    answer = mulArray;
    // console.log(answer);
    
    return answer;
}
solution(3, 9);