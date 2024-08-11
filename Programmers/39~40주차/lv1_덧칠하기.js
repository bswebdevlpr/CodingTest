function solution(n, m, section) {
  var answer = 0;

  while (section.length > 0) {
    let tail = section[section.length - 1];
    const range = tail - m;

    for (let i = section.length - 1; i >= 0; i--) {
      if (section[i] > range) section.pop();
      else break;
    }
    answer++;
  }

  return answer;
}
