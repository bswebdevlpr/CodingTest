// 코딩테스트 연습
// 정렬
// K번째수


function solution(array, commands) {
    let answer = commands.map(cmd => {
        let i=cmd[0], j=cmd[1], k=cmd[2];
        return array.slice(i-1, j).sort((a, b) => a - b)[k-1]; 
    });

    return answer;
}