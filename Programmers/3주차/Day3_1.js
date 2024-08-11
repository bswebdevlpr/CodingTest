// 코딩테스트 연습
// 2021 Dev-Matching: 웹 백엔드 개발자(상반기)
// 다단계 칫솔 판매


function solution(enroll, referral, seller, amount) {
    /*
    ==== 문제점 =====
    1. for문 너무 많이돌리나?
    2. 트리를 안만들어서 비효율적인가?
    3. 객체로 정리해서 중복이 처리가 안됨.
    4. 각 소득에 대해 10%를 줘야함. (합산하면 안됨.)
    5. 배당금을 나눠줄 때 rootNode까지 모두 배당금 할당이 이뤄져야 함.
    
    1. 추천인한테 10% 주고 나머지 자신이 가짐. 
    2. 10% 계산은 원 단위까지, 1원 미만인 경우 이득을 분배하지 않음.
    3. 칫솔은 100원
    
    enroll - 각 판매원의 이름을 담은 배열
    referral - 각 판매원을 조직에 참여시킨 다른 판매원의 이름
    seller - 판매량 집계 데이터의 판매원 이름을 나열한 배열
    amount - 판매량 집계 데이터의 판매수량을 나열한 배열
    각 판매원이 득한 이익금을 나열한 배열을 return해라.
    */
    
    // Defines Node class
    class Node {
        constructor(name, parent){
            this.name = name;
            this.parent = parent;
            this.amount = 0;
        }
        
        giveDividend(money){
            // case rootNode
            // 할당금은 들어올 때마다의 금액을 나누는걸로 됨. 총합에서 말고.
            if(this.parent == null){ return; }
            this.amount += money;
            
            const dividend = Math.floor(money/10);
            
            // rule
            if(dividend < 1){ return; }
            
            this.amount -= dividend;
            this.parent.giveDividend(dividend);
        }
    };
    
    /* 
    parentIndex: 각 구성원의 추천인 이름을 담는 객체
    amountIndex: 각 구성원의 초기 판매액을 담는 객체
    */
    let parentIndex = {};
    for(var i=0; i<enroll.length; i++){
        parentIndex[enroll[i]] = referral[i];
    }
    
    // console.log(parentIndex);
    // console.log(amountIndex);
    
    // 각 노드를 생성
    let rootNode = new Node('-', null, 0);
    let nodeList = [];
    for(var name in parentIndex){
        let parentNode;
        // parentNode 설정
        // parent가 rootNode인 경우
        if(parentIndex[name] == "-"){
                parentNode = rootNode;
        } else{ 
        // nodeList에서 해당 node의 이름이 parentIndex에서 name의 parent와 이름이 같다면,
        // parentNode에 nodeList[i]를 할당.
            for(var i=0; i<nodeList.length; i++){
                if(nodeList[i].name == parentIndex[name]){
                    parentNode = nodeList[i];
                    break;
                }
            }
        }
        
        nodeList.push(new Node(name, parentNode));
    }
    // console.log(rootNode, (rootNode.parent == null));
    // console.log(nodeList);
    
    for(let i=0; i<seller.length; i++){
        let name = seller[i];
        let money = amount[i]*100;
        
        // 각 수익금에 따라 name과 이름이 같은 노드를 찾아서 money를 더해주고 배당금을 할당
        for(let node of nodeList){
            if(node.name == name){
                node.giveDividend(money);
                break;
            }
        }
        // console.log("i="+i,"/", name,"이",money,"를 벌었음.");
        // console.log(nodeList);
    }
    
    let result = [];
    for(var i=0; i<nodeList.length; i++){
        result.push(nodeList[i].amount);
    }

    var answer = result;
    return answer;
}