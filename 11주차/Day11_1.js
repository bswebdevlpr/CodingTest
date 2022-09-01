// 코딩테스트 연습
// 완전탐색
// 소수 찾기

function solution(numbers) {
    /*
        Pseudo Code
        1. 만들 수 있는 모든 경우의 수 만들기.
        2. 만들어진 수가 소수인지 확인.
    */
    
    var answer = 0;
    
    /*
        1. return 시 본인을 cases에 추가.
        2. 본인을 call한 문자열에 붙여서 cases에 추가.
    */
    function findAllCases(numStr){
        if(numStr.length === 1){
            console.log("numStr="+numStr);
            return [numStr];
        } else if(numStr.length === 0){
            return ["ERROR"];
        }
        
        let cases = [];
        
        for(let i=0; i<numStr.length; i++){
            let head, rear;
            head = numStr.substring(0, i);
            rear = numStr.substring(i+1, numStr.length);
            let restStr = head + rear;
            
            let childNode = findAllCases(restStr);
            cases = [...cases, ...childNode];
            for(let elem of childNode){
                cases.push(numStr[i] + elem);
            }
            // console.log("numStr="+numStr, "numStr[i]="+numStr[i], "cases: "+cases);
        }
        return cases;
    }
    let cases = findAllCases(numbers);
    // console.log(cases);
    
    cases = cases.map(numStr => parseInt(numStr));
    
    function deduplicate(cases){
        let tempArr = [];
        
        for(let elem of cases){
            let isBeing = tempArr.find(innerElem => innerElem === elem);
            if(isBeing === undefined) tempArr.push(elem);
        }
        return tempArr;
    }
    cases = deduplicate(cases);
    // console.log(cases);
    
    function isPrime(num){
        if(num < 2){
            return false;
        }
        // console.log(num);
        for(let i=2; i<=Math.sqrt(num); i++){
            if(num % i === 0) return false;
        }
        return true;
    }
    let cnt = 0;
    cases.map(num => {
        if(isPrime(num)) cnt++;
    })
    
    return cnt;
}