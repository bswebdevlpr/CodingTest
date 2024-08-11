function solution(park, routes) {
  var answer = [];

  const MAX_YLEN = park.length;
  const MAX_XLEN = park[0].length;
  const dy = [-1, 1, 0, 0]; // UP, DOWN, LEFT, RIGHT
  const dx = [0, 0, -1, 1];

  const start = [0, 0];
  for (let y = 0; y < park.length; y++)
    for (let x = 0; x < park[y].length; x++)
      if (park[y][x] === "S") (start[0] = y), (start[1] = x);

  routes.map((route) => {
    const [dirChar, lenChar] = route.split(" ");
    let dir;
    switch (dirChar) {
      case "N":
        dir = 0;
        break;
      case "S":
        dir = 1;
        break;
      case "W":
        dir = 2;
        break;
      case "E":
        dir = 3;
        break;
    }
    let len = parseInt(lenChar);

    let canGo = true;
    for (let i = 1; i <= len; i++) {
      const newY = start[0] + i * dy[dir];
      const newX = start[1] + i * dx[dir];

      if (
        newY < 0 ||
        newY >= MAX_YLEN ||
        newX < 0 ||
        newX >= MAX_XLEN ||
        // 범위를  초과하는지 확인.
        park[newY][newX] === "X"
      ) {
        canGo = false;
        break;
      }
    }
    if (canGo) {
      start[0] += len * dy[dir];
      start[1] += len * dx[dir];

      // console.log(start)
    }
  });

  answer = start;

  return answer;
}
