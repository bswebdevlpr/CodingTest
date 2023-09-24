function solution(weights) {
  const ratios = [1 / 1, 2 / 3, 2 / 4, 3 / 4];

  weights = weights.sort((a, b) => a - b);

  let answer = 0;
  const dict = {};

  weights.forEach((w) => {
    ratios.forEach((r) => {
      if (dict[w * r]) answer += dict[w * r];
    });

    if (dict[w]) dict[w]++;
    else dict[w] = 1;
  });

  return answer;
}
