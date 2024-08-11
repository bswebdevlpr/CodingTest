function solution(toppings) {
    /*
    GOAL - 토핑이 골고루 나올 수 있는 모든 경우의 수를 구하라.
    
    PSUEDO CODE
    for 토핑 in 모든 토핑
        if 토핑 많아지는 순간: 그만 카운트
        if 남은토핑 개수가 같아지는 순간: 카운트 시작
        if 전체 토핑 개수에서 현재 토핑이 이전에 중복되지 않으면: 
            전체 토핑 개수--
            현재 토핑개수++
        
    */
    var answer = 0;
    const dict = {}
    let sort_of_toppings = 0
    toppings.map(topping => {
        if(!dict[topping]) {
            dict[topping] = 1
            sort_of_toppings++
        }
        else dict[topping]++
    })
    // console.log(dict)
    
    const cut = {}
    let cut_toppings = 0
    for(let topping of toppings){
        if(!cut[topping]) {
            cut_toppings++
            cut[topping] = 1
        } else {
            cut[topping]++
        }
        dict[topping]--
        
        if(dict[topping] === 0){
            sort_of_toppings--
        }
        
        if(cut_toppings > sort_of_toppings) break
        else if(cut_toppings === sort_of_toppings) answer++
    }
    
    
    return answer;
}