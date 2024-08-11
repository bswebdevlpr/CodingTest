function solution(keyinput, board) {
  var answer = [0, 0];

  const MAX_WIDTH = (board[0] - 1) / 2;
  const MAX_HEIGHT = (board[1] - 1) / 2;

  keyinput.map((dir) => {
    switch (dir) {
      case "left":
        if (answer[0] > -MAX_WIDTH) answer[0]--;
        break;

      case "right":
        if (answer[0] < MAX_WIDTH) answer[0]++;
        break;

      case "up":
        if (answer[1] < MAX_HEIGHT) answer[1]++;
        break;

      case "down":
        if (answer[1] > -MAX_HEIGHT) answer[1]--;
        break;
    }
  });

  return answer;
}
