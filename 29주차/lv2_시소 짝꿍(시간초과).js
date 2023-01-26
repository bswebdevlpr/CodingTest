// 최소공배수 활용한 풀이
// 시간복잡도: O(n^2)
// 아래 주석코드는 런타임에러

function solution(weights) {
    /*
    GOAL: [2, 3, 4] - weights 간 경우의 수 중 조건에 해당하는 모든 경우 구하기.
    */
    var answer = 0;
    const dict = {}
    
    function GCD(a, b){
        if(a % b === 0) return b
        
        return GCD(b, a % b)
    }
    function LCM(a, b){
        return (a * b) / GCD(a, b)
    }
    
    for(let outer_loop=0; outer_loop<weights.length-1; outer_loop++){
        const compare = weights[outer_loop]
        if(!dict[compare]) dict[compare] = {}
        
        for(let i=outer_loop+1; i<weights.length; i++){
            const compared = weights[i]
            if(!dict[compared]) dict[compared] = {} // 짝꿍X=-1, 짝꿍O=1
            
            if(dict[compare][compared]) {
                if(dict[compare][compared] === 1) answer++
                continue
            }
            // console.log(compare, "<=>", compared)
            
            if(compare === compared){
                answer++
                dict[compare][compared] = 1
                dict[compared][compare] = 1
                // console.log("Increase answer: compare === compared")
                continue
            } 

            let bigger, smaller
            if(compare > compared) {
                bigger = compare
                smaller = compared
            } else {
                bigger = compared
                smaller = compare
            }
            
            if(smaller*4 < bigger*2) {
                dict[compare][compared] = -1
                dict[compared][compare] = -1
                continue
            }
            else {
                const lcm = LCM(bigger, smaller)
                
                if(bigger <= lcm && lcm <= smaller*4) {
                    // console.log("Increase answer: in range")
                    dict[compare][compared] = 1
                    dict[compared][compare] = 1
                    answer++
                } else {
                    dict[compare][compared] = -1
                    dict[compared][compare] = -1
                }
                
                // console.log("lcm="+lcm)
            }    
                // console.log()
        }
    }
    
    return answer;
}
    
//     function combination(left){
//         // 더 큰수*2, 더 작은수*4의 최소 공배수 구하고, 결과값이 두 수 사이의 값이면 answer++
//         if(left.length === 0) return
        
//         const compare = left.shift()
//         for(let i=0; i<left.length; i++){
//             const compared = left[i]
//             // console.log(compare, "<=>", compared)
//             if(compare === compared){
//                 answer++
//                 // console.log("Increase answer: compare === compared")
//                 continue
//             } 

//             let bigger, smaller
//             if(compare > compared) {
//                 bigger = compare
//                 smaller = compared
//             } else {
//                 bigger = compared
//                 smaller = compare
//             }
            
//             if(smaller*4 < bigger*2) continue
//             else {
//                 const lcm = LCM(bigger, smaller)
                
//                 if(lcm < smaller){
//                     // console.log("Error: lcm is smaller than variable 'smaller'")
//                     return
//                 }
//                 else if(lcm <= bigger*4) {
//                     // console.log("Increase answer: in range")
//                     answer++
//                 }
                
//                 // console.log("lcm="+lcm)
//             }    
//                 // console.log()
//         }
        
//         return combination(left)
//     }
//     combination(weights)
    