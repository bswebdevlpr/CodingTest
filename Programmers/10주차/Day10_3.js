// 코딩테스트 연습
// 2020 KAKAO BLIND RECRUITMENT
// 문자열 압축

function solution(s) {
    /*
        문자열의 원래 길이까지 경우의 수를 만들어 압축하여 비교.
    */
    let zips = [];  // 각 case별로 압축한 문자열의 길이를 담는 array
    
    for(let i=0; i<s.length; i++){
        let zipStr = "";
        let zipCnt = 0;
        let pointer = 0;
        let word = "";
        let wordLen = i+1;
        
        while(pointer < s.length){
            let nowWord = s.substring(pointer, pointer+wordLen);
            /* 
                현재 위치의 글자와 비교 글자가 다르면 
                    1) 비교글자가 누적된 수만큼 zipStr에 붙여줌.
                    2) 비교단어에 현재위치의 단어를 넣어줌.
                    3) zipCnt 초기화.
                    4) 다음 위치로 이동.
                    => 비교단어와 같은 단어가 현재위치에 없으면 비교단어를 압축문자열에 넣어주고 다음 단어를 비교함.
                같으면
                    
            */
            if(word !== nowWord) {
                if(zipCnt !== 0) {
                    if(zipCnt === 1) zipStr += word;
                    else zipStr += (zipCnt + word);
                }
                word = nowWord;
                zipCnt = 1;
            } else {
                zipCnt++;
            }
            
            pointer += wordLen;  // 반복되는 단어를 못찾았다면 한칸씩 이동해야함.
        }
        if(zipCnt === 1) zipStr += word;
        else zipStr += (zipCnt + word);
        zips.push(zipStr);
        // console.log("wordLen="+(i+1), "string="+zipStr);
    }
    
    let min = s.length;
    for(let str of zips){
        if(min > str.length) min = str.length;
    }
    
    var answer = min;
    return answer;
}