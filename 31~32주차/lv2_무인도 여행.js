function solution(maps) {
  const MAX_ROW = maps.length;
  const MAX_COL = maps[0].length;

  // 상, 하, 좌, 우
  const dirRow = [-1, 1, 0, 0];
  const dirCol = [0, 0, -1, 1];

  let answer = [];
  const matrix = [];
  maps.map((rowStr) => {
    const row = rowStr.split("");
    matrix.push(row);
  });

  for (let row = 0; row < MAX_ROW; row++) {
    for (let col = 0; col < MAX_COL; col++) {
      const nowElem = matrix[row][col];

      if (nowElem === "X") continue;

      // console.log("Starting point:", [row, col], "val:", matrix[row][col]);

      let sum = parseInt(matrix[row][col]);
      matrix[row][col] = "X";
      const queue = [[row, col]];

      // 네 방향 확인
      while (queue.length > 0) {
        const [headRow, headCol] = queue.shift();
        // console.log("sum=" + sum);

        for (let i = 0; i < 4; i++) {
          const [fourRow, fourCol] = [headRow + dirRow[i], headCol + dirCol[i]];
          if (
            fourRow >= MAX_ROW ||
            fourRow < 0 ||
            fourCol >= MAX_COL ||
            fourCol < 0
          )
            continue;

          if (matrix[fourRow][fourCol] === "X") continue;

          sum += parseInt(matrix[fourRow][fourCol]);
          // console.log(
          //   "Add:",
          //   [fourRow, fourCol],
          //   "val:",
          //   matrix[fourRow][fourCol]
          // );
          matrix[fourRow][fourCol] = "X";
          queue.push([fourRow, fourCol]);
        }
      }

      // console.log("sum=" + sum);
      // console.log();
      if (sum > 0) answer.push(sum);
    }
  }

  if (answer.length > 0) answer = answer.sort((ord2, ord1) => ord2 - ord1);
  else answer.push(-1);

  // console.log(answer);

  return answer;
}

solution(["X591X", "X1X5X", "X231X", "1XXX1"]);
