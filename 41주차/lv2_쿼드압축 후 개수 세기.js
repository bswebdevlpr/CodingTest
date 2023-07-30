function solution(arr) {
  const N = arr.length;
  let zeroCnt = 0,
    oneCnt = 0;

  /*
      1. 입력된 정사각형 범위를 4등분한다.
      2. 각각의 4등분된 범위를 돌며 모든 원소가 같은 값인지 검사한다.
      3. 2.의 결과가 같지 않다면, 해당 범위에 대해 재귀함수를 호출한다.
  */

  function recur(minRow, minCol, maxRow, maxCol, depth = 1) {
    if (depth === 20) return;
    // if (depth === 3) {
    // console.log("depth=" + depth);
    // console.log([minRow, minCol], [maxRow, maxCol]);
    // }
    depth++;

    // 첫번째 원소와 모든 원소의 값이 같은지 확인한다.
    const firstElem = arr[minRow][minCol];
    let isAllSame = true;
    for (let row = minRow; row <= maxRow; row++) {
      for (let col = minCol; col <= maxCol; col++) {
        if (arr[row][col] !== firstElem) {
          isAllSame = false;
          break;
        }
      }
    }

    // 모든 값이 같다면 압축하고 return.
    if (isAllSame) {
      firstElem === 0 ? zeroCnt++ : oneCnt++;
      // console.log("exited");
      // console.log("zeroCnt=" + zeroCnt, "oneCnt=" + oneCnt);
      // console.log();
      return;
    }
    // 정사각형 내 원소가 4개인 경우, 각 개수를 세고 return.
    else if (maxRow - minRow + maxCol - minCol === 2) {
      for (let row = minRow; row <= maxRow; row++) {
        for (let col = minCol; col <= maxCol; col++) {
          arr[row][col] === 0 ? zeroCnt++ : oneCnt++;
        }
      }

      // console.log("zeroCnt=" + zeroCnt, "oneCnt=" + oneCnt);
      // console.log();
      return;
    }

    const halfRow = minRow + (maxRow - minRow + 1) / 2;
    const halfCol = minCol + (maxCol - minCol + 1) / 2;

    recur(minRow, minCol, halfRow - 1, halfCol - 1, depth); // 1사분면
    recur(minRow, halfCol, halfRow - 1, maxCol, depth); // 2사분면
    recur(halfRow, minCol, maxRow, halfCol - 1, depth); // 3사분면
    recur(halfRow, halfCol, maxRow, maxCol, depth); // 4사분면
  }
  recur(0, 0, N - 1, N - 1);

  return [zeroCnt, oneCnt];
}

solution([
  [1, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 1, 1, 1, 1],
  [0, 1, 0, 0, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 1, 0, 0, 1],
  [0, 0, 0, 0, 1, 1, 1, 1],
]);
