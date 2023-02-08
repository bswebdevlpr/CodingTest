function solution(want, number, discounts) {
  var answer = 0;
  const dict = {}
  for(let i=0; i<want.length; i++){
      dict[want[i]] = number[i]
  }
  const entries = Object.entries(dict)
  // console.log(dict)
  // console.log()
  // 10일 연속
  
  let wholeCnt = 0
  for(const num of number) wholeCnt += num
  
  /*
  IDEAS
  
  PSEUDO CODE
  for discount in discounts:
      if 남아있는 개수 < wholeCnt: break
      for loop in 10:
          if dict가 discount를 key값으로 가지고 있다면:
              => object deep copy를 discount 개수만큼 해야됨. => 통과못할 가능성 다분.
  */
  for(let i=0; i<discounts.length; i++){
      if(discounts.length - i < wholeCnt) break
      
      let top10 = {}
      for(let loop=0; loop<10; loop++){
          if(!top10[discounts[i+loop]]) top10[discounts[i+loop]] = 1
          else top10[discounts[i+loop]]++
      }
      // console.log(top10)
      
      let checksum = entries.length;
      for(let loop=0; loop<entries.length; loop++){
          const [key, val] = entries[loop]
          
          if(top10[key] !== val) break
          checksum--
      }
      if(checksum === 0) answer++
  }
  
  return answer;
}