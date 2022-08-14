// 코딩테스트 연습
// 스택/큐
// 프린터


function solution(priorities, location) {
    let order = 0;
    let isBigger = false;
    
    let i=0;
    while(priorities.length > 0){
        let first = priorities.shift();
        
        for(let i=0; i<priorities.length; i++){
            if(priorities[i] > first){
                isBigger = true;
                break;
            }
        }
        
        // console.log(first, isBigger);
        
        if(isBigger){
            priorities.push(first);
            if(location == 0) location = priorities.length-1;
            else location--;
        } else{
            if(location == 0){
                order++;
                break;
            } else{
                location--;
                order++;
            }
        }
        isBigger = false;
        // console.log(priorities, location);
    }
    
    var answer = order;
    return answer;
}