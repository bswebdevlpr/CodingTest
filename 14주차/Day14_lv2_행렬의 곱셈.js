// 코딩테스트 연습
// 연습문제
// 행렬의 곱셈

function solution(arr1, arr2) {
    /*
    1 4     3 3
    3 2  X  3 3     => (3, 2) * (2, 2) = (3, 2)  * 왼쪽 행, 오른쪽 열
    4 1
    */
    
    // let answer = new Array(arr1.length).fill(new Array(arr2[0].length).fill(0));
    let answer = [];
    let tempArr = [];
    let pointer = [0, 0];
    
    for(let arr1Row=0; arr1Row<arr1.length; arr1Row++){
        for(let arr2Col=0; arr2Col<arr2[0].length; arr2Col++){
            let sum = 0;
            for(let arr1Col=0; arr1Col<arr1[0].length; arr1Col++){
                sum += arr1[arr1Row][arr1Col] * arr2[arr1Col][arr2Col];
            }
            tempArr.push(sum);
            // console.log(tempArr);
            
            if(tempArr.length === arr2[0].length){
                answer.push(tempArr);
                tempArr = [];
            }
        }
    }
    // console.log(answer);
    
    return answer;
}
solution([[1, 4], [3, 2], [4, 1]],	[[3, 3], [3, 3]]);
