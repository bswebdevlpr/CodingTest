function solution(s) {
    var answer = false;
    
    if (s.length === 4 || s.length === 6) answer = true
    
    if(answer)
        for(let i=0; i<s.length; i++){
            const c = s[i].charCodeAt()
            if(c < 48 || c > 57) {
                answer = false
                break
            }
        }
    
    return answer;
}