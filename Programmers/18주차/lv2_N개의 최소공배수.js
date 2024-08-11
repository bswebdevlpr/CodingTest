function solution(arr) {
    /*
        최대공약수와 최소공배수의 성질을 이용하면 쉽게 구할 수 있습니다.
        GCD = 최대공약수
        LCM = 최소공배수
        두 수 (a, b)의 최소공배수는 어떻게 구하는가?
        a x b = GCD * LCM입니다.

        [유클리드 호제법]
        두 수 a, b가 있을 때 (a > b)
        a % b == 0이면 b가 GCD입니다.
        a % b != 0이면 (c = a % b라고 할 때)

        b % c를 구해서 0이 나올때까지 반복합니다.
    */
    
    // 두 수의 최소공배수를 arr 순으로 계속 구하면 답이 나오지 않을까?
    arr = arr.sort((a, b) => b - a);
    
    let lcm = arr[0];
    
    for(let i=1; i<arr.length; i++){
        // console.log("i="+i);
        let n2 = arr[i];
        let mul = lcm * n2;
        
        while(lcm % n2 !== 0){
            let remainder = lcm % n2;
            lcm = n2;
            n2 = remainder;
            // console.log(lcm, n2);
        }
        let gcd = n2;
        lcm  = mul / gcd;
        // console.log("mul="+mul, "gcd="+gcd);
        
        // console.log("lcm="+lcm);
    }
    
    return lcm;
}

solution([2,6,8,14]	)