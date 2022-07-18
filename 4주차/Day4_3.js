function solution(info, edges) {
    /*
    info value: 0 - 양, 1 - 늑대
    edge의 각 행: [부모 노드 번호, 자식 노드 번호]
    
    RULES
    늑대의 수가 양과 같거나 많아지면 양이 전부 잡아먹힘.
    
    모을 수 있는 양의 최대 수 return
    */
    const LAMB = 0;
    const WOLF = 1;
    const FOLLOWED = -1;
    class Node {
        constructor(type, parent, index){
            this.inLamb = -1;  // 늑대 수 보존을 위한 변수
            this.outLamb = -1;  // 부모노드, 자식노드 간 이동방향 판단을 위한 변수
            
            this.index = index;
            this.type = type;
            this.childs = [];
        }
    }
    
    let nodeIdx = {};
    
    for(let i=0; i<info.length; i++){
        nodeIdx[i] = new Node(info[i], null, i);
    }
    const root = nodeIdx[0];

    edges.map(([parent, child]) => {
        nodeIdx[parent].childs.push(nodeIdx[child]);
        nodeIdx[child].parent = nodeIdx[parent];
    });
    console.log(nodeIdx);
    
    let present = root;
    let lambCnt = 1;
    let wolfCnt = 0;

    
    // 현재 노드에서 자식노드와 부모노드 즉, 세 방향을 고려하고 갈수있는 노드의 위치를 return.
    function findMaxLambs(){
        console.log("현재위치="+present.index, "type="+present.type, "inLamb="+present.inLamb, "lambCnt="+lambCnt, "wolfCnt="+wolfCnt);
        let next;
        
        // 카운트는 부모에서 해버림.
        
        // 자식노드로 이동이 가능한지 보고(자식이 있는가? -> 자식으로 이동할 수 있는가?)
        const childLen = present.childs.length;
        if(childLen == 0){
            // WOLF노드가 leaf-node일때, FOLLOWED일 때를 따지는 부분 이어서 해야함
            
            // Case - wolfCnt를 넘지 않아서 WOLF Node로 넘어왔는데 해당 노드가 leaf node인 경우.
            if(info[present.index] == WOLF){
                present.type = WOLF;
                wolfCnt--;
            }
            present.outLamb = lambCnt;
            next = present.parent;
            
        } else{
            // 자식노드가 하나
            if(childLen == 1){
                // 초기값을 설정해놓았기 때문에 한번은 무조건 방문함.
                
                // 들어갈 lambCnt가 자식노드가 내보낸 값보다 크면 자식노드로 이동.
                if(lambCnt > present.childs[0].outLamb){
                    if(present.childs[0].type == LAMB) {
                        lambCnt ++;
                        next = present.childs[0];
                        present.childs[0].type = FOLLOWED;
                    }
                    else if(present.childs[0].type == WOLF) {
                        present.childs[0].inLamb = lambCnt;
                        wolfCnt++;
                        if(wolfCnt >= lambCnt){
                            wolfCnt--;
                            present.childs[0].outLamb = lambCnt;
                            next = present.parent;
                        } else {
                            next = present.childs[0];
                            present.childs[0].type = FOLLOWED;
                        }
                    } 
                    // FOLLOWED인 경우. count 하지 않기 위함.
                        
                    
                } else {  // 자식노드로 갈 수 없는 경우.
                    
                    // WOLF node에서 자식노드로 갈 수 없을 때, 본인을 카운트에서 제거하고 부모노드로 이동해야함.
                    if(info[present.index] == WOLF && present.inLamb == lambCnt) {
                        // 내 노드 아래로 양이 없으면 양이 증가한게 없다는 얘기이므로 내 노드의 늑대를 데려갈 필요가 없음. 따라서 내 wolfCnt도 하나 빼줌.
                        present.type = WOLF;
                        wolfCnt--;
                    }
                    
                    present.outLamb = lambCnt;
                    next = present.parent;
                }
                
            } else if(childLen == 2){
                // 지금 들어오는 값이 내가 내보낸 값보다 크면 자식노드로 이동.
                if(lambCnt > present.childs[0].outLamb){
                    if(present.childs[0].type == LAMB) {
                        lambCnt++;
                        next = present.childs[0];
                        present.childs[0].type = FOLLOWED;
                    }
                    else if(present.childs[0].type == WOLF) {
                        present.childs[0].inLamb = lambCnt;
                        wolfCnt++;
                        if(wolfCnt >= lambCnt){
                            wolfCnt--;
                            present.childs[0].outLamb = lambCnt;

                            next = present;
                        } else {
                            next = present.childs[0];
                            present.childs[0].type = FOLLOWED;
                        }
                    } else {
                    // FOLLOWED인 경우. count 하지 않기 위함.
                        next = present.childs[0];
                    }
                    
                } else if(lambCnt > present.childs[1].outLamb){
                    if(present.childs[1].type == LAMB) {
                        lambCnt++;
                        next = present.childs[1];
                        present.childs[1].type = FOLLOWED;
                    }
                    else if(present.childs[1].type == WOLF) {
                        present.childs[1].inLamb = lambCnt;
                        wolfCnt++;
                        if(wolfCnt >= lambCnt){
                            wolfCnt--;
                            present.childs[1].outLamb = lambCnt;
                            next = present;
                        } else {
                            next = present.childs[1];
                            present.childs[1].type = FOLLOWED;
                        }
                    } else {
                    // FOLLOWED인 경우. count 하지 않기 위함.
                        next = present.childs[1];
                    }
                    
                } else {  // 자식노드로 갈 수 없는 경우
                    
                    // WOLF node에서 자식노드로 갈 수 없을 때, 본인을 카운트에서 제거하고 부모노드로 이동해야함.
                    if(info[present.index] == WOLF && present.inLamb == lambCnt) {
                    // 내 노드 아래로 양이 없으면 양이 증가한게 없다는 얘기이므로 내 노드의 늑대를 데려갈 필요가 없음. 따라서 내 wolfCnt도 하나 빼줌.
                    present.type = WOLF;
                    wolfCnt--;
                    }
                    
                    present.outLamb = lambCnt;
                    next = present.parent;
                }
                
            }
        }
        
        
        return next;
    }
    
    let i = 0;
    while(i<100){
        i++;
        if(present == null){
            console.log(i+"번째 시도:", "lambCnt="+lambCnt)
            break;
        }
        present = findMaxLambs();
    }
    
    var answer = lambCnt;
    return answer;
}

solution(	[0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0], [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6], [3, 7], [4, 8], [6, 9], [9, 10]]);