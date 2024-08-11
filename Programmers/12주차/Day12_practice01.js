// 코딩테스트 연습
// 완전탐색
// 카펫

function solution(brown, yellow) {
    /*
        ==Pseudo Code==
        1. 나올 수 있는 가로의 경우의 수와 그에 따른 세로의 경우의 수 계산.
            1.1) 최소 세로길이에서 가질 수 있는 최대 가로길이까지의 경우의 수를 계산.
            1.2) 1.1)에서 yellow를 만족하는 경우가 없다면 세로길이를 1 늘리고 계산.
        2. 그 안에 들어가는 노란색 블록의 개수가 yellow와 같은지 확인.
    
        ==Rules==
        1. 가로와 세로 길이는 최소 1 이상이어야 한다. (모서리는 제외)
        2. 가로는 세로와 같거나 더 길다.
    */
    
    var answer = [];
    let maxWidth = 0, height = 1;
    
    maxWidth = (brown - 4 - height*2) / 2; // 모서리 + 최소 세로길이
    
    for(let width=maxWidth; width>=1; width--){
        let tempYellow = width*height;
        // console.log(width, height);
        if((tempYellow === yellow) && (width >= height)) answer = [width+2, height+2]; 
        height++;
    }
    
    return answer;
}