function solution(storey) {
    var answer = 0;
    
    storey = storey.toString().split("").map(numStr => parseInt(numStr))
    
    for(let i=storey.length-1; i>0; i--){
        const num = storey[i]
        
        if(num === 10){
            storey[i-1]++
        }
        else if(num === 5){
            if(storey[i-1] >= 5){
                answer += 5
                storey[i-1]++
            } else{
                answer += 5
            }
        }
        else if(num > 5){
            answer += (10 - num)
            storey[i-1]++
        }
        else if(num < 5){
            answer += num
        }
        // console.log("i="+i, answer)
    }
    // console.log(storey)
    
    if(storey[0] === 10) answer++
    else if(storey[0] > 5) answer += (10 - storey[0] + 1)
    else answer += storey[0]
    
    return answer;
}