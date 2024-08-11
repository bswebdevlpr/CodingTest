// 코딩테스트 연습
// 해시
// 폰켓몬

function solution(nums) {
    let half = nums.length/2;
    let idx = {};
    
    nums.map(num => {
        if(!idx[num]) idx[num] = 1;
        else idx[num]++;
    });
    
    let answer = 0;
    let keys = Object.keys(idx);
    for(let i=0; i<keys.length; i++){
        if(answer == half) break;
        answer++;
    }
    return answer;
}