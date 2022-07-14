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
            this.checked = false;
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
    // console.log(nodeIdx);
    
    let lambCnt = 0;
    
    function findMaxLambs(me, lambCnt, wolfCnt){
        console.log(me.index, "=> ");
        // FOLLOWED -> 통과해 / chekced -> 걸로 가지마
        // 내꺼 따지고 -> 아래 따지고 -> 위로 돌아가기/끝내기
        
        if(me == root){
            let checkCnt = 0;
            for(let child of me.childs){
                if(child.checked == true) checkCnt++;
            }
            
            if(checkCnt == me.childs.length){
                console.log("lambCnt="+lambCnt, "wolfCnt="+wolfCnt);
                return lambCnt;
            }
        }
        
        // 현재 노드가 양
        if(me.type == LAMB){
            lambCnt += 1;
            me.type = FOLLOWED;
        } 
        
        // 현재 노드가 늑대
        else if(me.type == WOLF){
            wolfCnt += 1;
            
            /* 
            부모노드로 이동
            1) 늑대의 수가 양보다 많거나 같을 때
            2) 다음 노드가 없을 때
            */
            if(wolfCnt >= lambCnt || me.childs.length == 0){
                me.checked = true;
                findMaxLambs(me.parent, lambCnt, wolfCnt-1);
                return;
            }
            
            // 다음 노드가 없는경우
            me.type = FOLLOWED;
        }
        
        // 현재 노드가 FOLLOWED (다시 거치게 되면)
        // === 통과된 노드가 수행할 기능 ===
        
        /* 
        1. 부모노드로 이동
            1) 내 자식노드가 없으면
            2) 자식노드가 전부 checked이면 (나를 checked로 바꿔줌)
        */
        if((me.childs.length == 0)){
            me.checked = true;
            findMaxLambs(me.parent, lambCnt, wolfCnt);
            return;
        } else {
            if(me.childs.length == 1){
                if(me.childs[0].checked){
                    me.checked = true;
                    findMaxLambs(me.parent, lambCnt, wolfCnt);
                    return;
                }
            } else{
                if(me.childs[0].checked && me.childs[1].checked){
                    me.checked = true;
                    findMaxLambs(me.parent, lambCnt, wolfCnt);
                    return;
                }
            }
        }
        
        // 2. 자식노드로 이동
        // 첫번째 자식노드 -> 두번째 자식노드
        if(!me.childs[0].checked){
            findMaxLambs(me.childs[0], lambCnt, wolfCnt);
        } else if(me.childs[1] && !me.childs[1].checked){
            findMaxLambs(me.childs[1], lambCnt, wolfCnt);
        }
            
        return;
        // 늑대 노드가 checked이면 걸로 가지않음
        // 내 자식노드가 없거나 전부 checked 이면 내 자신도 checked하기
        
    }
//     function findMaxLambs(me, lambCnt, wolfCnt){
//         console.log(me.index, "=> ");
//         if(me.type != FOLLOWED){
//             if(me.type == LAMB) lambCnt ++;
//             else if(me.type == WOLF) wolfCnt ++;
//             else return "ERROR";

//             me.type = FOLLOWED;
//         }
        
//         // leaf-node인 경우 부모노드로 돌아감.
//         if(me.childs.length === 0){
//             findMaxLambs(me.parent, lambCnt, wolfCnt);
//             return;
//         }
        
//         // 늑대 카운트가 양 카운트보다 많으면 이전 노드로 돌아감.
//         if(wolfCnt >= lambCnt){
//             me.checked = true;
//             me.type = WOLF;  // 부모 노드에서 다시 들리지 않기 위한 flag. 다른 노드로 진입하게 되면 다시 초기화 해줌.
//             findMaxLambs(me.parent, lambCnt, wolfCnt - 1);
//             return;
//         }
        
//         // 내가 지나갈 수 있는 노드면 checked를 true로 바꿔주고 형제 노드의 checked를 false로 바꿔줌.
//         me.checked = true;
//         if(me.parent){
//             const parent = me.parent;
//             if(parent.childs[1] == me){
//                 const sibling parent.childs[0];
//                 sibling.checked = false;
//             }
//         }
        
//         // 들렀던 노드를 다시 들를 수 있다.
//         // 한 자식노드로 들어가면 다른 자식노드의 체크여부를 free해줌.
//         if(me.childs[0].type != FOLLOWED && !me.childs[0].checked){
//             findMaxLambs(me.childs[0], lambCnt, wolfCnt);
//             return;
            
//         } else if(me.childs[1].type != FOLLOWED && !me.childs[1].checked){
//             findMaxLambs(me.childs[1], lambCnt, wolfCnt);
//             return;
            
//         } else if (me.parent){
//             me.type = info[me.index];
//             me.checked = true;
//             if(me.childs[0].type != FOLLOWED) me.childs[0].checked = false;
//             if(me.childs[1].type != FOLLOWED) me.childs[1].checked = false;
//             findMaxLambs(me.parent, lambCnt, wolfCnt);
//             return;
            
//         } else {
//             console.log("lambCnt="+lambCnt, "wolfCnt="+wolfCnt, "final location => "+me.index);
//         }
//     }
    
    
    var answer = findMaxLambs(nodeIdx[0], lambCnt, 0);
    return answer;
}
solution([0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1], [[0, 1], [1, 2], [1, 4], [0, 8], [8, 7], [9, 10], [9, 11], [4, 3], [6, 5], [4, 6], [8, 9]]);