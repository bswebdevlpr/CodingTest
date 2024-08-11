// 코딩테스트 연습
// 탐욕법(Greedy)
// 큰 수 만들기


function solution(number, k) {
    
    // let allZero = true;
    // for(let i=0; i<number.length; i++){
    //     if(number[i] !== '0') allZero = false; 
    // }
    // if(allZero){
    //     return number.substring(0, number.length-k);
    // }
    
    let max;
    let maxStr;
    for(let i=k; i>0; i--){
        max = -1;
        // console.log(number.length)
        for(let j=0; j<number.length; j++){
            let head = number.substring(0, j);
            let rear = number.substring(j+1, number.length);
            let newStr = head+rear;
            let newNum = parseInt(newStr);
            
            if(max < newNum) {
                maxStr = newStr;
                max = newNum;
                console.log("max="+max);
            }
            console.log("i="+i, "j="+j, "newNum="+newNum);
        }
        console.log();
        
        number = maxStr;
        console.log("i="+i, "new number: ", number);
    }
    
    
    return number;
}

solution("00000", 3);