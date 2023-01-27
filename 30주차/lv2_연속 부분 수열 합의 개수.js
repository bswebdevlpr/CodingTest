function solution(elements) {
  const cases = []
  
  for(let nums=1; nums<=elements.length; nums++){
      for(let startPoint=0; startPoint<elements.length; startPoint++){
          let sum = 0
          for(let i=0; i<nums; i++){
              const index = startPoint + i > elements.length-1  ? (startPoint+i) - elements.length: startPoint + i
              sum += elements[index]
          }
          cases.push(sum)
      }
  }
  // console.log(cases)
  
  const dict = {}
  let cnt = 0
  cases.map(num => {
      if(!dict[num]){
          dict[num] = true
          cnt++
      }
  })
  
  return cnt;
}