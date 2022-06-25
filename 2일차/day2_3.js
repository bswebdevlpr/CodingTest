// 코딩테스트 연습
// 2022 KAKAO BLIND RECRUITMENT
// k진수에서 소수 개수 구하기



function solution(n, k) {
    /*
    양의 정수 n을 k진수로
    0은 숫자를 구분하는 용도로 사용
    */
    function convert(){
        let result = n;
        let quotient = n;
        let remainder = [];
        
        // 나눗셈변환
        while(quotient > 0){
            remainder.push(quotient % k);
            quotient = Math.floor(quotient / k);
        }
        
        // 나머지 리스트 역전
        let reversedList = [];
        for(var i=remainder.length-1; i>=0; i--){
            reversedList.push(remainder[i]);
        }
        
        result = reversedList.toString();
        result = result.replace(/,/g, "");
        
        
        
        return result;
    }
    
    
    const originalNumStr = String(n);
    const convertedNumStr = convert();
    console.log("originalNumStr: ", originalNumStr);
    console.log("convertedNumStr: ", convertedNumStr);
    
    let numList = [];
    for (var num of convertedNumStr.split('0')){
        if(num != "")
            numList.push(num);
    }
    console.log(numList);
    
    let primeNumCount = 0;
    for (var numStr of numList){
        const num = parseInt(numStr);
        if(num > 1){
            if(num < 2*2){
                console.log(num," is prime number.");
                primeNumCount++;
            }
            else{
                const flag = Math.floor(Math.sqrt(num));
                for(var i = 2; i<=flag; i++){
                    // 나눠져서 소수가 아닐 때
                    if((num % i) == 0)
                        break;
                    
                    // 끝에 도달했다면 소수 카운트
                    if((i+1) > flag){
                        console.log(num," is prime number.");
                        primeNumCount++;
                    }
                    
                }
            }
        }
    }
    
    var answer = primeNumCount;
    return answer;
}