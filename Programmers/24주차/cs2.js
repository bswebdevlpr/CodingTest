/*
    RULES
    1. 같은 인형 두개가 스택에 쌓이면 사라짐
    2. 1~100의 각 숫자는 인형의 모양을 의미

    GOAL: 크레인을 작동시켜 사라진 인형의 개수 구하기
*/
function solution(n, board, moves){
    // 5
    // 0 0 0 0 0
    // 0 0 1 0 3
    // 0 2 5 0 1
    // 4 2 4 4 2
    // 3 5 1 3 1
    // 1 5 3 5 1 2 1 4

    const stack = []
    let count = 0

    moves.map(loc => {
        loc--
        
        for(let row=0; row<n; row++){
            const doll = board[row][loc]
            if(doll === 0) continue
            else {
                if(stack[stack.length-1] === doll) {
                    console.log(doll, "is popped!")
                    stack.pop()
                    count += 2
                }
                else stack.push(doll)
                board[row][loc] = 0
                break
            }
        }
        
        console.log(board,"\n",stack)
        console.log()
    })

    console.log(stack, "count="+count)
}


solution(
    5, 
    [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 3],
        [0, 2, 5, 0, 1],
        [4, 2, 4, 4, 2],
        [3, 5, 1, 3, 1]
    ],
    [1, 5, 3, 5, 1, 2, 1, 4]
)