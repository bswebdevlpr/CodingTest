function solution(numbers) {
  /*
  풀이참조
  https://velog.io/@wlals425315/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-154539-%EB%92%A4%EC%97%90-%EC%9E%88%EB%8A%94-%ED%81%B0-%EC%88%98-%EC%B0%BE%EA%B8%B0
  - index 활용 문제
  - 생각하기 어려움. 참조개념으로 가야됨.
  
  PSUEDO CODE
  ! stack은 index를 담는 배열
  모든 numbers에 대해 (index)
      while numbers[스택의 가장 끝 값] < numbers[index]
          answer[stack.pop()] = numbers[index]
      stack에 index를 push
      
  */
  var answer = new Array(numbers.length).fill(0);
  const stack = []
  
  for(let i=0; i<numbers.length; i++){
      while(stack.length > 0 && numbers[stack[stack.length-1]] < numbers[i]){
          answer[stack.pop()] = numbers[i]
      }
      stack.push(i)
  }
  for(const index of stack){
      answer[index] = -1
  }
  
  return answer;
}