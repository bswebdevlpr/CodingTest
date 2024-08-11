function solution(n)
{
    /*
    Goal - 거리 N을 이동할 때 최소 연료 사용량을 구하라.
    
    Rules
    1. 한번에 K칸 이동 또는 현재까지 온 거리 x 2에 해당하는 위치로 순간이동.
    2. 순간이동은 연료사용 X, K칸 만큼 점프는 K만큼의 연료 사용.
    
    Ideas
    1. 각 숫자에 도달하는 최소 횟수가 정해져있는듯.
    2. 2로 나눈 몫을 먼저 만들고
    3. 나머지를 1 더한다.
    4. 나머지가 생기는 횟수?가 규칙인듯.
    */
    
    let cnt = 1;
    // 2인 경우 마지막에 생각
    while(n !== 1){
        if(n % 2 === 1) cnt++;
        n = Math.floor(n / 2);
        // console.log(n);
    }
    
    return cnt;
    
}