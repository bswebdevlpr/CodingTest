// 코딩테스트 연습
// 2022 KAKAO BLIND RECRUITMENT
// 주차 요금 계산


function solution(fees, records) {
    /*
    1. 누적주차시간 = 입차시간 - 출차시간
    2. 출차기록이 없으면 23:59분에 출차된 것으로 간주
    3. 요금은 시간을 일괄적으로 합해 계산
    4. 누적주차시간이 기본시간 이하이면 기본요금, 기본시간 초과이면 기본요금 + 단위시간*단위요금
        4.1) 초과시간이 단위시간으로 안나눠지면 올림
    5. return할 배열은 차량번호가 작은 자동차부터 담아야함.
    */
    
    const BASE_TIME = fees[0];
    const BASE_COST = fees[1];
    const PER_TIME = fees[2];
    const PER_COST = fees[3];
    const MAX_TIME = 23*60 + 59;
    
    let carIndex = {};
    /*
    {
        carNum: {
            time: whatTime
        }
    }
    */
    let costIndex = {};
    /*
    {
        carNum: {
            cost: howMuch
        }
    }
    */
    
    function calCost(totalTime){
        let cost = 0;
        
        if(totalTime <= BASE_TIME){
            cost = BASE_COST;
        } else {
            cost += BASE_COST;
            const overTime = totalTime - BASE_TIME;
            
            // 만약 203분, diff=23 
            const toPerMin = Math.ceil(overTime/PER_TIME);
            cost = cost + toPerMin * PER_COST;
        }
        
        return cost;
    }
    
    for(let record of records){
        const splitedRec = record.split(" ");
        
        const time = splitedRec[0];
        const carNum = splitedRec[1];
        const inOut = splitedRec[2];
        
        const splitedTime = time.split(":");
        const hour = parseInt(splitedTime[0]);
        const min = parseInt(splitedTime[1]);
        const convertedTime = parseInt(splitedTime[1]) + hour*60;
        
        // car stack
        if(inOut == "IN"){
            // 없으면 만들고, 있으면 time만 초기화
            if(!carIndex[carNum]){
                carIndex[carNum] = {
                    time: convertedTime
                }
            } else{
                carIndex[carNum].time = convertedTime;
            }
            // 없으면 만들고, 있으면 패스
            if(!costIndex[carNum]){
                costIndex[carNum] = {
                    totalTime: 0,
                    cost: 0
                }
            }
        } else if(inOut == "OUT"){
            costIndex[carNum].totalTime += (convertedTime - carIndex[carNum].time);
            delete carIndex[carNum];
        } else{
            console.error("ERROR");
        }
    }
    
    // 마감시간까지 OUT이 되지 않은 차에 대하여 연산진행
    for(let carNum in carIndex){
        costIndex[carNum].totalTime += (MAX_TIME - carIndex[carNum].time);
        delete carIndex[carNum];
    }
    
    console.log("costIndex: ", costIndex);
    let sortArray = [];
    for(let carNum in costIndex){
        costIndex[carNum].cost += calCost(costIndex[carNum].totalTime);
        sortArray.push({
            carNum: carNum,
            cost: costIndex[carNum].cost
        });
    }
    
    sortArray = sortArray.sort((left, right) => {
        return parseInt(left.carNum) - parseInt(right.carNum);
    });
    
    var answer = [];
    for(var obj of sortArray){
        answer.push(obj.cost);
    }
    console.log(answer);
    return answer;
}