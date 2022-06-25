// 코딩테스트 연습
// 2021 카카오 채용연계형 인턴십
// 숫자 문자열과 영단어


function solution(s) {
    /*
    숫자를 영단어로 표현한 String이 주어지면 이를 원래의 숫자로 표현하기
    
    == Psuedo Code ==
    1. Get a char as a string from String s.
    2. Distinguish is 48 <= char <= 57 (ASCII 0~9)
    3. If it is not in range (Case: Alphabet)
        Call wordToNum(String){return: "convertedNumberString", skipCount}
        Add returned array to a newString
       else 
        Put a char into a newString
    4. If skipCount is not 0
        i = i + skipCount;
        
    == Pseudo Code (Function - wordToNum) ==
    1. 
    
    */
    
    const numIdxObj = {
        "zero": 0,
        "one": 1,
        "two": 2,
        "three": 3,
        "four": 4,
        "five": 5,
        "six": 6,
        "seven": 7,
        "eight": 8,
        "nine": 9
    } // 3 <= word length <= 5
    let newString = "";
    
    function wordToNum(numWord){
        let oneWord = "";
        let result = "";
        
        for(var i=0; i<numWord.length; i++){
            oneWord += numWord[i];
            if(oneWord.length >= 3){
                for(var numIdx in numIdxObj){
                    if(oneWord == numIdx){
                        result += numIdxObj[numIdx];
                        oneWord = "";
                        break;
                    }
                }
            }
        }
        
        return result;
    }
    
    let startWordIdx = 0;
    let finWordIdx = 0;
    for(var i=0 ; i<s.length ; i++){
        const item = s.charCodeAt(i);
        if( item<48 || item>57 ){ // If item is not a number.
            startWordIdx = i;
            for(var j=startWordIdx; j<s.length; j++){
                const innerItem = s.charCodeAt(j);
                if(innerItem>=48 && innerItem<=57){  // 숫자를 만나서 문장이 끊기거나, 
                    finWordIdx = j;
                    break;
                } else if(j == s.length-1){  // 아예 문장이 끝나거나
                    finWordIdx = j+1;
                }
            }
            newString += wordToNum(s.substring(startWordIdx, finWordIdx));
            i = i + (finWordIdx - startWordIdx) - 1;  // - 증가량
        } else { // If item is a number.
            newString += s[i];
        }
    }
    return parseInt(newString);
}