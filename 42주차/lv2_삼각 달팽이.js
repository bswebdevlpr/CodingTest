function solution(n) {
  var answer = [];

  const triangle = [];
  for (let i = 0; i < n; i++) triangle.push([]);

  // 밑변과 높이가 n인 삼각형 만들기
  /*
      1
      2 6
      3 4 5
  */
  /*
  Directions
  - down [+1, 0]
  - right [0, +1]
  - left-up [-1, -1]
  */

  /*
  Psuedo Code
  0. loop=0, num=1, dirLoop=0, dirX = [1, 0, -1], dirY = [0, 1, -1]
  1. n-loop만큼 num을 이동시킴. 방향은 [xPos + dirX[dirLoop], yPos + dirY[dirLoop]].
  2. loop에 1을 더함. dirLoop에 1을 더함(3인 경우 0으로 변경). n이 0이 될때까지 2번을 반복.    
  */
  const dirY = [1, 0, -1],
    dirX = [0, 1, -1];

  let num = 1,
    xPos = 0,
    yPos = 0;
  let dirLoop = 0;

  let loop = 0;
  while (n - loop > 0) {
    for (i = 0; i < n - loop; i++) {
      triangle[yPos][xPos] = num;

      num++;
      yPos += dirY[dirLoop];
      xPos += dirX[dirLoop];
    }

    // 다음 시작점으로 이동
    yPos -= dirY[dirLoop];
    xPos -= dirX[dirLoop];

    dirLoop = dirLoop === 2 ? 0 : dirLoop + 1;
    yPos += dirY[dirLoop];
    xPos += dirX[dirLoop];

    loop += 1;
  }
  // console.log(triangle)

  triangle.forEach((row) => {
    row.forEach((elem) => answer.push(elem));
  });

  return answer;
}
