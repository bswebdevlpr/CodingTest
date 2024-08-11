function solution(n, works) {
    /*
    최대한 모든수를 근사하게 맞춰야함.
    */
    var answer = 0;
    
    works = works.sort((a, b) => b - a);
    
    for(let i=0; i<n; i++){
        if(works[0] === 0) break;
        for(let j=0; j<works.length; j++){
            if(works[j] <= works[j+1] && j !== works.length-1) continue;
            else {
                works[j]--;
                break;
            }
        }
        // console.log(works);
    }
    
    works.map(left => {answer += Math.pow(left, 2)})
    // console.log(answer);
    
    return answer;
}