// 코딩테스트 연습
// 스택/큐
// 같은 숫자는 싫어

function solution(arr)
{
    let order = [];
    
    arr.map(num => {
       if(order[order.length-1] !== num){
           order.push(num);
       } 
    });
    
    return order;
}