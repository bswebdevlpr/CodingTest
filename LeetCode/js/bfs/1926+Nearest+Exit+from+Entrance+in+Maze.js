// https://leetcode.com/problems/nearest-exit-from-entrance-in-maze/

/**
 * @param {character[][]} maze
 * @param {number[]} entrance
 * @return {number}
 */
var nearestExit = function (maze, entrance) {
  const MAX_ROW = maze.length,
    MAX_COL = maze[0].length;
  const dir = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ]; // RIGHT DOWN LEFT UP

  const visited = new Array(MAX_ROW)
    .fill()
    .map(() => new Array(MAX_COL).fill(false));

  const bfs = () => {
    let ret = -1;

    const queue = [[entrance, 0]];
    visited[entrance[0]][entrance[1]] = true;

    let pointer = 0;
    while (pointer < queue.length) {
      const [[x, y], steps] = queue[pointer];

      if (
        (x === 0 || x === MAX_ROW - 1 || y === 0 || y === MAX_COL - 1) &&
        pointer > 0
      ) {
        ret = steps;
        break;
      }

      for (let [dx, dy] of dir) {
        const nx = x + dx,
          ny = y + dy;

        if (
          0 <= nx &&
          nx < MAX_ROW &&
          0 <= ny &&
          ny < MAX_COL &&
          maze[nx][ny] === "." &&
          !visited[nx][ny]
        ) {
          visited[nx][ny] = true;
          queue.push([[nx, ny], steps + 1]);
        }
      }

      pointer++;
    }

    return ret;
  };

  return bfs();
};
