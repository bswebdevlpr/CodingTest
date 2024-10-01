// 이 문제의 답은 0, 1, 2 중 정해져 있는게 아닌가?
// ref: https://blog.naver.com/1ilsang/222088707991

/**
 * @param {number[][]} grid
 * @return {number}
 */

const LAND = 1,
  WATER = 0,
  OVER_BOUNDARY = -1;

var minDays = function (grid) {
  // 예외케이스 확인
  if (grid.every((row) => row.every((e) => e === WATER))) return 0;
  else if (
    grid.reduce((acc, cur) => {
      cur.forEach((e) => {
        if (e === LAND) acc++;
      });
      return acc;
    }, 0) === 1
  )
    return 1;
  else if (
    grid.length === 1 &&
    grid[0].length === 2 &&
    grid[0].every((e) => e === LAND)
  )
    return 2;
  //

  if (getIslandCnt(grid) > 1) return 0;

  // ANSWER가 1일 때를 제외하고 전부 2임.
  // 1일 때를 구분해내기만 하면 됨.
  // 1. 다리로 이어져있을 때
  // 2. 세면이 WATER로 싸여있을때
  let flag = false;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      const thisElem = grid[row][col];
      if (thisElem === WATER) continue;

      flag = check(grid, row, col);
    }
    if (flag) return 1;
  }

  return 2;
};

function check(grid, row, col) {
  // GO INTO DFS
  // UP
  if (row > 0 && grid[row - 1][col] === LAND) {
    grid[row - 1][col] = WATER;
    if (getIslandCnt(grid) > 1) return true;
    else grid[row - 1][col] = LAND;
  }
  // DOWN
  if (row < grid.length - 1 && grid[row + 1][col] === LAND) {
    grid[row + 1][col] = WATER;
    if (getIslandCnt(grid) > 1) return true;
    else grid[row + 1][col] = LAND;
  }
  // LEFT
  if (col > 0 && grid[row][col - 1] === LAND) {
    grid[row][col - 1] = WATER;
    if (getIslandCnt(grid) > 1) return true;
    else grid[row][col - 1] = LAND;
  }
  // RIGHT
  if (col < grid.length[0] - 1 && grid[row][col + 1] === LAND) {
    grid[row][col + 1] = WATER;
    if (getIslandCnt(grid) > 1) return true;
    else grid[row][col + 1] = LAND;
  }

  return false;
}

// Description: It counts the number of islands
function getIslandCnt(grid) {
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
    if (col < grid[0].length - 1 && grid[row][col + 1] === LAND)
      innerRet.push([row, col + 1]);

    return innerRet;
  };

  let stack = [],
    isGridAllVisited = false;
  let islandCnt = 0;

  while (stack.length > 0 || !isGridAllVisited) {
    if (stack.length > 0) {
      // console.log("dfs start");
      while (stack.length > 0) {
        const [row, col] = stack[stack.length - 1];
        stack.pop();
        // console.log("this pos:", [row, col]);

        if (!visitInfo[row][col]) {
          visitInfo[row][col] = true;
          stack = [...stack, ...dfs(grid, row, col)];
          // console.log(stack);
        }
      }
      islandCnt++;
      // console.log("dfs end and islandCnt:", islandCnt);
      // console.log();
    }

    let flag = false;
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        if (row === grid.length - 1 && col === grid[0].length - 1)
          isGridAllVisited = true;

        const isTargetVisited = visitInfo[row][col];
        if (isTargetVisited) continue;

        const target = grid[row][col];
        if (target === WATER) continue;

        stack = [...stack, [row, col]];
        flag = true;
        // console.log("new pos:", [row, col], "and stack:", stack);
        break;
      }
      if (flag) break;
    }
  }
  //

  // console.log(islandCnt);

  return islandCnt;
}
