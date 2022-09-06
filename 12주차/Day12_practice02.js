// 코딩테스트 연습
// 탐욕법(Greedy)
// 구명보트

function solution(people, limit) {
    people = people.sort((a, b) => b - a);
    
    let time = 0;
    let head = 0;
    let rear = people.length - 1;
    while(true){
        if(head === rear) {
            time++;
            break;
        }
        
        let flag = people[head] + people[rear];
        if(flag > limit){
            // console.log("head="+head, people[head]);
            head++;
        } else if(flag <= limit){
            // console.log("head="+head, "rear="+rear, people[head], people[rear]);
            if(head+1 === rear){
                time++; break;
            } else{
                head++;
                rear--;
            }
        }
        time++;
        // console.log("time="+time)
    }
    
    
    return time;
}