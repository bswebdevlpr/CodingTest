function solution(r1, r2) {
  let answer = 0;

  answer = findAllPoints(r2, r1) + (r2 - r1 + 1) * 4;

  return answer;
}

function findAllPoints(r2, r1) {
  let cnt = 0;

  for (let i = 1; i < r1; i++) {
    const h2 = Math.sqrt(r2 ** 2 - i ** 2);
    const h1 = Math.sqrt(r1 ** 2 - i ** 2);

    cnt += getPoints(h2, h1);
  }

  for (let i = r1; i < r2; i++) {
    cnt += Math.floor(Math.sqrt(r2 ** 2 - i ** 2));
  }

  cnt *= 4;

  return cnt;
}

function getPoints(h2, h1) {
  let cnt = 0;

  const fh2 = Math.floor(h2);
  const fh1 = Math.floor(h1);

  if (fh1 === h1) cnt += fh2 - fh1 + 1;
  else cnt += fh2 - fh1;

  return cnt;
}
