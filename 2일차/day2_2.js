// ; 코딩테스트 연습
// ; 2021 KAKAO BLIND RECRUITMENT
// ; 신규 아이디 추천


function solution(new_id) {
    /*
    ==카카오 ID 규칙==
    1. 3 <= id길이 <= 15
    2. 알파벳 소문자, 숫자, '-', '_', '.' 만 사용가능
    3. '.'는 처음과 끝에 사용될 수 없고, 연속으로 사용될 수 없음.
    
    ==검사과정==
    1. new_id 의 모든 대문자를 소문자로 치환
    2. new_id에서 위의 규칙에 해당되는 문자 외의 문자를 모두 지움
    3. '.'가 2번 이상 연속된 부분을 하나의 '.'로 치환
    4. '.'가 처음이나 끝에 있으면 제거
    5. 빈 문자열이라면 'a'를 대입
    6. 길이가 16자 이상이면 15번째 이후의 문자는 전부 제거. 만약 제거 후 마침표가 id끝에 위치하면 제거
    7. 길이가 2자 이하라면 마지막 문자를 길이가 3이 될때까지 반복
    */
    
    function testProcess(){
        
        // process 1
        let process = new_id.toLowerCase();
        console.log("process 1: ", process);
        
        //process 2
        process = (() => {
            let tempStr = "";
            for (var c of process){
                if ((c=='-') || (c=='_') || (c=='.') 
                    || (c.charCodeAt(0)>=97 && c.charCodeAt(0)<=122) 
                    || (c.charCodeAt(0)>=48 && c.charCodeAt(0)<=57)){
                    tempStr += c;
                }
            }
            return tempStr;
        })();
        console.log("process 2: ", process);
        
        // process 3
        process = (() => {
            let tempStr = "";
            let wasDot = false;
            for (var i=0; i<process.length; i++){
                const c = process[i];
                /*
                c가 dot이면
                    dot의 개수를 센 다음, 
                dot이 아닌 문자를 만난 경우 앞에 dot이 있다면 함께 tempStr에 삽입하는 if문
                */
                if(c == '.'){
                    wasDot = true;
                } else {
                    if(wasDot){
                        tempStr = tempStr + '.' + c;
                        wasDot = false;
                    } else {
                        tempStr = tempStr + c;
                    }
                }
            }
            // 문자열의 끝에 도달한 경우
            if(wasDot) tempStr + '.';
            
            return tempStr;
        })();
        console.log("process 3: ", process);
        
        // process 4
        process = (() => {
            let tempStr = process;
            if(tempStr.charAt(0) == '.')
                tempStr = tempStr.substring(1, tempStr.length);
            if(tempStr.charAt(tempStr.length-1) == '.')
                tempStr = tempStr.substring(0, tempStr.length-1);
            return tempStr;
        })();
        console.log("process 4: ", process);
        
        // process 5
        process = (() => {
            let tempStr = process;
            if(tempStr.length == 0){
                tempStr = "a";
            }
            return tempStr;
        })();
        console.log("process 5: ", process);
        
        // process 6
        process = (() => {
            let tempStr = process;
            if(process.length > 15){
                tempStr = process.substring(0, 15);
            }
            if(tempStr.charAt(14) == '.'){
                tempStr = tempStr.substring(0, 14);
            }
            return tempStr;
        })();
        console.log("process 6: ", process);
        
        // process 7
        process = (() => {
            let tempStr = process;
            if(process.length < 3){
                tempStr = process;
                while(tempStr.length != 3){
                    tempStr += process.charAt(process.length-1);
                }
            }
            return tempStr;
        })();
        console.log("process 7: ", process);
        
        return process;
    }
    
    var answer = testProcess();
    return answer;
}