function solution(stickers) {
    /*
    Summary
    1. 원형 array.
    2. 스티커 뜯어서 얻을 수 있는 최대값 구하기.
    3. 스티커를 뜯으면 좌우의 스티커는 뜯을 수 없게된다.
    
    - 최대로 뜯을 수 있는 스티커 양이 최대값을 만들어내지는 않음.
    - 세 개 수의 합이 최소인 경우에서 최대값을 뜯기.
    
    Pseudo Code
    1. 모든 숫자에 대해 좌우와의 합을 구함.
        * 좌우 숫자가 제외된 숫자이면 합에 더하지 않음.
    2. 1번의 합 중 가장 작은 수를 선택.
        2.1) 가운데 수를 총합에 더함.
        2.2) 좌우 숫자는 다음 루프부터 제외.
    3. 1, 2번을 반복.
    */
    
    // 방법 1. index를 활용해 array로 다루기.
    //  => 결국 해당 index가 제거됐는지 확인하는 연산이 필요하므로 비효율적임.
    
    // 방법 2. LinkedList로 직접 리스트를 변형시키기.
    let stickerObj = {};
    let amount = 0;
    
    stickerObj[0] = {
        num: stickers[0],
        left: null,
        right: null
    };
    let pointer = stickerObj[0];
    
    // LinkedList 생성.
    for(let i=1; i<stickers.length; i++){
        stickerObj[i] = {
            num: stickers[i],
            left: pointer,
            right: null
        };
        pointer = stickerObj[i];
        stickerObj[i-1].right = pointer;
        
        if(i === stickers.length-1){
            pointer.right = stickerObj[0];
            stickerObj[0].left = pointer;
        }
    }
    // console.log(stickerObj);
    
    let stickerEntries = Object.entries(stickerObj)
        .sort((arr1, arr2) => arr1[1].index - arr2[1].index);
    
    // let test = 0;
    while(stickerEntries.length > 0){
        // console.log(stickerEntries);
        
        // if(test === 3) break;
        /*
        Psuedo Code
        1. stickerObj의 모든 요소 중 좌우와 최소 합을 가지는 인덱스를 서치한다.
        2. minIdx와 좌우 Idx를 stickerObj에서 제거한다.
        3. stickerObj에 요소가 없을때까지 1, 2번을 반복한다.
        */
        let minIdx = "";
        let minVal = 300;
        
        for(let [key, val] of stickerEntries){
            let nowSticker = val;
            let leftStickerNum = nowSticker.left === null ? 0 : nowSticker.left.num;
            let rightStickerNum = nowSticker.right === null ? 0 : nowSticker.right.num;
            
            let sum = (nowSticker.num + leftStickerNum + rightStickerNum);
            if(minVal > sum ||
              (minVal === sum && parseInt(stickerObj[minIdx].num) < parseInt(key))){
                // console.log("before: ", "minIdx="+minIdx);
                minIdx = key;
                minVal = sum;
                // console.log("after: ", "minIdx="+minIdx)
            }
        }
        
        // 제거해야 하는 요소와 관련있는 모든 노드의 정보를 갱신.
        // 왼쪽 노드의 (왼쪽노드의 right 요소)를 null으로 갱신.
        // 오른쪽 노드의 (오른쪽노드의 left 요소)를 null으로 갱신.
        let minNode = stickerObj[minIdx];
        amount += minNode.num;
        if(minNode.left){
            let leftNode = minNode.left;
            if(leftNode.left) leftNode.left.right = null;
            let leftIdx = minIdx === 0 ? stickerEntries.length-1 : parseInt(minIdx)-1;
            // console.log(leftIdx, "left="+leftNode.num);
            delete stickerObj[leftIdx];  // num이 아니라 idx로 들어가야함.
        }
        // console.log(minIdx, "middle="+stickerObj[minIdx].num);
        if(minNode.right){
            let rightNode = minNode.right;
            if(rightNode.right) rightNode.right.left = null;
            let rightIdx = minIdx === stickerEntries.length-1 ? 0 : parseInt(minIdx)+1;
            // console.log(rightIdx, "right="+rightNode.num);
            delete stickerObj[rightIdx];
        }
        // console.log("amount="+amount);
        // console.log();
        
        delete stickerObj[minIdx];
        
        stickerEntries = Object.entries(stickerObj);
        
        // test++;
        // 이미 연결되어 있는 linked-list에서 연결정보를 null 값으로 바꿔준다면 다른 노드에서의 연결정보도 갱신이 되나?
        //  => 갱신이 안된다.
        
    }
    
    stickerEntries = Object.entries(stickerObj);
    return amount;
}