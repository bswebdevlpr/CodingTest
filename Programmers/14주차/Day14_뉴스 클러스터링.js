// 코딩테스트 연습
// 2018 KAKAO BLIND RECRUITMENT
// [1차] 뉴스 클러스터링

function solution(str1, str2) {
    /*
        자카드 유사도 = 교집합 / 합집합, 둘 다 공집합이면 1
            * 다중집합을 허용한다.
    */
    str1 = str1.toLowerCase();
    str2 = str2.toLowerCase();
    let cluster1 = {}, cluster2 = {};
    
    for(let i=0; i<str1.length-1; i++){
        let a = str1[i];
        let b = str1[i+1];
        let asciiA = a.charCodeAt();
        let asciiB = b.charCodeAt();
        
        if(!(97 <= asciiA && asciiA <= 122) 
           || !(97 <= asciiB && asciiB <= 122)) continue;
        
        if(!cluster1[a+b]) cluster1[a+b] = 1;
        else cluster1[a+b]++;
    }
    
    for(let i=0; i<str2.length-1; i++){
        let a = str2[i];
        let b = str2[i+1];
        let asciiA = a.charCodeAt();
        let asciiB = b.charCodeAt();
        
        if(!(97 <= asciiA && asciiA <= 122) 
           || !(97 <= asciiB && asciiB <= 122)) continue;
        
        if(!cluster2[a+b]) cluster2[a+b] = 1;
        else cluster2[a+b]++;
    }
    
    if(Object.keys(cluster1).length === 0 && Object.keys(cluster2).length === 0) return 65536;
    // console.log(cluster1, cluster2)
    let interObj = {};
    let unionObj = {};
    for(let key in cluster1){
        // 둘 다 있으면 개수세기로 진입, 아니면 합집합에 넣음.
        if(!cluster2[key]){
            unionObj[key] = cluster1[key];
        } else {
            // 개수가 더 적은쪽을 interObj에 넣고, 큰 쪽을 unionObj에 넣음.
            if(cluster1[key] > cluster2[key]) {
                interObj[key] = cluster2[key];
                unionObj[key] = cluster1[key];
            } else{
                interObj[key] = cluster1[key];
                unionObj[key] = cluster2[key];
            }
        }
    }
    for(let key in cluster2){
        // 둘 다 있으면 개수세기로 진입, 아니면 합집합에 넣음.
        if(!unionObj[key]){
            unionObj[key] = cluster2[key];
        } 
    }
    
    // console.log(interObj, unionObj)
    
    
    let interCnt = 0;
    let unionCnt = 0;
    for(let key in interObj){
        interCnt += interObj[key];
    }
    for(let key in unionObj){
        unionCnt += unionObj[key];
    }
    
    var answer = Math.floor(interCnt / unionCnt * 65536);
    return answer;
}