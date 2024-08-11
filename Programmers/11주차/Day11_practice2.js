// 코딩테스트 연습
// 정렬
// 가장 큰 수

function solution(numbers) {
    /*
        1. 모든 숫자를 문자열로 변경.
        2. 앞숫자를 먼저 붙인 수, 뒷수자를 먼저 붙인 수를 비교하여 sort를 실행.
    */
    if(numbers.length === 1) return numbers.join();
    
    numbers = numbers.sort((a, b) => {
        let aStr = a.toString();
        let bStr = b.toString();
        let aIsFirst = parseInt(aStr + bStr);  
        let bIsFirst = parseInt(bStr + aStr);  

        if(aIsFirst > bIsFirst) return -1;
        else if(aIsFirst === bIsFirst) return 0;
    });
    let isAllZero = true;
    for(let c of numbers) if(c !== 0) {isAllZero = false;}
    if(isAllZero) return '0';
    
    var answer = numbers.join('');
    return answer;
}