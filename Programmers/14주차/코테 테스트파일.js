function solution(k, dic, chat) {
    /*
        ==Decription==
        1. 유저 채팅은 알파벳 소문자, 특수문자, 점으로 이루어진 단어들을 공백 하나로 구분.
        2. 비속어 단어와 완벽히 일치하면 #으로 대체.
        3. 단어에 포함된 .을 1 이상 k이하 길이의 알파벳들로 대체하였을때, 비속어가 되면 #으로 대체.
    */

    chat = chat.split(" ");
    console.log(chat);

    let resultStr = "";

    function dot(str){
        /* 
        1. 점을 뺀 newStr을 만들고, 점의 위치를 점의 이전 인덱스로 기억시켜.
        2. newStr과 badWord를 하나씩 비교하면서 다른 지점을 만나면 그 전에 점이 들어가는지 봐.
            2.1) 점이 들어가면
                2.1.1) dotCnt가 최소개수를 만족하면 badWord의 i++하고 다음 루프
            2.2) 안들어가면 패스
        */
        let dotIdx = [];
        let newStr = "";

        for(let i=0; i<str.length; i++){
            if(str[i] !== '.') newStr += str[i];
            else dotIdx.push(i-1);
        }
        
        console.log(dotIdx);

        return newStr;
    }

    for(let i=0; i<chat.length; i++){
        let word = chat[i];
        console.log(word);

        if(dic.includes(word)){
            resultStr += word;
            continue;
        } else {
            /*
            ==Psuedo Code==
            1. 앞뒤로 dot이 있는 경우.
                => 길이만 판별하면 됨.
            2. 단어 중간에 dot이 있는 경우.
                2.1) dot이 단어 앞뒤를 잇는지 판별.
            */
            console.log(dot(word));
        }
    }

    var answer = '';
    return answer;
}

solution(2, ["slang", "badword"], "badword ab.cd bad.ord")