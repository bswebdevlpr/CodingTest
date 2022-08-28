// 코딩테스트 연습
// 스택/큐
// 올바른 괄호

function solution(s){
    var answer = true;
    
    let leftCnt = 0;
    let rightCnt = 0;
    for(let i=0; i<s.length; i++){
        s[i] === '(' ? leftCnt++ : rightCnt++;
        if(rightCnt > leftCnt) {
            answer = false;
            break;
        }
    }
    if(rightCnt !== leftCnt) answer = false;
    
    return answer;
}