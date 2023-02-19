function solution(board) {
  /*
    IDEAS
    1. 정사각형이 되려면 원소에서 오른쪽, 아래, 우하향 대각선이 1이어야 함.
    2. 모든 원소에 대해 정사각형을 체크하려면 너무 많이 나오는거 아님? 1000*1000(100만)인데?
    3. 오른쪽으로 연결된 요소는 시작 포인트에서 제외. V
    
    4. 정사각형 만드는건 어떻게?
    5. 크기별로 루프돌면서 확인
    
    PSEUDO CODE
    최대 square size = 0
    checked_matrix = board size로 만들고
    
    for row in board_row
        for col in board_col
            if checked_matrix === true: continue
            else: 각 원소에 대해 square 값을 체크
    */
  const MAX_ROW = board.length;
  const MAX_COL = board[0].length;

  let answer = 0;

  let isChecked = [];
  for (let i = 0; i < MAX_ROW; i++) {
    const row = [];
    for (let col = 0; col < MAX_COL; col++) {
      row.push(false);
    }
    isChecked.push(row);
  }

  /*
    PSEUDO CODE
    =정사각형 만들기= 
    현재위치 = 시작점
    현재크기 = 1
    커질크기 = 1
    while문 break flag = false
    while break point
        for i=0; i<커질크기; i++ 
            현재위치 = 시작점에서 오른쪽으로 i만큼 이동
            if 현재위치 !== 1: break
        for문에서 break 걸렸다면 break
        
        for i=0; i<커질크기; i++
            현재위치 = 현재위치에서 아래로 i만큼 이동
            if 현재위치 !== 1: break
        
        왼쪽으로 위와같이 이동
        
        위로 위와같이 이동
        
        커질크기++
        
    return 현재크기 // 현재 요소에서는 현재크기의 정사각형 값을 갖는다
    if 최대크기 < 현재크기: 최대크기 = 현재크기
    */
  function checkSquare(nowPos) {
    if (board[nowPos[0]][nowPos[1]] === 0) return false;

    let initPos = [nowPos[0], nowPos[1]];
    let size = 1;
    let addSize = 0;
    let whileBreak = false;

    while (true) {
      // CHECK RIGHT
      for (let i = 0; i <= addSize; i++) {
        nowPos[1]++;
        if (nowPos[1] > MAX_COL || board[nowPos[0]][nowPos[1]] !== 1) {
          whileBreak = true;
          break;
        }
      }
      if (whileBreak) break;

      // CHECK DOWN
      for (let i = 0; i <= addSize; i++) {
        nowPos[0]++;
        if (nowPos[0] > MAX_ROW || board[nowPos[0]][nowPos[1]] !== 1) {
          whileBreak = true;
          break;
        }
      }
      if (whileBreak) break;

      // CHECK LEFT
      for (let i = 0; i <= addSize; i++) {
        nowPos[1]--;
        if (nowPos[1] < 0 || board[nowPos[0]][nowPos[1]] !== 1) {
          whileBreak = true;
          break;
        }
      }
      if (whileBreak) break;

      // CHECK UP
      for (let i = 0; i <= addSize; i++) {
        nowPos[0]--;
        if (nowPos[0] < 0 || board[nowPos[0]][nowPos[1]] !== 1) {
          whileBreak = true;
          break;
        }
      }
      if (whileBreak) break;

      addSize++;
    }

    // 만들어지는 정사각형 범위내에서 오른쪽 원소 중 1인 원소는 check 표시
    let rightPos = initPos[1];
    for (let i = 0; i <= addSize; i++) {
      isChecked[initPos[0]][rightPos] = true;
      rightPos++;
    }

    return (size + addSize) ** 2;
  }

  /*
    for row in board_row
        for col in board_col
            if checked_matrix === true: continue
            else: 각 원소에 대해 square 값을 체크
    */
  for (let row = 0; row < MAX_ROW; row++) {
    for (let col = 0; col < MAX_COL; col++) {
      if (isChecked[row][col]) continue;
      console.log([row, col]);
      console.log();
      const squareArea = checkSquare([row, col]);

      if (answer < squareArea) answer = squareArea;
    }
  }

  console.log(answer);

  return answer;
}

solution([
  [0, 1, 1, 1],
  [1, 1, 1, 1],
  [1, 1, 1, 1],
  [0, 0, 1, 0],
]);
