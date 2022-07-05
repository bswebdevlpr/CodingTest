// 코딩테스트 연습
// 스택/큐
// 기능개발


function solution(progresses, speeds) {
    /*
    1. 뒤에 기능은 앞 기능이 완료되어야 배포가능함.
    2. 배포는 100%일 때 가능.
    */
    
    let result = [];
    let completeIndex = {};
    let count = 0;
    let totalCount = 0;
    
    for(let i=0; i<speeds.length; i++){
        completeIndex[i] = false;
    }
    // console.log(completeIndex);
    
    let i = 1;
    while(totalCount < progresses.length){
        for(let i=0; i<progresses.length; i++){
            // 만약 달성률 100에 도달했을 때,
            if(progresses[i] >= 100){
                // 배포되지 않은 상태라면
                if(completeIndex[i] == false){
                    // 만약 첫번째 요소이거나, 앞 기능이 이미 배포되었다면
                    // 배포완료 인덱스를 true로 전환하고 count를 ++한다.
                    if(completeIndex[i-1] == undefined || completeIndex[i-1] == true){
                        console.log("i="+i, "completeIndex[i-1]="+completeIndex[i-1]);
                        console.log("completeIndex[0]="+completeIndex[0])
                        completeIndex[i] = true;
                        count++;
                    }
                } else{ // 아니면 배포할 수 없으므로 다음 기능으로
                    continue;
                }
            } else{
                progresses[i] += speeds[i];
            }
        }
        if(count > 0)
            result.push(count);
        totalCount += count;
        
        console.log("STEP "+i);
        console.log("progresses:", progresses);
        console.log("count="+count, "totalCount="+totalCount);
        console.log("result:", result);
        // console.log(completeIndex);
        count = 0;
        i += 1;
    }
    
    var answer = result;
    return answer;
}