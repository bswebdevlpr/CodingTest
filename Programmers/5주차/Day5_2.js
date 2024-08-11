// 코딩테스트 연습
// 2018 KAKAO BLIND RECRUITMENT
// [1차] 캐시

function solution(cacheSize, cities) {
    
    let cacheIdx = {}; // key - order, val - city name
    
    let runtime = 0;
    cities.map(beforeConvert => {
        const city = beforeConvert.toLowerCase();
        let entries = Object.entries(cacheIdx);
        
        // 예외 케이스: 캐시사이즈 = 0
        if(cacheSize == 0){
            runtime += 5;
            return;
        }
        
        // 캐시가 전부 안차있다면
        if(entries.length == 0){
            cacheIdx[0] = city;
            runtime += 5;
        }
        // if(entries.length < cacheSize){
        //     cacheIdx[entries.length] = city;
        //     runtime += 5;
        // }
        else{
            // 캐시에서 원하는 도시를 발견했다면
            for(let [key, val] of entries){
                if(val == city){
                    // 최신 order로 변경
                    for(let i=parseInt(key); i<entries.length-1; i++){
                        cacheIdx[i] = cacheIdx[i+1];
                    }
                    cacheIdx[entries.length - 1] = val;
                    // console.log(cacheIdx);
                    runtime += 1;
                    return;
                }
            }
            
            
            // 발견 못했으면
            if(entries.length < cacheSize){
                cacheIdx[entries.length] = city;
            } else{
                for(let i=1; i<cacheSize; i++){
                    cacheIdx[i-1] = cacheIdx[i];
                }
                cacheIdx[cacheSize-1] = city;
            }
            runtime += 5;
        }
        
        
        // console.log(cacheIdx);
    });
    
    var answer = runtime;
    return answer;
}