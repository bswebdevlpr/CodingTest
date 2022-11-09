function solution(A, B) {
    /*
        RULES
        1. 모든 사원은 자연수 하나를 부여받음.
        2. 각 사원은 딱 한번 경기를 진행.
        3. 각 경기당 각팀에서 한명씩 나와 서로의 수를 공개하고, 숫자가 큰 쪽이 1점을 얻음.
        4. 숫자가 같으면 점수 X.
        
        GOAL: B팀이 A팀의 엔트리를 보고 얻을 수 있는 최고 승점을 구해라.
            => 이기는 경우가 가장 많은 경우의 수를 구해라.
           
        IDEAS
        1. 어떻게 해야 가장 많이 이길 수 있을까...
        2. 1차 시도 dfs
        3. 2차 시도 sort & queue
    */
    
    A = A.sort((a, b) => a - b);
    B = B.sort((a, b) => a - b);
    let A_idx = 0;
    let B_idx = 0;
    
    let cnt = 0;
    
    while(B_idx !== B.length){
        let aHead = A[A_idx];
        let bHead = B[B_idx];
        
        if(bHead > aHead){
            cnt++;
            A_idx++;
        }
        B_idx++;
    }
    return cnt;
}