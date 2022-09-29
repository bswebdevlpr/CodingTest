function solution(k, dungeons) {
    /*
    unpassed를 for loop 돌려 본인을 제외한 던전을 담은 array를 새로 담아 bfSearch를 호출한다.
    */
    function bfSearch(k, unpassed, max=0, prev=[]){
        // console.log("Depth="+max, prev);
        // console.log();
        let explorable = [];
        
        if(unpassed.length === 0) return [max];
        
        for(let i=0; i<unpassed.length; i++){
            let dungeon = unpassed[i];
            
            if(k < dungeon[0]){
                explorable.push(max);
                continue;
            } else{
                let newK = k - dungeon[1];
                let newUnpassed = [];
                let newMax = max + 1;
                for(let j=0; j<unpassed.length; j++){
                    if(j !== i) newUnpassed.push(unpassed[j]);
                }

                let result = bfSearch(newK, newUnpassed, newMax, [...prev, dungeon]);
                explorable = [...explorable, ...result];
            }
        }
        
        return explorable;
    }
    let result = bfSearch(k, dungeons);
    // console.log(result);
    
    return Math.max(...result);
}