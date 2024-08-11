function solution(n, left, right) {
    var answer = []
    let pointer = 0
    
    for(let i=left; i<=right; i++){
        const row = Math.floor(i / n) + 1
        const col = i % n + 1
        
        answer.push(row > col ? row : col)
    }
    
    
    return answer
}