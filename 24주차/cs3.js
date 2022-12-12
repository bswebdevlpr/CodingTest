/*
    RULES
    1. 쇠막대기는 자신보다 긴 막대 위에 놓을 수 있으며, 끝점은 겹치지 않아야 한다.
    2. 각 쇠막대를 자르는 레이저가 하나는 존재한다.
    3. 레이저는 어떤 쇠막대의 양 끝점과도 겹치지 않는다.

    IDEAS
    1. 레이저를 만났을 때 이전에 나오면 한조각 추가
    2. 레이저 다음 레이저가 나오면 stack에 존재하는 '(' 개수당 하나씩 추가
    3. 레이저 다음 닫는 괄호가 나왔을 때 한조각 추가하고 shift
*/

function solution(input){
    const stack = []
    let cnt = 0
    let prev

    for(let i=0; i<input.length; i++){
        console.log("i="+i)

        const c = input[i]
        
        if(prev === '(' && c === ')'){
            // 레이저
            stack.pop()
            for(const elem of stack){
                if(elem === ')'){
                    console.log("ERROR!")
                    return
                } else cnt++
            }
            console.log("LASER POPPED!", "cnt="+cnt)
        } else{
            if(c === ')'){
                cnt++
                stack.pop()
                console.log("BAR POPPED!")
            } else stack.push(c)
        }
        
        prev = c

        console.log(stack)
        console.log()
    }

    console.log(stack, "cnt="+cnt)
}

solution("()(((()())(())()))(())") // 17
solution("(((()(()()))(())()))(()())") // 24