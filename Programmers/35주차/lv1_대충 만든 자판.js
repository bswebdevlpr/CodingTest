function solution(keymap, targets) {
  const KEYMAP_LEN = keymap.length;
  var answer = [];

  const isExist = {};
  const cntEachIdx = {};
  keymap.forEach((arr, idx) => {
    for (let i = 0; i < arr.length; i++) {
      if (!isExist[arr[i]]) isExist[arr[i]] = true;
    }

    cntEachIdx[idx] = 0;
  });
  // console.log(isExist, cntEachIdx)

  targets.forEach((target) => {
    let sum = 0;

    for (let targetIdx = 0; targetIdx < target.length; targetIdx++) {
      const targetC = target[targetIdx];
      let cnt = 0;

      // RETURN: NO MATCH
      if (!isExist[targetC]) {
        answer.push(-1);
        return false;
      }

      let breakFlag = false;
      while (true) {
        for (let keymapLoop = 0; keymapLoop < KEYMAP_LEN; keymapLoop++) {
          const keymapIdx = cntEachIdx[keymapLoop];
          const nowC = keymap[keymapLoop][keymapIdx];
          // console.log("nowC:", nowC);

          if (nowC === targetC) {
            cnt += cntEachIdx[keymapLoop] + 1;
            breakFlag = true;
            break;
          } else {
            cntEachIdx[keymapLoop]++;
          }
        }
        // console.log(cntEachIdx);

        if (breakFlag) {
          for (let keymapLoop = 0; keymapLoop < KEYMAP_LEN; keymapLoop++) {
            cntEachIdx[keymapLoop] = 0;
          }
          break;
        }
      }

      sum += cnt;

      // console.log("cnt=" + cnt);
    }

    answer.push(sum);

    // console.log("sum=" + sum);
    // console.log();
  });

  // console.log(answer);

  return answer;
}
