// 코딩테스트 연습
// 연습문제
// 숫자의 표현

function solution(n) {
    var answer = 0;
    
    // 시작점
    for(let i=1; i<=Math.floor(n/2); i++){
        let sum = i;
        let list = [i];
        for(let j=i+1; j<n; j++){
            if(sum >= n) break;
            sum += j;
            list.push(j)
        }
        
        if(sum === n) {
            // console.log(list);
            answer++;
        }
    }
    
    return ++answer;
}