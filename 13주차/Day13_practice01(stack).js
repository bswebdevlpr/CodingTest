// 코딩테스트 연습
// 탐욕법(Greedy)
// 큰 수 만들기


function solution(number, k) {
    /*
        ==Pseudo Code==
        1. number를 k+1까지 자름.
        2. k+1까지 중 최대값이 시작되는 부분부터 뒷부분이랑 이어붙임.
    */
    
    let stack = [0];
    let nowIdx = 0;
    let resultStr;
    let i=0;
    while(true){
        if(i===10) break;
        
        let stackNums = stack.length;
        let leftNums = number.length - nowIdx;
        if(stackNums === number.length-k){
            resultStr = stack.join("").slice();
        }
        if(stackNums + leftNums === number.length - k){
            let stackStr = stack.join("");
            let leftStr = number.slice(nowIdx, number.length);
            let newStr = stackStr.concat(leftStr)
            resultStr = newStr.slice();
            break;
        }
        if(stack[stack.length-1] < number[nowIdx]){
            stack.pop();
            stack.push(number[nowIdx]);
            nowIdx++;
        } else if(number[nowIdx] > number[nowIdx+1]){
            stack.push(number[nowIdx]);
            nowIdx++;
        } else{
            nowIdx++;
        }
        // console.log("stack: ", stack);
        // console.log("nowIdx="+nowIdx, "nowIdx~number.length: ", number.slice(nowIdx, number.length));
        i++;
    }
    // console.log("resultStr: ", resultStr);
    
    return resultStr;
}