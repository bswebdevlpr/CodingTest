// 코딩테스트 연습
// 깊이/너비 우선 탐색(DFS/BFS)
// 타겟 넘버


function solution(numbers, target) {
    /*
    주어진 넘버들로 더하거나 빼서 target을 만들어야함
    */
    class Number {
        constructor(num, prevResult){
            this.num = num;
            this.result = prevResult + num;
        }
        setAdd(add){
            this.add = add;  // 본인과 더할 노드
        }
        setMin(min){
            this.min = min;  // 본인과 뺄 노드
        }
    }
    
    let numberList = [];
    const rootNode = new Number(0, 0);
    numberList.push(rootNode);
    
    function createNode(numberIdx, isPos, prevResult){
        if(numberIdx >= numbers.length) return null;
        const number = numbers[numberIdx];
        let node = {};
        if(isPos) node = new Number(number, prevResult);
        else node = new Number((-number), prevResult);
        
        numberList.push(node);
        
        node.setAdd(createNode(numberIdx+1, true, node.result));
        node.setMin(createNode(numberIdx+1, false, node.result));
        
        return node;
    }
    
    rootNode.setAdd(createNode(0, true, rootNode.result));
    rootNode.setMin(createNode(0, false, rootNode.result));
    
    // for(let i=0; i<numberList.length; i++){
        // console.log(numberList[i]);
    // }
    
    let count = 0;
    for(const number of numberList){
        if(number.result == target &&
          ((number.add == null) || (number.min == null))){
            count++;
            // console.log(number);
        }
    }
    
    var answer = count;
    return answer;
}