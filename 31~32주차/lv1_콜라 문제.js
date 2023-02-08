function solution(a, b, n) {
  var answer = 0;
  
  function getCola(rest){
      if(a > rest) return
      const quot = Math.floor(rest / a)
      const rem = rest % a
      answer += quot*b
      
      return getCola(quot*b+rem)
  }
  getCola(n)
  
  return answer;
}