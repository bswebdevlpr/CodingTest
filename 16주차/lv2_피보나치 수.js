function solution(n) {
    let fibo1 = 0;
    let fibo2 = 1;
    let fibo3;
    let OPER = 1234567;
    
    // (A + B) % C ≡ ( ( A % C ) + ( B % C) ) % C
    for(let i=2; i<=n; i++){
        fibo3 = (fibo1 + fibo2) % OPER;
        fibo1 = fibo2 % OPER;
        fibo2 = fibo3 % OPER;
    }
    
    let answer = fibo3;
    
    return answer;
}