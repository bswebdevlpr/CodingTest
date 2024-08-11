function solution(routes) {
    /*
    ==Ideas==
    1. routes[0] = 0번 차량이 -20에 진입해서 -15에 나감.
    2. 프로세스 파이프라인 문제랑 비슷한듯.
    */
    routes = routes.sort((a, b) => a[0] - b[0]);
    // console.log(routes);
    
    let camCnt = 0;
    let stack = [routes[0]]; // for log
    
    /*
    ==Pseudo Code==
    1. 시작점을 기준으로 sort.
    2. 첫 번째 route의 시작점과 종료점을 저장.
    3. 다음 프로세스에 대해 시간축을 진행.
        3.1) 다음 프로세스가 기존 프로세스의 진행기간에 포함되고, 종료지점이 기존 종료지점보다 멀다면 continue.
        (다음 프로세스의 시작점이 기존 프로세스의 종료점보다 이르고, 기존 프로세스의 종료점이 다음 프로세스의 종료지점보다 이르면 기존 프로세스를 유지.)
        3.2) 3.1이 아닌 경우 다음 프로세스로 포인터를 이동.
            3.2.1) 다음 프로세스가 기존 프로세스에 포함되는 경우, camCnt 유지.
            3.2.2) 다음 프로세스가 기존 프로세스에 포함되지 않는 경우, camCnt에 1을 더함.
        
    */
    let out = routes[0][1];
    
    for(let i=1; i<routes.length; i++){
        let newCame = routes[i][0];
        let newOut = routes[i][1];
        
        // 기존 프로세스가 새 프로세스에 포함되고, 끝나는 시점이 더 이른 경우 기존 프로세스를 유지.
        if(newCame > out){
            // 새 프로세스가 기존 프로세스와 연관이 없는 경우.
            // 이 경우에만 카메라 설치가 발생해야함.
            camCnt++;
            // console.log(stack, "camCnt="+camCnt);
            out = newOut;
            stack = [];
            stack.push(routes[i]);
        } else if(newOut < out){
            // 새 프로세스가 이전 프로세스보다 더 빨리 끝나는 경우.
            // 새 프로세스를 기존 프로세스로 갱신.
            stack.push(routes[i]);
            out = newOut;
        } else {
            stack.push(routes[i])
        }
    }
    // console.log(stack)
    if(stack.length > 0) camCnt++;
    
    return camCnt;
}