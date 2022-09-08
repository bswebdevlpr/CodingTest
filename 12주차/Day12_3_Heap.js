// 코딩테스트 연습
// 힙(Heap)
// 이중우선순위큐

function solution(operations) {
    /*
        이중 우선순위 큐 구현 (힙 사용)
        ==Pseudo Code==
        1. MaxHeap class 생성.
        2. 명령어에 따라 작업수행.
        3. 최솟값은 최대 깊이 인덱스에서 최솟값 찾기.
    */
    
    class MaxHeap {
        constructor(){
            this.queue = ['-'];
        }
        
        findMinIdx(){
            // console.log("findMinIdx operated");
            let nowIndex = 1;
            let lastIndex = this.queue.length - 1;
            while(true){
                // console.log("nowIndex="+nowIndex, "lastIndex="+lastIndex);
                let nextIndex = nowIndex * 2;
                if(nowIndex <= lastIndex && lastIndex < nextIndex){
                    break;
                }
                nowIndex = nextIndex;
            }
            
            let parentIdx = Math.floor(nowIndex/2);
            let min = this.queue[nowIndex];
            let minIdx = nowIndex;
            for(let i=parentIdx+1; i<=lastIndex; i++){
                if(min > this.queue[i]){
                    min = this.queue[i];
                    minIdx = i;
                }
            }

            return minIdx;
        }

        deleteMin(){            
            // console.log("Min: Before Delete: ", this.queue);

            let queueLen = this.queue.length - 1;
            if(queueLen === 0) return;
            else if(queueLen === 1 || queueLen === 2) {
                this.queue.pop();
                return;
            }

            let minIdx = this.findMinIdx();

            let head = this.queue.slice(0, minIdx);
            let rear = this.queue.slice(minIdx+1, this.queue.length);
            // console.log("Deleted Value="+this.queue[minIdx]);
            this.queue = head.concat(rear);
            // console.log(this.queue);
        }

        answer(){
            if(this.queue.length === 1) return [0, 0];
            else return [this.queue[1], this.queue[this.findMinIdx()]];
        }

        insert(num){
            // console.log("Before Insert: ", this.queue);
            this.queue.push(num);
            
            let queueLen = this.queue.length;
            if(queueLen === 2) {
                return;
            } 
            
            let i = queueLen - 1;
            while(true){
                let parentIdx = Math.floor(i/2);
                let parent = this.queue[parentIdx];
                if(parent >= num || i === 1){
                    break;
                } else{
                    let temp = this.queue[i];
                    this.queue[i] = parent;
                    this.queue[parentIdx] = temp;
                    i = parentIdx;
                }
            }
            
            // console.log("Insert complete: ", this.queue);
        }
        
        delete(){
            let queueLen = this.queue.length;
            if(queueLen === 1) return;
            else if(queueLen === 2) {
                this.queue.pop();
                return;
            }

            // console.log("Max: Before Delete: ", this.queue);
            this.queue[1] = this.queue[queueLen - 1];
            this.queue.pop();
            queueLen -= 1;

            if(queueLen === 2) return;
            

            let i = 1;
            while(true){
                let rearNode = this.queue[i];
                if(i*2 > queueLen-1) break;

                if(rearNode >= this.queue[i*2] && rearNode >= this.queue[i*2+1]){
                    break;
                }
                
                if(this.queue[i*2+1] < this.queue[i*2]){
                    this.queue[i] = this.queue[i*2];
                    this.queue[i*2] = rearNode;
                    i = i*2;
                } else if (this.queue[i*2+1]){
                    this.queue[i] = this.queue[i*2+1];
                    this.queue[i*2+1] = rearNode;
                    i = i*2+1;
                } else break;
            }
            
            // console.log("Max: After Delete: ", this.queue);
        }
    }
    
    let maxHeap = new MaxHeap();
    operations.map(oper => {
        // console.log(oper);
        oper = oper.split(" ");
        let command = oper[0];
        let num = oper[1];
        
        switch(command){
            case 'I':
                num = parseInt(num);
                maxHeap.insert(num);
                break;
            
            case 'D':
                if(num === '1'){
                    maxHeap.delete();
                } else if(num === '-1'){
                    maxHeap.deleteMin();
                } else {
                    // console.log("Error: Wrong number");
                }
                break;
        }
    });
    
    // console.log(maxHeap.answer());
    return maxHeap.answer();
}

solution(["I 1", "I 2", "I 3", "I 4", "I -5", "D -1", "D 1", "D 1", "I 123", "I 456", "I 789", "D -1", "D -1"]);