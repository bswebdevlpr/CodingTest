function solution(s1, s2) {
  var answer = 0;

  s1.forEach((a) => {
    s2.forEach((b) => {
      if (a === b) {
        answer++;
        return;
      }
    });
  });

  return answer;
}
