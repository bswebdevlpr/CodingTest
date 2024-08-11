// 스택, 큐 둘다 운용하는 부분에서 코스트를 많이 잡아먹어서 시간초과 났음. 그 부분에서 헤맴.
// 큐를 직접 shift 안하고 포인터를 사용해서 해결.

function solution(order) {
    var answer = 0;
    
    /* 
    order - 기사가 원하는 택배넣는 순서
    컨테이너 벨트 - 큐, 보조 컨테이너 벨트 - 스택
    */
    const queue = []
    const stack = []
    let orderPointer = 0
    let queuePointer = 0
    
    stack.push(1)
    for(let i=1; i<order.length; i++) queue.push(i+1)
    /*
    PSEUDO CODE
    1. 큐 요소와 order 요소 비교.
        3.1. 같으면 제거.
        3.2. order보다 작으면 stack에 push
        3.3. order보다 크면 stack 요소와 비교.
            3.3.1. 같으면 제거.
            3.3.2. 다르면 break
    */
    
    while(true){
        if(orderPointer === order.length) break
        
        // console.log(queue, stack, "\npointer=", pointer, '\n')
        
        if(queuePointer === queue.length && stack[stack.length-1] !== order[orderPointer]) break
        if(stack[stack.length-1] === order[orderPointer]) {
            stack.pop()
            answer++
            orderPointer++
        }
        else if(queue[queuePointer] === order[orderPointer]){
            queuePointer++
            orderPointer++
            answer++
        } else {
            stack.push(queue[queuePointer])
            queuePointer++
        }
        
    }
    
    return answer;
}