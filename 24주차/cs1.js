function solution(input){
    let flag = true
    const stack = []

    for(let i=0; i<input.length; i++){
        const c = input[i]
        if(stack.length === 0) stack.push(c)
        else {
            if(c === ')'){
                if(stack.pop() !== '(') {
                    flag = false
                    break
                }
            } else {
                stack.push(c)
            }
        }
        // console.log(stack)
    }

    if(flag && stack.length === 0) console.log("YES")
    else console.log("NO")
}

solution("(()(()))(()")