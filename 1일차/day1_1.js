// 코딩테스트 연습
// 2021 Dev-Matching: 웹 백엔드 개발자(상반기)
// 로또의 최고 순위와 최저 순위


/*
    당첨가능한 최고순위와 최저순위를 차례대로 배열에 담아서 return 하도록 
    solution 함수를 완성하라.
*/
function solution(lottos, win_nums) {
    
    /*
        lottos - 구매한 로또번호
        1. 길이 6인 정수배열
        2. 0 <= elements <= 45
            2.1. 0은 알아볼 수 없는 숫자를 의미
            2.2. 0을 제외한 다른 숫자들은 2개 이상 담기지 않음
            2.3. 정렬되어 있지 않을 수 있음
            
        win_nums - 당첨번호
        1. 길이 6인 정수배열
        2. 1 <= elements <= 45
            2.2. 같은 숫자가 2개 이상 담기지 않음
            2.3. 정렬되어 있지 않을 수 있음
    */
    
    /*
    rankIndex = {
        6: 1
        5: 2
        4: 3
        3: 4
        2: 5
        1: 6
        0: 6
    }
    
    // Find the number of 0 and myWinNum 
    for number of lottos.length
        if number is not 0
            search win_nums whether number is in win_nums
            if number in win_nums
                add 1 to rightNum count
                exit from loop
        else
            add 1 to zeroCount
    
    highestNum = myWinNum + zeroCount
    lowestNum = myWinNum
    
    
    return answer = [rankIndex.highestNum, rankIndex.lowestNum]
    */
    const rankIndex = {
        6: 1,
        5: 2,
        4: 3,
        3: 4,
        2: 5,
        1: 6,
        0: 6,
    }
    let winCount = 0;
    let zeroCount = 0;
    
    for (let num of lottos){
        if(num != 0){
            //search win_nums whether number is in win_nums
            for (let winNum of win_nums){
                // if number in win_nums
                //  add 1 to winCount
                //  exit from loop
                if(num == winNum){
                    winCount++;
                    break;
                }
            }
        }
        //add 1 to zeroCount
        else zeroCount++;
    }
    
    const highestCount = winCount + zeroCount;
    const lowestCount = winCount;
    
    return answer = [rankIndex[highestCount], rankIndex[lowestCount]];
}