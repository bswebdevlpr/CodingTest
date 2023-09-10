// 더블 포인터

function solution(sequence, k) {
  let answers = [];

  let start = 0,
    end = 0;
  let sum = 0;

  while (start <= sequence.length && end <= sequence.length) {
    if (sequence[start] > k) break;

    if (sum < k) {
      sum += sequence[end];
      end++;
    } else {
      if (start === end) break;

      if (sum === k) answers.push([start, end - 1]);

      sum -= sequence[start];
      start++;
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
