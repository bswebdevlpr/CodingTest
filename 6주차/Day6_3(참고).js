// https://velog.io/@longroadhome/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-LV.3-%EC%B6%94%EC%84%9D-%ED%8A%B8%EB%9E%98%ED%94%BD-JS
// 코딩테스트 연습
// 2018 KAKAO BLIND RECRUITMENT
// [1차] 추석 트래픽

function solution(logs) {
    /*
    - 모든 로그에 대하여 끝나는 시간부터 1초 이내에 다른 로그의 시작 시간이 들어오는지 파악.
    - 오름차순이므로 들어오지 않는 로그가 발견되었다면 루프 break.
    - 마지막 몇가지 로그에 대하여 최대값보다 로그량이 적다면 return.
    */
    let timeTable = [];
    
    if(logs.length == 1) return 1;
    
    function calStartTime(log){
        const split = log.split(" ");
        const [year, month, day] = split[0].split('-');
        const [hour, min, sec] = split[1].split(":");
        let throughput = split[2];
        throughput = 1000*parseFloat(throughput.substring(0, throughput.length-1));
        
        let amountTime = 1000*3600*parseInt(hour) + 1000*60*parseInt(min) + 1000*parseFloat(sec);
        let startTime = amountTime - throughput + 1;
        
        return [
            startTime,
            amountTime + 999
        ];
    }
    // let test1 = calStartTime(logs[0]);
    // let test2 = calStartTime(logs[1]);
    // console.log(test1, test2)
    
    for(let log of logs){
        let [startTime, finTime] = calStartTime(log);
        timeTable.push({index: "start", time: startTime});
        timeTable.push({index: "fin", time: finTime});
    }
    timeTable = timeTable.sort((a, b) => a.time != b.time ? a.time - b.time : -1);
    console.log(timeTable);
    
    let max = 0;
    let count = 0;
    timeTable.forEach((obj) => {
        if(obj.index == 'start') count++;
        else count--;
        
        max = Math.max(count, max);
    });
    
    var answer = max;
    return answer;
}