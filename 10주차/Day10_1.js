// 코딩테스트 연습
// 스택/큐
// 다리를 지나는 트럭

function solution(bridge_length, weight, truck_weights) {
    /*  
        1. 다리에는 트럭이 최대 bridge_length만큼 올라갈 수 있으며,
        2. 다리는 weight 이하까지의 무게를 견딜 수 있다.
        3. 단, 다리에 완전히 오르지 않은 트럭의 무게는 무시한다.
        4. 순서대로 지나가는 방법.
        
        다리에 올라온 시점 + 다리길이 = 빠져나온 시점
        
        == pseudo code ==
        1. 다리무게가 진입할 트럭무게 총합보다 적으면 트럭 진입준비.
        2. 모든 트럭 1만큼 전진. (여기서 나가는 트럭이 발생할 수 있음.)
        3. 나간 트럭 스택에 트럭을 넣음.
        4. 2~4번을 반복.
    */ 
    
    let out_stack = [];
    let ing_stack = [];
    let time = 0;
    let total_weight = 0;

    let i = 0;
    while(true){
        if(ing_stack.length == 0 && truck_weights.length == 0) break;
        
        if(ing_stack.length > 0){
            // 올라가있는 모든 트럭의 위치를 1씩 진행시킴.
            for(let i=0; i<ing_stack.length; i++){
                ing_stack[i][1] += 1;   
            }
            
            // 다리를 다 지난 트럭은 내보냄.
            if(ing_stack[0][1] > bridge_length){
                let out = ing_stack.shift();
                out_stack.push(out);
                total_weight -= out[0];
            }
        }
        
        // 올라가있는 트럭무게와 지금 들어갈 트럭의 무게가 다리의 무게를 초과하지 않으면 진입.
        let head = truck_weights[0];
        if((total_weight + head) <= weight){
            ing_stack.push([head, 1]);
            total_weight += head;
            truck_weights.shift();
        }
        
        time++;
        // console.log(out_stack, ing_stack, truck_weights);
        // console.log(total_weight, time)
    }
    
    
    var answer = time;
    return answer;
}