
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
        const throughput = split[2];
        
        let amountTime = 3600*parseInt(hour) + 60*parseInt(min) + parseFloat(sec);
        let startTime = amountTime - parseFloat(throughput.substring(0, throughput.length-1)) + 0.001;
        startTime = startTime.toFixed(3);
        
        return {
            startTime: startTime,
            finTime: amountTime,
            throughput: throughput
        }
    }
//     let test1 = calStartTime(logs[0]);
//     let test2 = calStartTime(logs[1]);
//     console.log(test1, test2)
    
    for(let log of logs){
        timeTable.push(calStartTime(log));
    }
    // console.log(timeTable);
    timeTable = timeTable.sort((a, b) => {return a.startTime - b.startTime});
    // console.log(timeTable);
    
    let max = 0;
    for(let i=0; i<timeTable.length; i++){
        let iFinTime = timeTable[i].finTime;
        let processes = 1;
        let finToOne = (iFinTime + 0.999).toFixed(3);
        // console.log("i="+i, "iFinTime="+timeTable[i].finTime, "finToOne="+finToOne);
        
        for(let j=i+1; j<timeTable.length; j++){
            let jStartTime = timeTable[j].startTime;
            let jFinTime = timeTable[j].finTime;
            if(jStartTime > finToOne) continue;
            
            let jMiddle = (jFinTime - jStartTime)/2;
            if((iFinTime <= jFinTime && jFinTime <= finToOne) ||
              (iFinTime <= jStartTime && jStartTime <= finToOne)){
                // console.log("j="+j);
                processes++;
            } else if(jStartTime <= iFinTime && jFinTime >= finToOne){
                // console.log("j="+j);
                processes++;
            }
        }
        // console.log("processes="+processes);
        if(processes >= max){
            max = processes;
        }
    }
    
    var answer = max;
    return answer;
}