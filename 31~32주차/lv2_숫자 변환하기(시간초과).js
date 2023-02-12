function solution(x, y, n) {
  /*
  IDEAS
  1. 완전탐색?
  2. 재귀는 백퍼 스택오버플로 날거같음
  3. 큐를 활용한 bfs
  4. bfs + 메모이제이션 + 인덱스 확인
  
  RULES
  연산종류
      1. * 2
      2. * 3
      3. + n
  
  PSEUDO CODE
  
  */
  const dict = {}
  
  let depth = 0
  let leftNodeCnt = 1
  
  const queue = [[x, depth]]
  let flag = false
  
  // let test = 0
  while(queue.length > 0) {
      // test++
      // console.log("test="+test)
      // if(test === 30) break
      
      const head = queue[0][0]
      if(head === y) {
          flag = true
          depth = queue[0][1]
          // console.log("Finded!", head)
          break
      } 
      else if(head > y) {
          queue.shift()
          continue
      }
      
      if(depth !== queue[0][1]) depth = queue[0][1]
      
      if(!dict[head+n]) {
          dict[head+n] = true
          queue.push([head+n, depth+1])
      }
      if(!dict[head*2]) {
          dict[head*2] = true
          queue.push([head*2, depth+1])
      }
      if(!dict[head*3]) {
          dict[head*3] = true
          queue.push([head*3, depth+1])
      }
      
      queue.shift()
      
      // console.log(queue)
      // console.log()
  }
  
  return flag ? depth : -1
}