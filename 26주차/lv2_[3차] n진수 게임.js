function solution(n, t, m, p) {
    var answer = '';
    let dec = 0
    let sayCnt = 0
    let nowSay = 1
    
    /* 
    n - 2, 4, 8, 10, 16진법
    t - 말해야 하는 숫자의 갯수
    m - 게임 참가인원
    p - 할당된 순서
    */
    
    for(sayCnt; sayCnt<t;){
        let nowNum
        nowNum = dec.toString(n).toUpperCase()
        
        for(let i=0; i<nowNum.length; i++){
            // console.log(nowNum[i])
            if(sayCnt === t) break
            if(nowSay === p) {
                sayCnt++
                answer += nowNum[i]
            }
            nowSay === m ? nowSay = 1 : nowSay++
        }
        dec++
    }
    
    
    
    return answer;
}