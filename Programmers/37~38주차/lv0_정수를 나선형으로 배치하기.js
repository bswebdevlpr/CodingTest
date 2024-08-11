function solution(n) {
  const MAX = n * n;
  const dx = [1, 0, -1, 0];
  const dy = [0, 1, 0, -1]; // RIGHT, DOWN, LEFT, UP

  var answer = [];
  for (let i = 0; i < n; i++) {
    const newRow = new Array(n).fill(-1);
    answer.push(newRow);
  }

  function isGoable(nowPos, nowDir) {
    let ret = true;

    const steppedY = nowPos[0] + dy[nowDir];
    const steppedX = nowPos[1] + dx[nowDir];

    if (
      steppedY < 0 ||
      steppedY >= n ||
      steppedX < 0 ||
      steppedX >= n ||
      answer[steppedY][steppedX] !== -1
    )
      ret = false;

    return ret;
  }

  let nowPos = [0, 0],
    nowDir = 0;
  let record = 1;
  while (record <= MAX) {
    answer[nowPos[0]][nowPos[1]] = record;

    if (!isGoable(nowPos, nowDir)) {
      nowDir = nowDir < 3 ? nowDir + 1 : 0;
    }
    nowPos[0] += dy[nowDir];
    nowPos[1] += dx[nowDir];
    record++;
  }

  return answer;
}
