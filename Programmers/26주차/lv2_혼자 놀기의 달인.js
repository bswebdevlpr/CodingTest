function solution(cards) {
    var answer = 0;
    
    const dict = {}
    let idx = 1
    
    const check = new Array(cards.length).fill(false)
    let checkCnt = 0

    let checkTrace = 0
    while(true){
        if(checkCnt === check.length) break
        
            
        if(!dict[idx]) dict[idx] = []

        if(check[checkTrace]) {
            idx++
            console.log("idx="+idx)
            for(let i=0; i<check.length; i++){
                if(!check[i]) {
                    checkTrace = i
                    break
                }
            }
        } else{
            check[checkTrace] = true
            dict[idx].push(cards[checkTrace])
            checkCnt++

            checkTrace = cards[checkTrace] - 1
        }
    }
    console.log(dict)

    let entries = Object.entries(dict)
    entries = entries.sort(([key2, val2], [key1, val1]) => val1.length - val2.length)
    console.log(entries)

    answer = entries[0][1].length * entries[1][1].length
    console.log(answer)
    
    return answer;
}
solution([8,6,3,7,2,5,1,4])