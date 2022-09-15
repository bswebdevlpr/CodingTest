// 코딩테스트 연습
// 연습문제
// 수박수박수박수박수박수?

function solution(n) {
    let str = "수박";
    
    if(n % 2 === 0){
        str = str.repeat(n/2);
    } else {
        let quot = Math.floor(n/2);
        
        str = str.repeat(quot);
        str = str + "수";
    }
    
    return str;
}