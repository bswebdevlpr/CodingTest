/*
참고 블로그
https://velog.io/@tnehd1998/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-%ED%91%9C-%ED%8E%B8%EC%A7%91-JavaScript

1차수정(알고리즘 제외)
1. LinkedList: class -> function
2. 기능구현 및 실행: 함수참조 -> 바로 코드입력
3. cmd 탐색: for문 -> Array.map
4. (해결) delete와 restore 내에 불필요한 위치서칭을 제거했더니 해결됨.
*/

const LinkedList = function(index, prev) {
    this.index = index;
    this.prev = prev;
    this.next = null;
};

function solution(n, k, cmd) {
/*
처음 표 행 개수 = n,
처음 선택된 행의 위치 = k,
명령어 리스트 = cmd

모든 명령어 수행 후 처음 주어진 표의 상태와 비교하여 O, X로 return하는 문자열 return.
*/

// === 변수 정의 ====
let deletedStack = [];  // 삭제되기 전 정보를 기억하고 있는 stack list.
let isBeing = Array(n).fill("X");  // 모든 cmd를 실행한 후 연결되어 있는 index의 위치만 O로 표시해줌.

let root = new LinkedList(0, null); // root ~ n-1 까지 link 된 list를 생성.
let here = root;
let prev = root;
let next = root;
let present = root;

for(let i=1; i<n; i++){
    const newLinkedList = new LinkedList(i, prev);
    prev.next = newLinkedList;
    prev = newLinkedList;
    
    if(i == k){
        present = newLinkedList;
    }
}


cmd.map((curCmd) => {
    const cmdAlp = curCmd.charAt(0);
    let inputNum;
    
    switch(cmdAlp){
        case 'U': 
            // 명령어 "U X"
            inputNum = parseInt(curCmd.substring(2));
        
            for(let i=0; i<inputNum; i++){
                present = present.prev;
            }
            break;
            
        case 'D':
            // 명령어 "D X"
            inputNum = parseInt(curCmd.substring(2));

            for(let i=0; i<inputNum; i++){
                present = present.next;
            }
            break;
            
        case 'C':
            // 명령어 "C"
            here = present;

            deletedStack.push(here);  // 현재 위치를 deletedStack에 넣고

            prev = here.prev;
            next = here.next;

            // 첫 번째 요소인 경우
            if(prev == null){
                root = next;  // root를 다음 노드로 옮겨주고
                root.prev = null;  // root의 prev를 null으로 초기화

                here = root;

            } else {
                // 마지막 요소인 경우
                if(next == null){
                    here = prev;
                    here.next = null;

                } else {  // 그 외
                    // 이전 노드의 다음을 다음 노드, 다음 노드의 이전을 이전 노드로 할당
                    prev.next = next;
                    next.prev = prev;

                    here = next;  // 제거 후 현재 위치를 제거된 노드 다음 노드로 위치시킴
                }
            }
            // present에 변경 후 현재 위치를 할당
            present = here;
            // deleteElem();
            break;
            
        case 'Z':
            // 명령어 "Z"
            let popped = deletedStack.pop();
            prev = popped.prev;
            next = popped.next;

            //  만약 popped가 첫 번째 노드라면
            if(popped.prev == null){
                // root를 popped로 옮겨줌
                root.prev = popped;
                root = popped;

            } else{
                // 만약 popped가 마지막 노드라면
                if(popped.next == null){
                    // 마지막 노드 뒤에 popped를 붙여줌.
                    prev.next = popped;

                } else { // 그 외
                    // popped를 linked list에 복귀시킴.
                    // popped에는 이미 정보가 유지되고 있기 때문에 따로 할당해주지 않아도 됨
                    next = prev.next;
                    prev.next = popped;
                    next.prev = popped;

                }
            }
            // restoreElem();
            break;
    }
});

while(root){
    isBeing[root.index] = 'O';
    root = root.next;
}

var answer = isBeing.join("");

return answer;
}