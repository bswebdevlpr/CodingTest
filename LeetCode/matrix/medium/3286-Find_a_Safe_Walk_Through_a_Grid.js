/**
 * Key Concepts
 * 1. 0-1 BFS
 * 2. dist (not visited)
 */

/**
 * @param {number[][]} grid
 * @param {number} health
 * @return {boolean}
 */
var findSafeWalk = function (grid, health) {
  const MAX_X = grid.length - 1,
    MAX_Y = grid[0].length - 1;
  const dx = [0, 0, 1, -1],
    dy = [1, -1, 0, 0]; // RIGHT, LEFT, DOWN, UP

  const deque = [[0, 0, health - grid[0][0]]];
  const dist = new Array(grid.length)
    .fill()
    .map((e) => new Array(grid[0].length).fill().map((e) => -Infinity));

  while (deque.length > 0) {
    const [x, y, hc] = deque.shift();
    if (hc <= 0) continue;

    if (x === MAX_X && y === MAX_Y && hc >= 1) return true;

    for (let i = 0; i < 4; i++) {
      const [nx, ny] = [x + dx[i], y + dy[i]];
      if (!(0 <= nx && nx <= MAX_X) || !(0 <= ny && ny <= MAX_Y)) continue;

      const newElem = [nx, ny, hc - grid[nx][ny]];
      const isAcceptable = dist[nx][ny] < hc - grid[nx][ny];
      if (isAcceptable) {
        dist[nx][ny] = hc - grid[nx][ny];
        if (grid[nx][ny] === 0) deque.unshift(newElem);
        else deque.push(newElem);
      }
    }
  }

  return false;
};
