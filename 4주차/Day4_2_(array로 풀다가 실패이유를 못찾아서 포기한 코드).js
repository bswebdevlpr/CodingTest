// 코딩테스트 연습
// 2021 카카오 채용연계형 인턴십
// 표 편집
// array로 풀었고 실패이유를 못찾겠어서 포기한 코드

function solution(n, k, cmd) {
    /*
    처음 표 행 개수 = n,
    처음 선택된 행의 위치 = k,
    명령어 리스트 = cmd
    
    모든 명령어 수행 후 처음 주어진 표의 상태와 비교하여 O, X로 return하는 문자열 return.
    */
    // console.log(cmd);
    // === 변수 정의 ====
    let list = [];
    let present = k;  // present는 list 내에서 가르키는 현재 위치.
    let deletedStack = [];  // 삭제되기 전 index 위치를 담고 있는 stack list.
    
    let deletedValStack = [];
    let isBeing = [];
    
    for(let i=0; i<n; i++){
        list[i] = i;
        isBeing[i] = "O";
    }
    
    function deleteElem(index){
        // index가 overranged 되면
        if(!list[index]){ 
            console.log("List arrange error");
            return;
        }
        
        // 해당 값의 현재상태 변경
        isBeing[list[index]] = "X";
        deletedStack.push(index); // list상에서 변경된 index 값
        deletedValStack.push(list[index]); // 위 index에서 저장하고 있던 실제 값
        
        
        // index 전, index 후 list를 생성해서 index를 제외한 list끼리 이어붙임.
        let headList = list.slice(0, index);
        let rearList;
        
        // 만약 index가 list의 끝에 존재할 경우(지울 값이 list의 마지막 행이면) 빈 array를 rearList에 할당.
        if(index == list.length-1){
            rearList = [];
        } else{
            rearList = list.slice(index+1, list.length);
        }
        
        list = headList.concat(rearList);
    }
    
    function restoreElem(){
        
        let index = deletedStack.pop();  // 지워지던 당시 index
        let indexVal = deletedValStack.pop();  // index가 가지던 값
        
        // console.log("restored");
        // console.log("index=",index);
        isBeing[indexVal] = "O";
        
        // 만약 복구해야 하는 index 값이 현재 list의 length를 넘으면 말미에 붙여줌.
        if(index > list.length){
            index = list.length;
        }
        
        let headList = list.slice(0, index);
        headList.push(indexVal);
        let rearList;
        if(index == list.length){
            rearList = [];
        } else{
            rearList = list.slice(index, list.length);
        }
        
        list = headList.concat(rearList);
        
        return index; // restore 된 index를 return
    }
    
    // === 커맨드 구분 및 실행 함수 ===
    function sortCmd(cmd){
        let result;
        
        if(cmd.startsWith('U')){
            // 명령어 "U X"
            const cmdSplit = cmd.split(" ");
            const inputNum = parseInt(cmdSplit[1]);
            
            // 표의 범위를 벗어나는 이동은 입력으로 주어지지 않으므로 제한사항 구현 X
            present -= inputNum;
            
        } else if(cmd.startsWith('D')){
            // 명령어 "D X"
            const cmdSplit = cmd.split(" ");
            const inputNum = parseInt(cmdSplit[1]);
            
            present += inputNum;
            
        } else if(cmd.startsWith('C')){
            // 명령어 "C"
            const lastRowLoc = list.length - 1;
            deleteElem(present);
            
            // 만약 현재 위치가 마지막 행이라면 
            if(present == lastRowLoc) present -= 1;
            
        } else if(cmd.startsWith('Z')){
            // 명령어 "Z"
            const restoredIdx = restoreElem();
            
            if(present > restoredIdx && restoredIdx != null) present += 1;
        }
    }
    
    // === 각 커맨드 실행 ===
    for(const command of cmd){
        sortCmd(command);
        console.log("CMD =", command);
        console.log("CMD RESULT: ");
        console.log("list: ", list);
        console.log("deletedStack: ", deletedStack);
        console.log("deletedValStack: ", deletedValStack)
        console.log("present =", present);
        console.log("isBing =", isBeing.join(""), '\n');
    }
    
    // console.log(list, isBeing, deletedStack);
    
    var answer = isBeing.join("");
    return answer;
}