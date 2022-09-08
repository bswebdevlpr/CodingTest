function solution(operations) {
    /*
        이중 우선순위 큐 구현
        ==Pseudo Code==
        1. 빈 객체 root 생성.
        2. I, D에 맞춰 Linked List로 queue 만듦.
        
        1. 내 방식대로 해보기
            1) array로 해보기
            2) Linked List로 해보기
        2. heap으로 구현해보기
    */
    
    let queue = [];  // default
    
    operations.map(oper => {
        oper = oper.split(" ");
        let command = oper[0];
        let num = oper[1];
        
        switch(command){
            case 'I':
                num = parseInt(num);
                queue.push(num);
                queue = queue.sort((a, b) => a - b);
                // 명령문마다 정렬하므로 성능이 안나올 확률이 큼.
                break;
            
            case 'D':
                if(queue.length === 0) break;
                
                if(num === '1'){
                    let deleted = queue.pop()
                    // console.log(deleted+" is popped.");
                } else if(num === '-1'){
                    let deleted = queue.shift();
                    // console.log(deleted+" is popped.");
                } else {
                    // console.log("Error: Wrong number");
                }
                // console.log(queue);
                break;
        }
    });
    
    if(queue.length === 0) return [0, 0];
    else return [queue[queue.length-1], queue[0]]
    
}