function solution(genres, plays) {
    /*
    고유번호 - 인덱스
    
    Pseudo Code
    1. 총 재생수가 많은 장르 먼저 수록
    2. 장르 내에서 많이 재생된 노래의 인덱스를 먼저 수록
    3. 1, 2번을 만족하는 경우 중 고유번호가 낮은 노래를  먼저 수록.
    
    
    */
    
    var answer = [];
    let hashTable = {};
    
    genres.map((genre, index) => {
        if(!hashTable[genre]){
            hashTable[genre] = {
                total: plays[index],
                indexes: [index]
            };
        } else {
            hashTable[genre].total += plays[index];
            hashTable[genre].indexes.push(index);
        }
    });
    // console.log(hashTable);
    // console.log();
    
    let hashEntries = Object.entries(hashTable);
    for(let [key, val] of hashEntries){
        let sorted = val.indexes.sort((a, b) => plays[b] - plays[a]);
        // console.log(sorted);
        // console.log(key, val)
        // console.log(key, hashTable[key])
        hashTable[key].indexes = sorted;
    }
    // console.log(hashTable);
    
    // arr: [genre, object]
    hashEntries = Object.entries(hashTable).sort((arr1, arr2) => arr2[1].total - arr1[1].total);
    // console.log(hashEntries);
    
    hashEntries.map(([key, val]) => {
        for(let i=0; i<val.indexes.length; i++){
            if(i > 1) break;
            answer.push(val.indexes[i]);
        }
    })
    // console.log(answer);
    
    return answer;
}