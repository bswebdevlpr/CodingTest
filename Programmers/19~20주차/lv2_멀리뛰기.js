function solution(n) {
    let fibo1 = 0;
    let fibo2 = 1;
    let fibo3 = fibo1 + fibo2;
    let OPERATOR = 1234567;
    
    // (A + B) % C ≡ ( ( A % C ) + ( B % C) ) % C
    for(let i=2; i<=n; i++){
        fibo1 = fibo2 % OPERATOR;
        fibo2 = fibo3 % OPERATOR;
        fibo3 = (fibo1 + fibo2) % OPERATOR;
    }
    
    return fibo3 % 1234567;
}