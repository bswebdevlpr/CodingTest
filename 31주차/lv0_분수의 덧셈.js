function solution(numer1, denom1, numer2, denom2) {
  var answer = [];
  
  let smaller, bigger
  if(denom1 > denom2) {
      bigger = denom1
      smaller = denom2
  } else {
      bigger = denom2
      smaller = denom1
  }
  
  function gcd(a, b) {
      if(a % b === 0) return b
      
      return gcd(b, a % b)
  }
  function lcm(a, b) {
      return (a * b) / gcd(a, b)
  }
  
  const lcm_val = lcm(bigger, smaller)
  // console.log(lcm_val)
  
  if(denom1 !== lcm_val) {
      numer1 *= (lcm_val / denom1)
  }
  if(denom2 !== lcm_val) {
      numer2 *= (lcm_val / denom2)
  }
  
  let new_numer = numer1 + numer2
  let new_denom = lcm_val
  if(new_numer > new_denom) {
      bigger = new_numer
      smaller = new_denom
  } else {
      bigger = new_denom
      smaller = new_numer
  }
  let if_gcd = gcd(bigger, smaller)
  
  if(if_gcd !== 1){
      new_numer /= if_gcd
      new_denom /= if_gcd
  }
  answer.push(new_numer)
  answer.push(new_denom)
  
  return answer;
}