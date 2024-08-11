// 참고 - https://velog.io/@proshy/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4JS-%EA%B0%80%EC%9E%A5-%ED%81%B0-%EC%A0%95%EC%82%AC%EA%B0%81%ED%98%95-%EC%B0%BE%EA%B8%B0

function solution(board) {
  // DP

  const MAX_ROW = board.length - 1;
  const MAX_COL = board[0].length - 1;

  let answer = 0;
  const copied_board = board.slice();

  answer = board[0].includes(1)
    ? 1
    : (() => {
        const tempArr = [];
        for (let i = 0; i <= MAX_ROW; i++) tempArr.push(board[i][0]);

        return tempArr.includes(1) ? 1 : 0;
      })();

  for (let row = 1; row <= MAX_ROW; row++) {
    for (let col = 1; col <= MAX_COL; col++) {
      if (copied_board[row][col] === 0) continue;

      const upRow = row - 1;
      if (upRow < 0) continue;

      const leftCol = col - 1;
      if (leftCol < 0) continue;

      // up, left, left-up
      const elems = [
        copied_board[upRow][col],
        copied_board[row][leftCol],
        copied_board[upRow][leftCol],
      ];
      let min = Infinity;

      elems.map((elem) => {
        if (min > elem) min = elem;
      });

      const newVal = min + 1;
      copied_board[row][col] = newVal;
      if (answer < newVal) answer = newVal;
    }
  }

  return answer ** 2;
}
