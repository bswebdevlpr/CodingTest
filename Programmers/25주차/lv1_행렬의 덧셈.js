function solution(arr1, arr2) {
    var answer = [];
    
    for(let arrIdx=0; arrIdx<arr1.length; arrIdx++){
        const addedArr = []
        for(let elemIdx=0; elemIdx<arr1[0].length; elemIdx++){
            addedArr.push(arr1[arrIdx][elemIdx] + arr2[arrIdx][elemIdx])
        }
        answer.push(addedArr)
    }
    
    return answer;
}