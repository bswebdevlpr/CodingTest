function solution(s) {
  var answer = 0;

  let isStart = true;
  let firstChar = "";
  let sameCnt = 0;
  let diffCnt = 0;

  for (const c of s) {
    if (isStart) {
      isStart = false;
      firstChar += c;
      sameCnt++;
      continue;
    }

    if (c === firstChar) sameCnt++;
    else diffCnt++;

    if (sameCnt === diffCnt) {
      answer++;
      isStart = true;
      firstChar = "";
      sameCnt = 0;
      diffCnt = 0;
    }
  }
  if (firstChar !== "") answer++;

  return answer;
}
