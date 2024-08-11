// bfs 루프 인덱싱 어거지로 구현
function solution(x, y, n) {
  /*
  IDEAS
  1. 완전탐색?
  2. 재귀는 백퍼 스택오버플로 날거같음
  3. 큐를 활용한 bfs
  
  RULES
  연산종류
      1. * 2
      2. * 3
      3. + n
  */
  if(x === y) return 0
  
  const queue = [x]
  let cal_cnt = 0
  let flag = false
  
  let loop = 0
  let bfs_loop_cnt = 0
  while(queue.length > 0){
      // console.log("loop="+loop)
      
      const head = queue.shift()
      
      const conditions = [head*2, head*3, head+n] // mul_2, mul_3, add_n
      cal_cnt++
      // console.log("conditions: ", conditions)
      
      let inner_flag = false
      for(let condition of conditions)
          if(condition === y) {
              flag = true
              inner_flag = true
              break
          }
      if(inner_flag) break
      
      
      const stop_conditions = new Array(3).fill(false)
      let stopCnt = 0

      for(let i=0; i<conditions.length; i++){
          if(conditions[i] > y) {
              stop_conditions[i] = true
              stopCnt++
          }
      }

      if(stopCnt !== 3)
          for(let i=0; i<stop_conditions.length; i++)
              if(!stop_conditions[i]) queue.push(conditions[i])
      
      // console.log("queue:", queue)
      // console.log()
      loop++
  }
  
  let answer
  if(cal_cnt === 1){
      answer = cal_cnt
  }
  else {
      let val = 1
      let tri_loop = 0
      while(true){
          if(val + Math.pow(3, tri_loop) <= cal_cnt && cal_cnt < val + Math.pow(3, tri_loop) + Math.pow(3, tri_loop+1)) {
              answer = tri_loop+2
              break
          }
          else tri_loop++
      }
      // console.log("cal_cnt="+cal_cnt, "tri_loop="+tri_loop)
  }
  
  
  return flag === false ? -1 : answer;
}