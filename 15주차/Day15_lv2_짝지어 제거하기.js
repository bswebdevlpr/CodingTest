function solution(s){
    let stack = [];
    let answer = 0;
    
    for(let i=0; i<s.length; i++){
        stack.push(s[i]);
        // console.log("i="+i, stack);
        
        let stackLen = stack.length;
        if(stackLen > 1){
            if(stack[stackLen-2] === stack[stackLen-1]){
                stack.pop();
                stack.pop();
            }
        }
    }
    // console.log(stack);
    
    if(stack.length === 0) answer = 1;
    
    return answer;
}