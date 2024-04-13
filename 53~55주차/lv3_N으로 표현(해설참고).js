function solution(N, number) {
  if (number === N) return 1;

  let answer = -1;
  const MAX_COUNT = 10;

  const matrix = Array.from({ length: MAX_COUNT }, (_, idx) =>
    new Set().add(parseInt(N.toString().repeat(idx)))
  );

  for (let nextLen = 1; nextLen < MAX_COUNT; nextLen++) {
    for (let prevLen = 1; prevLen < nextLen; prevLen++) {
      for (let elem1 of matrix[prevLen]) {
        for (let elem2 of matrix[nextLen - prevLen]) {
          const results = [elem1 + elem2, elem1 - elem2, elem1 * elem2];
          if (elem2 !== 0) results.push(Math.floor(elem1 / elem2));

          results.forEach((num) => {
            matrix[nextLen].add(num);
          });
        }
      }
    }

    if (matrix[nextLen].has(number)) {
      answer = nextLen;
      break;
    }
  }

  return answer;
}

solution(5, 12);
// solution(5, 31168);
// solution(2, 11);
