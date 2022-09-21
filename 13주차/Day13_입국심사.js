// 코딩테스트 연습
// 이분탐색
// 입국심사

function solution(n, times) {
    /*
        1. 맨 앞사람은 비어있는 심사대에 가서 심사받을 수 있다.
        2. 심사시간이 짧은 심사대를 기다렸다가 거기서 받을 수도 있다.
        3. 모든 사람이 심사를 받는 시간을 최소로 하려고 한다.
        
        ! 제한사항
        1. 사람 수: 1명 이상, 10억 명 이하
        2. 심사관 걸리는 시간: 1분 이상 10억 분 이하
        3. 심사대 수: 1개 이상 10만 개 이하
        
        심사대: 1, 2, 3, ..., 100,000 => 1~10억분 걸림
        사람수: 1, 2, 3, ..., 100,000, ..., 100000000
    */
    
    times = times.sort((a, b) => a-b);
    let head = times[0];
    let rear = n * times[0];
    
    function binarySearch(head, rear, i=0){
        let median = head + Math.floor((rear - head) / 2);
        if(rear - head === 1) {
            console.log("i="+i, "head="+head, "rear="+rear);

            console.log();
            return rear;
        }
        
        let quotSum = 0;
        times.map(time => {
            quotSum += Math.floor(median / time);
        });
        
        console.log("i="+i, "head="+head, "median="+median, "rear="+rear);
        console.log("quotSum="+quotSum);
        console.log();
        
        if(quotSum >= n) rear = median;
        else if(quotSum < n) head = median;
        
        return binarySearch(head, rear, i+1);
    }
    
    let answer = binarySearch(head, rear);
    console.log(answer);
    return answer;
    
}
solution(	3, [1, 2, 3]);