// 이 문제의 답은 0, 1, 2 중 정해져 있는게 아닌가?

/**
 * @param {number[][]} grid
 * @return {number}
 */

const LAND = 1,
  WATER = 0,
  OVER_BOUNDARY = -1;

var minDays = function (grid) {
    if(isDisconnected(grid)) return 0;

    for(grid)
};

// DFS
function isDisconnected(grid) {
  // INITIALIZE
  const visitInfo = new Array(grid.length)
    .fill()
    .map(() => new Array(grid[0].length).fill(false));

  // DFS
  const dfs = (grid, row, col) => {
    const innerRet = [];

    // GO INTO DFS
    // UP
    if (row > 0 && grid[row - 1][col] === LAND) innerRet.push([row - 1, col]);
    // DOWN
    if (row < grid.length - 1 && grid[row + 1][col] === LAND)
      innerRet.push([row + 1, col]);
    // LEFT
    if (col > 0 && grid[row][col - 1] === LAND) innerRet.push([row, col - 1]);
    // RIGHT
    if (col < grid.length[0] - 1 && grid[row][col + 1] === LAND)
      innerRet.push([row, col + 1]);

    return innerRet;
  };

  let stack = [],
    isGridAllVisited = false;
  let islandCnt = 0;

  while (stack.length > 0 || !isGridAllVisited) {
    if (stack.length > 0) {
      while (stack.length > 0) {
        const [row, col] = stack[stack.length - 1];

        if (!visitInfo[row][col]) {
          visitInfo[row][col] = true;
          stack = [...stack, ...dfs(grid, row, col)];
        }

        stack.pop();
      }
      islandCnt++;
    }

    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        if (row === grid.length - 1 && col === grid[0].length - 1)
          isGridAllVisited = true;

        const isTargetVisited = visitInfo[row][col];
        if (isTargetVisited) continue;

        const target = grid[row][col];
        visitInfo[row][col] = true;
        if (target === WATER) continue;

        stack = [...stack, ...dfs(grid, row, col)];
      }
    }
  }
  //

  // console.log(grid);
  // console.log(visitInfo);
  // console.log("islandCnt", islandCnt);

  return islandCnt > 1;
}