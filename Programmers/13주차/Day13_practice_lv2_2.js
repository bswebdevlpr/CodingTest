// 코딩테스트 연습
// 월간 코드 챌린지 시즌1
// 이진 변환 반복하기

function solution(s) {
    
    function toBinary(s, steps=0, deletedCnt=0){
        if(s === '1') return [steps, deletedCnt];

        let deletedStr = "";
        for(let i=0; i<s.length; i++){
            if(s[i] === '1') deletedStr += '1';
            else deletedCnt++;
        }
        let quot = deletedStr.length, remainder = 0;
        let newBinary = [];
        while(quot !== 0){
            remainder = quot % 2;
            newBinary.push(remainder);
            quot = Math.floor(quot/2);
        }
        // console.log("before reverse, newBinary:", newBinary);
        newBinary = newBinary.reverse();
        
        let newStr = newBinary.join("");
        // console.log("newBinary:", newBinary);
        // console.log(s, "=>", newStr, "deletedCnt="+deletedCnt);
        // console.log();
        
        return toBinary(newStr, steps+1, deletedCnt);
    }
    let [steps, deletedCnt] = toBinary(s);

    
    var answer = [steps, deletedCnt];
    // console.log(answer);
    return answer;
}

solution("01110");
