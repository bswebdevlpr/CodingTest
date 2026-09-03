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
  const TOTAL_LEN = grid.length * grid[0].length;
  let landCnt = 0,
    waterCnt = 0;
  grid.forEach((row) => {
    row.forEach((e) => {
      if (e === LAND) landCnt++;
      else waterCnt++;
    });
  });
  if (waterCnt === TOTAL_LEN) return 0;
  else if (landCnt === 1) return 1;
  else if (TOTAL_LEN === 2 && landCnt === 2) return 2;
  //

  if (getIslandCnt(grid) > 1) return 0;

  // ANSWER가 1일 때를 제외하고 전부 2임.
  // 1일 때를 구분해내기만 하면 됨.
  // 1. 다리로 이어져있을 때
  // 2. 세면이 WATER로 싸여있을때
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      const thisElem = grid[row][col];
      if (thisElem === WATER) continue;

      grid[row][col] = WATER;
      if (getIslandCnt(grid) > 1) return 1;
      else grid[row][col] = LAND;
    }
  }

  return 2;
};

// Description: It counts the number of islands
function getIslandCnt(grid) {
  // INITIALIZE
  const COL_LEN = grid[0].length;
  const flattenGrid = grid.flat();
  const visited = new Array(flattenGrid.length).fill(false);

  // DFS
  const dfs = (idx) => {
    const innerRet = [];
    const [row, col] = [Math.floor(idx / COL_LEN), Math.floor(idx % COL_LEN)];
    // console.log("row:", row, "col:", col);

    // GO INTO DFS
    // UP
    const upIdx = (row - 1) * COL_LEN + col;
    if (row > 0 && grid[row - 1][col] === LAND && !visited[upIdx]) {
      innerRet.push(upIdx);
      visited[upIdx] = true;
    }

    // DOWN
    const downIdx = (row + 1) * COL_LEN + col;
    if (
      row < grid.length - 1 &&
      grid[row + 1][col] === LAND &&
      !visited[downIdx]
    ) {
      innerRet.push(downIdx);
      visited[downIdx] = true;
    }

    // LEFT
    const leftIdx = row * COL_LEN + col - 1;
    if (col > 0 && grid[row][col - 1] === LAND && !visited[leftIdx]) {
      innerRet.push(leftIdx);
      visited[leftIdx] = true;
    }

    // RIGHT
    const rightIdx = row * COL_LEN + col + 1;
    if (
      col < grid[0].length - 1 &&
      grid[row][col + 1] === LAND &&
      !visited[rightIdx]
    ) {
      innerRet.push(rightIdx);
      visited[rightIdx] = true;
    }

    return innerRet;
  };

  let stack = [],
    isGridAllVisited = false;
  let pointer = 0,
    islandCnt = 0;
  while (stack.length > 0 || !isGridAllVisited) {
    // console.log(stack.length > 0, !isGridAllVisited);

    if (stack.length > 0) {
      // console.log("dfs start");
      while (stack.length > 0) {
        const idx = stack.pop();
        // console.log("this pos:", [idx]);

        stack = [...stack, ...dfs(idx)];
        // console.log(stack);
      }
      islandCnt++;
      // console.log("dfs end and islandCnt:", islandCnt);
      // console.log();
    }

    for (let idx = pointer; idx < flattenGrid.length; idx++) {
      if (!isGridAllVisited && idx >= flattenGrid.length - 1)
        isGridAllVisited = true;

      const isTargetVisited = visited[idx];
      if (isTargetVisited) continue;
      else visited[idx] = true;

      const target = flattenGrid[idx];
      if (target === WATER) continue;
      else {
        stack = [...stack, idx];
        pointer = idx;
        break;
      }
    }
  }
  //

  // console.log(islandCnt);

  return islandCnt;
}

console.log(
  minDays([
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ])
);
