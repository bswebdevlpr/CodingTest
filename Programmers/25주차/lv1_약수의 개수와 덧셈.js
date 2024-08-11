function solution(left, right) {
    var answer = 0;
    
    for(left; left<=right; left++){
        let cnt = 0
        for(let i=1; i<=Math.ceil(left/2); i++){
            if(left % i === 0) {
                i*i === left ? cnt++ : cnt+=2
            }
        }
        
        if(cnt % 2 === 0) answer += left
        else answer -= left
    }
    
    return answer;
}