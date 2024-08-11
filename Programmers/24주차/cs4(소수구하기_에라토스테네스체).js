
function eratos(n) {
  let isPrime = new Array(n).fill(true)
  for(let num=2; num<=n; num++){
    if(!isPrime[num]) continue;
    
    let operand = 2;
    while(num * operand <= n){
      isPrime[num*operand] = false
      operand++
    }
  }

  let returnArr = []
  for(let i=0; i<isPrime.length; i++) {
    if(isPrime[i]) returnArr.push(i)
  }

  return returnArr
}

const result = eratos(100)

console.log(result)