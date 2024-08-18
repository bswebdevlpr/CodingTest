/**
 * @param {number[][]} grid
 * @return {number}
 */

/**
    Object: 섬 하나로 이루어진 격자를 찢어놓기
    Problem Definition
    1. 섬이 몇개인가?
    2. 섬을 어떻게 찢는가?
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

  let [lowestRow, lowestCol] = [0, 0]; // row, col
  for (let row = 0; row <= MAX_ROW; row++) {
    for (let col = 0; col <= MAX_COL; col++) {
      if (grid[row][col] === WATER) continue;

      const [up, down, left, right] = getDirInfos(grid, row, col);
      matrix[row][col] = up + down + left + right;

      if (
        matrix[lowestRow][lowestCol] === -1 ||
        matrix[row][col] < matrix[lowestRow][lowestCol]
      )
        [lowestRow, lowestCol] = [row, col];
    }
  }

  console.log("origin grid:");
  consoleArr(grid);
  console.log("origin matrix:");
  consoleArr(matrix);

  // LOGIC
  // 1. If this elem has the lowest weight, change the around lands to water.
  // 2. Update the weights of matrix.
  // 3. If the element of matrix has the value '0', return 'days'.
  while (true) {
    const [up, down, left, right] = getDirInfos(grid, lowestRow, lowestCol);
    if (up === LAND) {
      grid[lowestRow - 1][lowestCol] = WATER;
      matrix[lowestRow - 1][lowestCol] = OVER_BOUNDARY;
      updateWeightOfAroundLand(grid, matrix, lowestRow - 1, lowestCol);
      days++;
    }
    if (down === LAND) {
      grid[lowestRow + 1][lowestCol] = WATER;
      matrix[lowestRow + 1][lowestCol] = OVER_BOUNDARY;
      updateWeightOfAroundLand(grid, matrix, lowestRow + 1, lowestCol);
      days++;
    }
    if (left === LAND) {
      grid[lowestRow][lowestCol - 1] = WATER;
      matrix[lowestRow][lowestCol - 1] = OVER_BOUNDARY;
      updateWeightOfAroundLand(grid, matrix, lowestRow, lowestCol - 1);
      days++;
    }
    if (right === LAND) {
      grid[lowestRow][lowestCol + 1] = WATER;
      matrix[lowestRow][lowestCol + 1] = OVER_BOUNDARY;
      updateWeightOfAroundLand(grid, matrix, lowestRow, lowestCol + 1);
      days++;
    }

    consoleArr(grid);
    consoleArr(matrix);
    console.log();

    if (hasOneIsland(grid)) {
      days++;
      break;
    } else if (isDisconnected(matrix)) break;
    else [lowestRow, lowestCol] = getLowestPos(matrix);
  }

  return days;
};

// return: [UP, DOWN, LEFT, RIGHT]
// -1: not in boundary, 0: water, 1: land
function getDirInfos(grid, xPos, yPos) {
  const MAX_ROW = grid.length - 1;
  const MAX_COL = grid[0].length - 1;

  return [
    xPos > 0 ? grid[xPos - 1][yPos] : 0,
    xPos < MAX_ROW ? grid[xPos + 1][yPos] : 0,
    yPos > 0 ? grid[xPos][yPos - 1] : 0,
    yPos < MAX_COL ? grid[xPos][yPos + 1] : 0,
  ]; // [UP, DOWN, LEFT, RIGHT]
}

function getLowestPos(matrix) {
  const MAX_ROW = matrix.length - 1;
  const MAX_COL = matrix[0].length - 1;

  let [lowestRow, lowestCol] = [0, 0]; // row, col

  for (let row = 0; row <= MAX_ROW; row++) {
    for (let col = 0; col <= MAX_COL; col++) {
      if (
        matrix[lowestRow][lowestCol] === -1 ||
        matrix[row][col] < matrix[lowestRow][lowestCol]
      )
        [lowestRow, lowestCol] = [row, col];
    }
  }

  return [lowestRow, lowestCol];
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

function hasOneIsland(grid) {
  const MAX_ROW = grid.length - 1;
  const MAX_COL = grid[0].length - 1;

  let landCnt = 0;
  for (let row = 0; row <= MAX_ROW; row++) {
    for (let col = 0; col <= MAX_COL; col++) {
      if (grid[row][col] === LAND) landCnt++;
    }
  }

  return landCnt === 1;
}

function isDisconnected(matrix) {
  let ret = false;

  const MAX_ROW = matrix.length - 1;
  const MAX_COL = matrix[0].length - 1;

  for (let row = 0; row <= MAX_ROW; row++) {
    for (let col = 0; col <= MAX_COL; col++) {
      if (matrix[row][col] === 0) {
        ret = true;
        break;
      }
    }
  }

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
