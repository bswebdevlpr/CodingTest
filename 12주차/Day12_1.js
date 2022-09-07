// 코딩테스트 연습
// 2017 팁스타운
// 예상 대진표


function solution(n,a,b)
{
    /*
        1,2 -> 1, 3,4 -> 2...
        짝수면 몫, 홀수면 몫+나머지
    */
    
    function nextRound(entry){
        let result;
        if(entry % 2 === 1){
            result = Math.floor(entry / 2) + 1;
        } else {
            result = entry / 2;
        }
        return result;
    }
    
    let round = 1;
    while(n !== 1){
        if(a % 2 === 1 || b % 2 === 1){
            let odd, even;
            if(a % 2 === 1) odd = a, even = b;
            else odd = b, even = a;
            
            // console.log(odd, even);
            
            if(odd+1 === even) break;
        }
        
        round++;
        a = nextRound(a);
        b = nextRound(b);
        
        // console.log("a="+a, "b="+b);
        n = n/2;
    }

    return round;
}