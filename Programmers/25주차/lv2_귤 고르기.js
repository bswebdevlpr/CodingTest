function solution(k, tangerine) {
    var answer = 0;
    
    // k개를 고를 때 경우의 수 최소화하기
    
    const dict = {}
    tangerine.map(size => {
        dict[size] ? dict[size]++ : dict[size] = 1
    })
    // console.log(dict)
    
    let entries = Object.entries(dict)
    entries = entries.sort((ent2, ent1) => ent1[1] - ent2[1])
    // console.log(entries)
    
    let cnt = 0;
    for(let i=0; i<entries.length; i++){
        if(cnt >= k) break
        
        let [key, val] = entries[i]
        cnt += val
        answer++
    }
    
    return answer;
}