function solution(number) {
    
    function permutation(left, depth=0){
        const result = []
        if(depth === 2){
            for(let i=0; i<left.length; i++){
                result.push([left[i]])
            }
            return result
        }
        
        depth++
        
        for(let i=0; i<left.length; i++){
            const newLeft = [...left.slice(i+1)]
            
            const recur =  permutation(newLeft, depth)
            for(let j=0; j<recur.length; j++){
                result.push([left[i], ...recur[j]])
            }
        }
        
        return result
    }
    
    let permu = permutation(number)
    // console.log(permu)
    
    permu = permu.filter(arr => {
        let sum = 0
        arr.map(num => sum += num)
        
        return sum === 0 ? true : false
    })
    // console.log(permu)
    
    return permu.length;
}