// 시간초과
function solution(sequence, k) {
  let answers = [];

  let start = 0,
    end = 0;
  let sum = 0;

  while (start <= sequence.length - 1 && end <= sequence.length - 1) {
    sum += sequence[end];

    if (sum < k) end++;
    else {
      console.log(sum, [start, end]);
      if (sum === k) answers.push([start, end]);
      [start, end, sum] = next(start, end, sum);
    }
  }

  let minLen = Infinity;
  answers.forEach((arr) => {
    const diff = arr[1] - arr[0];
    if (diff < minLen) minLen = diff;
  });
  answers = answers.filter((arr) => arr[1] - arr[0] === minLen);

  return answers[0];
}

function next(start, end, sum) {
  start += 1;
  end = start;
  sum = 0;
  return [start, end, sum];
}

solution([1, 1, 1, 2, 3, 4, 5], 5);
