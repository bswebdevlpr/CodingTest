// 코딩테스트 연습
// 완전탐색
// 모음사전

function solution(word) {
    /*
    AXXXX
    AAXXX
    AAAXX
    AAAAX
    AAAAA
    AAAAE
    ...
    AAAEX
    AAAEA
    ...
    AAEXX
    AAEAX
    AAEAA
    ...
    EAXXX
    EAAXX
    ...
    */
    let answer = 0;
    
    let stack = [];
    
    /*
    Pseudo Code
    1. 빈 공간에 A를 채워줌.
    2. stack 길이가 5 미만이면 A 삽입.
    3. 마지막 요소가 U이면 해당 요소를 뺌.
    4. 마지막 요소를 다음 요소로 바꿔줌.
    */
    function switchAlp(alp){
        let newAlp;
        
        switch(alp){
            case 'A':
                newAlp = 'E';
                break;

            case 'E':
                newAlp = 'I';
                break;

            case 'I':
                newAlp = 'O';
                break;

            case 'O':
                newAlp = 'U';
                break;
                
            case 'U':
                newAlp = stack.pop();
                newAlp = switchAlp(newAlp);
                break;
                
            default:
                console.log("ERROR");
                break;
        }
        
        return newAlp;
    }
    
    while(true){
        if(stack.join('') === word) break;
        
        if(stack.length < 5) {
            stack.push('A');
        } else {
            let rear = stack.pop();
            rear = switchAlp(rear);
            stack.push(rear);
        }
            
        answer++;
    }
    // console.log(answer, stack);
    
    return answer;
}