function solution(rectangle, characterX, characterY, itemX, itemY) {
  var answer = 0;

  rectangle = rectangle.map((positions) => {
    return positions.map((pos) => pos * 2);
  });
  (characterY *= 2), (characterX *= 2), (itemY *= 2), (itemX *= 2);

  let MAX_X = -1,
    MAX_Y = -1;
  rectangle.forEach(([xLeftUp, yLeftUp, xRightDown, yRightDown]) => {
    if (xRightDown > MAX_X) MAX_X = xRightDown;
    if (yRightDown > MAX_Y) MAX_Y = yRightDown;
  });

  // -1: not road
  // 0: in the rectangle
  // 1: road
  const matrix = new Array(MAX_Y + 1)
    .fill()
    .map(() => new Array(MAX_X + 1).fill(-1));
  rectangle.forEach(([xLeftUp, yLeftUp, xRightDown, yRightDown]) => {
    for (let yPos = yLeftUp; yPos <= yRightDown; yPos++) {
      for (let xPos = xLeftUp; xPos <= xRightDown; xPos++) {
        if (
          matrix[yPos][xPos] !== 0 &&
          (xPos === xLeftUp ||
            xPos === xRightDown ||
            yPos === yLeftUp ||
            yPos === yRightDown)
        )
          matrix[yPos][xPos] = 1;
        else matrix[yPos][xPos] = 0;
      }
    }
  });
  matrix[characterY][characterX] = -1;

  let yPosA = characterY,
    xPosA = characterX,
    costA = 0;
  let yPosB = characterY,
    xPosB = characterX,
    costB = 0;
  while (true) {
    // console.log("A", yPosA, xPosA);
    [yPosA, xPosA] = findNextPos(matrix, yPosA, xPosA, MAX_Y, MAX_X);
    costA++;
    if (yPosA === itemY && xPosA === itemX) {
      // console.log(yPosA, xPosA);
      answer = costA;
      break;
    }

    // console.log();
    // console.log("B", yPosB, xPosB);
    [yPosB, xPosB] = findNextPos(matrix, yPosB, xPosB, MAX_Y, MAX_X);
    costB++;
    if (yPosB === itemY && xPosB === itemX) {
      // console.log(yPosB, xPosB);
      answer = costB;
      break;
    }
    // console.log("====================");
    // console.log();
  }

  // console.log(answer);

  return answer / 2;
}

function findNextPos(matrix, yPos, xPos, MAX_Y, MAX_X) {
  let newYPos, newXPos;

  // console.log("before Pos", yPos, xPos);

  if (yPos + 1 <= MAX_Y && matrix[yPos + 1][xPos] === 1) {
    [newYPos, newXPos] = [yPos + 1, xPos];
  } else if (xPos + 1 <= MAX_X && matrix[yPos][xPos + 1] === 1) {
    [newYPos, newXPos] = [yPos, xPos + 1];
  } else if (yPos - 1 >= 0 && matrix[yPos - 1][xPos] === 1) {
    [newYPos, newXPos] = [yPos - 1, xPos];
  } else if (xPos - 1 >= 0 && matrix[yPos][xPos - 1] === 1) {
    [newYPos, newXPos] = [yPos, xPos - 1];
  } else throw new Error("no movable path");

  matrix[newYPos][newXPos] = -1;
  // console.log("moved Pos", newYPos, newXPos);

  return [newYPos, newXPos];
}

// solution(
//   [
//     [1, 1, 7, 4],
//     [3, 2, 5, 5],
//     [4, 3, 6, 9],
//     [2, 6, 8, 8],
//   ],
//   1,
//   3,
//   7,
//   8
// );
// solution(
//   [
//     [1, 1, 8, 4],
//     [2, 2, 4, 9],
//     [3, 6, 9, 8],
//     [6, 3, 7, 7],
//   ],
//   9,
//   7,
//   6,
//   1
// );
// solution([[1, 1, 5, 7]], 1, 1, 4, 7, 9);
// solution(
//   [
//     [2, 1, 7, 5],
//     [6, 4, 10, 10],
//   ],
//   3,
//   1,
//   7,
//   10
// );
// solution(
//   [
//     [2, 2, 5, 5],
//     [1, 3, 6, 4],
//     [3, 1, 4, 6],
//   ],
//   1,
//   4,
//   6,
//   3
// );
