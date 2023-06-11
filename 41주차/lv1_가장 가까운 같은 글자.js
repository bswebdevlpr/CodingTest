function solution(s) {
  var answer = [];
  const locDict = {};

  s.split("").forEach((alp, idx) => {
    idx++;
    if (!locDict[alp]) {
      locDict[alp] = idx;
      answer.push(-1);
    } else {
      answer.push(idx - locDict[alp]);
      locDict[alp] = idx;
    }
  });

  return answer;
}
