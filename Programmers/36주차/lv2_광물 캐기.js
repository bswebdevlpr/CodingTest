function solution(picks, minerals) {
  /*
  INPUT
  picks - [다이아 곡괭이 개수, 철 곡괭이 개수, 돌 곡괭이 개수]
  minerals - [캘 광물, ...]
  
  RULES
  1. 광물 5개를 캔 후 곡괭이는 더이상 사용할 수 없다.
  2. 한 번 사용하기 시작한 곡괭이는 더이상 사용할 수 없을 때까지 사용한다.
  3. 광물은 주어진 순서대로만 캘 수 있다.
  4. 광산에 있는 모든 광물을 캐거나, 더 사용할 곡괭이가 없을 때까지 광물을 캔다.
  
  GOAL - 작업을 끝낼 수 있는 최소한의 피로도를 구하라.
  
  IDEAS
  1. 완전탐색 시도 - O(3^n), n=50
  */
  const fatigueMatrix = [
    [1, 1, 1], // DIAMOND
    [5, 1, 1], // IRON
    [25, 5, 1], // STONE
  ];
  minerals = minerals.map((mineral) => {
    let switched;
    switch (mineral) {
      case "diamond":
        switched = 0;
        break;
      case "iron":
        switched = 1;
        break;
      case "stone":
        switched = 2;
        break;
    }
    return switched;
  });
  const toolAmount = picks.reduce((acc, cur) => acc + cur, 0);

  // console.log(minerals, toolAmount);

  var answer = 0;

  function exSearch(mineralIdx, fatigue, [nowTool, leftCnt], toolLeft) {
    // console.log("mineralIdx="+mineralIdx)
    //   console.log(toolLeft.reduce((acc, cur) => acc + cur, 0) === 0 && leftCnt === 0)
    if (
      mineralIdx === minerals.length ||
      (toolLeft.reduce((acc, cur) => acc + cur, 0) === 0 && leftCnt === 0)
    ) {
      // 기저 사례: 광물을 전부 다 캔 경우
      // console.log("fatigue="+fatigue, "STOP")
      //   console.log()
      return fatigue;
    }

    let ret = Infinity;

    if (leftCnt > 0) {
      leftCnt--;
      const thisFatigue = fatigueMatrix[nowTool][minerals[mineralIdx]];
      // console.log("fatigue="+(fatigue+thisFatigue), [nowTool, leftCnt], toolLeft);
      ret = exSearch(
        mineralIdx + 1,
        fatigue + thisFatigue,
        [nowTool, leftCnt],
        toolLeft
      );
    } else {
      for (let i = 0; i < picks.length; i++) {
        if (picks[i] > 0) nowTool = i;
        else continue;

        const thisFatigue = fatigueMatrix[nowTool][minerals[mineralIdx]];
        leftCnt = 4;
        toolLeft[i]--;
        // console.log("fatigue="+(fatigue+thisFatigue), "[nowTool, leftCnt]:", [nowTool, leftCnt], toolLeft);
        // console.log()
        ret = Math.min(
          ret,
          exSearch(
            mineralIdx + 1,
            fatigue + thisFatigue,
            [nowTool, leftCnt],
            toolLeft
          )
        );
        toolLeft[i]++;
      }
    }

    return ret;
  }

  answer = exSearch(0, 0, [0, 0], picks);
  // console.log(answer);

  return answer;
}
