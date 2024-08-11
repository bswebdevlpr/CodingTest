function solution(msg) {
    var answer = [];
    
    let dict = {}
    
    let idx = 1;
    for(let ascii=65; ascii<=90; ascii++){
        dict[String.fromCharCode(ascii)] = idx
        idx++
    }
    
    let head = []
    
    for(let i=0; i<msg.length; i++){
        let now = msg[i]
        if(head.length > 0){
            const key = head.join("") + now
            if(!dict[key]){
                dict[key] = idx
                idx++
                
                answer.push(dict[head.join("")])
                head.length = 0
            }
        } 
        
        head.push(now)
        
    }
    answer.push(dict[head.join("")])
    
    
    return answer;
}