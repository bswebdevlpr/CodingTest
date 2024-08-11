function solution(n, s) {
    var answer = [];
    
    let quot = Math.floor(s / n);
    let rem = s % n;
    
    if(quot === 0) return [-1];
    
    for(let i=0; i<n-rem; i++) answer.push(quot);
    for(let i=0; i<rem; i++) answer.push(quot+1);
    
    
    return answer;
}