// 코딩테스트 연습
// 2022 KAKAO TECH INTERNSHIP
// 두 큐 합 같게 만들기


function solution(queue1, queue2) {
    /*
        1. 두 큐의 원소합이 같도록 만든다.
        2. 최소 작업횟수 구하기. pop과 push를 합쳐 1회로 간주.
        
        ==나올 수 있는 경우의 수==
        1. queue1의 원래 원소합이 15.
        2. queue1이 모든 원소합 절반보다 작은 경우
            2.1) queue1에 queue2 원소 push * 1.
            2.2) queue1에 queue2 원소 push * 2.
        ...
        3. queue1이 모든 원소합 절반보다 큰 경우
            3.1) queue2에 queue1 원소 push * 1.
            ...
        ! 원래 queue2와 queue1이 같아지는 경우 -1을 리턴.
        
    */
    
    let pointArr = queue1.concat(queue2);
    let q1Head = 0, q2Head = queue1.length;
    let q1Rear = queue1.length-1, q2Rear = pointArr.length-1;
    
    let q1Sum  = 0, q2Sum  = 0;
    queue1.map(num => q1Sum+=num);
    queue2.map(num => q2Sum+=num);
    
    let sum = q1Sum + q2Sum;
    
    function isSame(){
        for(let i=0; i<queue2.length; i++){
            if(pointArr[q1Head+i] !== queue2[i]) return false;
        }
        
        return true;
    }
    
    let time = 0;
    while(true){
        if(q1Sum === q2Sum) break;
        
        if((q2Rear - q1Head + 1) === (pointArr.length/2)){
            if(isSame()) return -1;
        }
        
        time++;
        if(q1Sum < q2Sum){
            if(q2Head === q2Rear) return -1;
            
            let newElem = pointArr[q2Head];
            q1Sum += newElem;
            q2Sum -= newElem;
            q1Rear++;

            if(q2Head === pointArr.length-1) {
                q2Head=0;
            } else{
                q2Head++;
            }
        } else{
            if(q1Head === q1Rear) return -1;
            
            let newElem = pointArr[q1Head];
            q1Sum -= newElem;
            q2Sum += newElem;
            q1Head++;
            q2Rear === pointArr.length-1 ? q2Rear=0 : q2Rear++;
        }
        
        // console.log("time="+time, "\nq1Head="+q1Head, "q1Rear="+q1Rear, "\nq2Head="+q2Head, "q2Rear="+q2Rear);
        // console.log(pointArr);
    }

    return time;
}

solution([1, 1], [1, 5]);