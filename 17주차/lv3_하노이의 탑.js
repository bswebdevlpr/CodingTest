function solution(n) {
    /*
    https://shoark7.github.io/programming/algorithm/tower-of-hanoi
    */
    let answer = [];
    
    function hanoi(n, start, to, via){
        if(n === 1) {
            answer.push([start, to])
            return;
        }
        
        hanoi(n-1, start, via, to);
        answer.push([start, to]);
        hanoi(n-1, via, to, start);
        return;
    }
    hanoi(n, 1, 3, 2);
    
    return answer;
}