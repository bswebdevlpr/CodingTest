// 코딩테스트 연습
// 완전탐색
// 모의고사

function solution(answers) {
    let ways = {
        1: [1, 2, 3, 4, 5],
        2: [2, 1, 2, 3, 2, 4, 2, 5],
        3: [3, 3, 1, 1, 2, 2, 4, 4, 5, 5]
    }
    let oneLoc=0, twoLoc=0, threeLoc=0;
    
    let scores = {
        1: 0,
        2: 0,
        3: 0
    }
    
    answers.map(answer => {
        if(ways[1][oneLoc] == answer) scores[1]++;
        if(ways[2][twoLoc] == answer) scores[2]++;
        if(ways[3][threeLoc] == answer) scores[3]++;

        if(oneLoc == ways[1].length-1) oneLoc=0;
        else oneLoc++;
        if(twoLoc == ways[2].length-1) twoLoc=0;
        else twoLoc++;
        if(threeLoc == ways[3].length-1) threeLoc=0;
        else threeLoc++;
    });
    
    let max = 0;
    for(let idx in scores){
        if (max < scores[idx]) max = scores[idx];
    }
    
    var answer = [];
    let keys = Object.keys(scores);
    for(let key in scores){
        if(scores[key] == max) answer.push(parseInt(key));
    }
    answer = answer.sort((a, b) => a - b);
    
    return answer;
}
