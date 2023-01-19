function solution(n) {
    let answer = ""
    
    function make_124(quot){
        const rem = quot % 3 === 0 ? 4 : quot % 3
        answer = rem + answer
        if(quot <= 3) return
        
        let new_quot = quot % 3 === 0 ? quot/3 - 1 : Math.floor(quot/3)
        return make_124(new_quot)
    }
    make_124(n)
    
    return answer;
}