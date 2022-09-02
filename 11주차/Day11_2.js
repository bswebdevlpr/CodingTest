// 코딩테스트 연습
// 정렬
// H-Index


function solution(citations) {
    
    let paperIdx = {};
    /*
        citations의 각 값에 대하여 본인 이상의 값을 가지는 sibling의 개수를 카운트.
    */
    for(let i=0; i<=citations.length; i++){
        if(!paperIdx[i]) paperIdx[i] = 0;
    }
    citations.map(rest => {
        for(let key in paperIdx){
            if(rest >= parseInt(key)) paperIdx[key]++;
        }
    });
    // console.log(paperIdx);
    
    let max = 0;
    for(let keyStr in paperIdx){
        let key = parseInt(keyStr);
        let value = paperIdx[key];
        
        if(key <= value) {
            if(max < key) max = key;
        }
    }
    
    return max;
}