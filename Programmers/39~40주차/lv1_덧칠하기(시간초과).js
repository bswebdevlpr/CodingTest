function solution(n, m, section) {
  var answer = 0;

  let bools = new Array(n).fill(true);
  section.forEach((idx) => (bools[idx] = false));

  let startPoint = [0, section[section.length - 1]]; // left, right
  let traceIdx = 0;
  // let test = 0
  while (startPoint[0] < startPoint[1]) {
    if (traceIdx === 0) {
      for (let i = startPoint[0]; i <= startPoint[1]; i++) {
        // 같아야 하나?
        if (!bools[i]) {
          for (let j = i; j < i + m; j++) {
            bools[j] = true;
          }
          startPoint[0] += m;
          traceIdx = 1;
          answer++;
          break;
        }
      }
    } else {
      for (let i = startPoint[1]; i >= startPoint[0]; i--) {
        if (!bools[i]) {
          for (let j = i; j > i - m; j--) {
            bools[j] = true;
          }
          startPoint[1] -= m;
          traceIdx = 0;
          answer++;
          break;
        }
      }
    }

    // console.log("Loop",test)
    // test++
    // console.log(bools)
  }

  return answer;
}
