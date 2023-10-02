function solution(r1, r2) {
  let answer = 0;

  answer = findAllPoints(r2) - findAllPoints(r1) + 4;

  return answer;
}

function findAllPoints(r) {
  let cnt = 0;

  const inR = r - 1;

  for (let x = inR; x >= -inR; x--) {
    for (let y = inR; y >= -inR; y--) {
      if (isInCircle([x, y], r)) cnt++;
    }
  }

  cnt = cnt - 1 + 4;

  return cnt;
}

function isInCircle(pos, r) {
  const [xPos, yPos] = pos;

  return r >= Math.sqrt(xPos ** 2 + yPos ** 2);
}
