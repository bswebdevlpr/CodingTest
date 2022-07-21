// 코딩테스트 연습
// 2019 KAKAO BLIND RECRUITMENT
// 오픈채팅방

function solution(records) {
    const enterMsg = "님이 들어왔습니다.";
    const leaveMsg = "님이 나갔습니다.";
    
    let beforeAdd = [];
    var answer = [];
    
    let idLog = {};
    /*
        idLog = {
            유저아이디: [바꾼 닉네임 기록, ...],
            ...
        }
    */
    
    for(let record of records){
        const split = record.split(" ");
        const cmd = split[0];
        const userId = split[1];
        const nickname = split[2];
        
        switch(cmd.charAt(0)){
            case 'E':
                // 아이디 로그에 등록되어 있지 않으면 생성
                if(!idLog[userId]){
                    idLog[userId] = [];
                    idLog[userId].push(nickname);
                } 
                // 등록되어 있는 경우            
                else{
                    // 이전 닉네임과 다르면 추가
                    let history = idLog[userId];
                    if(history[history.length-1] != nickname){
                        history.push(nickname);
                    }
                }
                beforeAdd.push([nickname, enterMsg, userId]);
                break;
                
            case 'L':
                beforeAdd.push([nickname, leaveMsg, userId]);
                break;
                
            case 'C':
                idLog[userId].push(nickname);
                break;
        }
    }
    
    for(let words of beforeAdd){
        let userId = words[2];
        let nickname = idLog[userId][idLog[userId].length-1];
        answer.push(nickname + words[1]);
    }
    
    return answer;
}