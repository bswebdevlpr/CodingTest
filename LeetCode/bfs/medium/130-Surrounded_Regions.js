var solve = function (board) {
  if (!board.length) return;

  const R = board.length;
  const C = board[0].length;
  const dx = [0, 1, 0, -1],
    dy = [1, 0, -1, 0];

  const markSafe = (r, c) => {
    if (board[r][c] !== "O") return;

    const queue = [[r, c]];
    board[r][c] = "S"; // 'Safe'의 약자로 임시 변환 (visited 배열 대신 사용 가능)

    let pointer = 0;
    while (pointer < queue.length) {
      const [x, y] = queue[pointer++];

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i],
          ny = y + dy[i];
        // 1. 범위 체크 + 2. 'O'인지 체크 (이미 'S'면 패스하므로 중복 방지됨)
        if (nx >= 0 && nx < R && ny >= 0 && ny < C && board[nx][ny] === "O") {
          board[nx][ny] = "S"; // 큐에 넣기 "직전"에 상태 변경 (중요!)
          queue.push([nx, ny]);
        }
      }
    }
  };

  // 1. 가장자리(테두리)의 'O'들만 찾아서 연결된 모든 'O'를 'S'로 마킹
  for (let i = 0; i < R; i++) {
    markSafe(i, 0);
    markSafe(i, C - 1);
  }
  for (let j = 0; j < C; j++) {
    markSafe(0, j);
    markSafe(R - 1, j);
  }

  // 2. 전체 보드를 순회하며 정리
  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      if (board[r][c] === "S")
        board[r][c] = "O"; // 안전한 곳은 복구
      else if (board[r][c] === "O") board[r][c] = "X"; // 갇힌 곳은 변경
    }
  }
};
