/**
 * @param {number[][]} grid
 * @return {number}
 */

/**
    Object: 섬 하나로 이루어진 격자를 찢어놓기
    Problem Definition
    1. 섬이 몇개인가?
    2. 섬을 어떻게 찢는가?

    PSEUDO CODE 
    1. WATER 혹은 BORDER로 가장 많은 면이 둘러싸인 LAND를 찾는다.
    2. 1을 WATER로 바꾼다.
    3. 섬이 disconnected 상태인지 확인한다.
      3.1. 맞다면 결과를 반환한다.
      3.1. 틀리면 1~3을 반복한다.
*/
const LAND = 1,
  WATER = 0,
  OVER_BOUNDARY = -1;

var minDays = function (grid) {
  const MAX_ROW = grid.length - 1;
  const MAX_COL = grid[0].length - 1;

  // SET MATRIX
  // save the info on whether the land has the other land around
  // if the element of matrix has 0, it will be answer
  let days = 0;
  const matrix = new Array(grid.length)
    .fill()
    .map(() => new Array(grid[0].length).fill(-1));

  for (let row = 0; row <= MAX_ROW; row++) {
    for (let col = 0; col <= MAX_COL; col++) {
      if (grid[row][col] === WATER) continue;

      const [up, down, left, right] = getDirInfos(grid, row, col).map((e) =>
        e === -1 ? 0 : e
      );
      matrix[row][col] = up + down + left + right;
    }
  }

  console.log("origin grid:");
  consoleArr(grid);
  console.log("origin matrix:");
  consoleArr(matrix);

  let [largestRow, largestCol] = getLargestPos(matrix, grid); // row, col

  // LOGIC
  // 1. If this elem has the lowest weight, change the around lands to water.
  // 2. Update the weights of matrix.
  // 3. If the element of matrix has the value '0', return 'days'.
  let test = 0;
  while (true) {
    if (test === 5) break;
    test++;

    // TODO: 바다로 둘러싸인 면이 가장 많은 LAND를 찾아서 끊는게 맞는거같음
    grid[largestRow][largestCol] = WATER;
    matrix[largestRow][largestCol] = OVER_BOUNDARY;
    updateWeightOfAroundLand(grid, matrix, largestRow, largestCol);
    days++;

    consoleArr(grid);
    consoleArr(matrix);
    console.log();

    // 섬이 disconnected 상태인지 확인
    if (isDisconnected(matrix)) break;
    else [largestRow, largestCol] = getLargestPos(matrix, grid);
  }

  return days;
};

// return: [UP, DOWN, LEFT, RIGHT]
// -1: not in boundary, 0: water, 1: land
function getDirInfos(grid, xPos, yPos) {
  const MAX_ROW = grid.length - 1;
  const MAX_COL = grid[0].length - 1;

  return [
    xPos > 0 ? grid[xPos - 1][yPos] : -1,
    xPos < MAX_ROW ? grid[xPos + 1][yPos] : -1,
    yPos > 0 ? grid[xPos][yPos - 1] : -1,
    yPos < MAX_COL ? grid[xPos][yPos + 1] : -1,
  ]; // [UP, DOWN, LEFT, RIGHT]
}

function getLargestPos(matrix, grid) {
  const MAX_ROW = matrix.length - 1;
  const MAX_COL = matrix[0].length - 1;

  let [largestRow, largestCol] = [0, 0]; // row, col

  let isBridge = false;
  for (let row = 0; row <= MAX_ROW; row++) {
    for (let col = 0; col <= MAX_COL; col++) {
      // is bridge?
      if (matrix[row][col] !== -1) {
        const [_, zeroCnt, oneCnt] = getDirInfos(grid, row, col).reduce(
          (acc, cur) => {
            if (cur === -1) acc[0]++;
            else if (cur === 0) acc[1]++;
            else acc[2]++;

            return acc;
          },
          [0, 0, 0]
        );

        if (zeroCnt === 2 && oneCnt === 2) {
          console.log(_, zeroCnt, oneCnt);
          [largestRow, largestCol] = [row, col];
          isBridge = true;
          break;
        } else if (matrix[row][col] > matrix[largestRow][largestCol])
          [largestRow, largestCol] = [row, col];
      }
    }

    if (isBridge) break;
  }

  console.log("largest pos", [largestRow, largestCol], "isBridge", isBridge);

  return [largestRow, largestCol];
}

function updateWeightOfAroundLand(grid, matrix, row, col) {
  const MAX_ROW = grid.length - 1;
  const MAX_COL = grid[0].length - 1;

  // UP
  if (row > 0 && grid[row - 1][col] === LAND && matrix[row - 1][col] > 0)
    matrix[row - 1][col]--;
  // DOWN
  if (row < MAX_ROW && grid[row + 1][col] === LAND && matrix[row + 1][col] > 0)
    matrix[row + 1][col]--;
  // LEFT
  if (col > 0 && grid[row][col - 1] === LAND && matrix[row][col - 1] > 0)
    matrix[row][col - 1]--;
  // RIGHT
  if (col < MAX_COL && grid[row][col + 1] === LAND && matrix[row][col + 1] > 0)
    matrix[row][col + 1]--;
}

// DFS
function isDisconnected(grid) {
  let ret = false;

  let islandCnt = 0;

  // Find the starting point
  const start = [0, 0];
  let flag = false;
  for (let row = 0; row <= MAX_ROW; row++) {
    for (let col = 0; col <= MAX_COL; col++) {
      if (grid[row][col] === LAND) {
        start = [row, col];
        flag = true;
        break;
      }
    }
    if (flag) break;
  }

  // Q: 섬이 disconneccted 상태인지 확인할 때마다 DFS check를 위한 copied grid를 만드는게 맞는지?

  // Logic
  const taskQueue = [];
  let taskChaser = 0;

  // Q: LAND를 WATER로 하나 바꿀때마다 섬 개수를 체크하는 것이 과연 효율적인지?

  return ret;
}

function consoleArr(arr) {
  arr.forEach((row) => {
    console.log(row);
  });
  console.log();
}

// console.log(
//   minDays([
//     [0, 1, 1, 0],
//     [0, 1, 1, 0],
//     [0, 0, 0, 0],
//   ])
// );
// console.log(minDays([[1, 1]]));
console.log(
  minDays([
    [1, 1, 0, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1],
  ])
);
