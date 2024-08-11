function solution(price, money, count) {
    let answer = 0
    
    for(let i=1; i<=count; i++){
        money -= price*i
    }
    if(money < 0) answer = Math.abs(money)
    
    return answer;
}