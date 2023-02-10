    // function fibo(k){
    //     let fibo0 = 0, fibo1 = 1;
    //     let fibo2;

    //     console.log(fibo1);
    //     for(let i=1; i<k; i++){
    //         fibo2 = fibo0 + fibo1;
    //         console.log(fibo2);   
    //         fibo0 = fibo1;
    //         fibo1 = fibo2;
    //     }
    // }

let memo = [0];
function fibo_memoization(n){
    if(memo[n] > 0) return memo[n];
    if(n === 2 || n === 1) return memo[n] = 1;
    
    return memo[n] = fibo_memoization(n-1) + fibo_memoization(n-2);
}

let n = 10
// fibo(10);
fibo_memoization(n);
console.log(memo);