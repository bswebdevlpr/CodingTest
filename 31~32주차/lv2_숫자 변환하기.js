function solution(x, y, n) {
  /*
  IDEAS
  1. 완전탐색?
  2. 재귀는 백퍼 스택오버플로 날거같음
  3. 큐를 활용한 bfs
  4. bfs + DP? 메모이제이션 써보자. + 인덱스 확인
  5. 불필요한 인덱스세기를 딕셔너리 value로 변경, shift를 포인터 방식으로 변경
      => 해결. shift가 확실히 cost를 많이 씀.
  
  RULES
  연산종류
      1. * 2
      2. * 3
      3. + n
  
  PSEUDO CODE
  
  */
  const dict = {}
  dict[x] = 0
  
  let leftNodeCnt = 1
  let depth = 0
  
  const queue = [x]
  let pointer = 0
  let flag = false
  
  // let test = 0
  // while(queue.length > 0) {
  while(pointer < queue.length){
      // test++
      // console.log("test="+test)
      // if(test === 30) break
      
      const head = queue[pointer]
      if(head === y) {
          depth = dict[head]
          flag = true
          // console.log("Finded!", head)
          break
      } 
      else if(head > y) {
          // queue.shift()
          pointer++
          continue
      }
      
      if(!dict[head+n]) {
          dict[head+n] = dict[head]+1
          queue.push(head+n)
      }
      if(!dict[head*2]) {
          dict[head*2] = dict[head]+1
          queue.push(head*2)
      }
      if(!dict[head*3]) {
          dict[head*3] = dict[head]+1
          queue.push(head*3)
      }
      
      // queue.shift()
      pointer++
      
      // console.log(queue)
      // console.log(dict)
      // console.log()
  }
  
  return flag ? depth : -1
}