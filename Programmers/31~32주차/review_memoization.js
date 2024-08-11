function fibo_memoization(n){
  if(memo[n] !== -1) return memo[n]

  if(n === 0) return memo[n] = 0
  else if(n === 1) return memo[n] = 1

  // console.log("n="+n, "못들어오니?")

  return memo[n] = fibo_memoization(n-1) + fibo_memoization(n-2)
}

let n = 10

let memo = new Array(n).fill(-1)
let result = fibo_memoization(n-1)

console.log(memo)