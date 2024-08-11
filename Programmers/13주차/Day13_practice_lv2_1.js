function solution(number, k) {
    // 코딩테스트 연습
    // 탐욕법(Greedy)
    // 큰 수 만들기
    // 답안참조

    let stack = [0];
    let deleteCnt = -1;
    
    for(let i=0; i<number.length; i++){
        while(deleteCnt < k && stack[stack.length-1] < number[i]){
            stack.pop();
            deleteCnt++;
        }
        
        if(stack.length < number.length-k)stack.push(number[i]);
        
        // console.log("i="+i, "stack: ", stack);
    }
    // console.log(stack);
    return stack.join("");
}