function solution(numbers) {
  var answer = [];
  const stack = numbers.reverse()
  
  let tail = numbers.length-1
  let pointer = numbers.length-2
  
  function brief(){
      stack.pop()
      tail = stack.length-1
      pointer = stack.length - 2
  }
  
  let loop = 0
  while(stack.length > 0){
    console.log(loop)
    if(pointer === -1){
        answer.push(-1)
        brief()
    }
    else if(stack[tail] < stack[pointer]) {
        answer.push(stack[pointer])
        brief()
    } else {
        pointer--
    }

    console.log(answer, stack, pointer)
    console.log()
    loop++
  }
  
  return answer;
}
solution([9, 1, 5, 3, 6, 2])
