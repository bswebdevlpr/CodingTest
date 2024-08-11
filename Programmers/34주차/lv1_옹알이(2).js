function solution(babblings) {
  var answer = 0;
  const ables = ["aya", "ye", "woo", "ma"];

  babblings.map((babbling) => {
    // console.log("babbling:", babbling)

    let pointer = 0;
    let prevIdx = -1;

    let breakFlag = false;
    while (pointer < babbling.length) {
      // console.log("pointer", pointer)
      for (let i = 0; i < ables.length; i++) {
        const able = ables[i];
        // console.log("able:", able)

        const substracted = babbling.substring(pointer, pointer + able.length);
        if (substracted === ables[prevIdx]) {
          breakFlag = true;
          break;
        }
        if (able === substracted) {
          prevIdx = i;
          pointer += able.length;
          break;
        }

        if (i === ables.length - 1) breakFlag = true;
      }

      if (breakFlag) break;
    }

    if (pointer === babbling.length) {
      // console.log("Answer!")
      answer++;
    }

    // console.log()
  });

  return answer;
}
