// 단순 for loop

function solution(n, stations, w) {
  /*
  IDEAS
  1. range: 기지국 위치 + 좌우 w
  2. false의 개수를 셈.
      2.1. range만큼 존재하다면, 그만큼 true로 전환하고 answer++
      2.2. range 미만으로 존재하고 true를 만나면, true로 전환하고 answer++
  
  */
  const RANGE = w * 2 + 1;
  var answer = 0;

  const isCovered = new Array(n).fill(false);

  for (let station of stations) {
    station--;
    for (let i = station - w; i <= station + w; i++) {
      if (i < 0) continue;
      else if (i > isCovered.length - 1) break;
      isCovered[i] = true;
    }
  }
  // console.log(isCovered)

  let falseCnt = 0;
  for (let i = 0; i < isCovered.length; i++) {
    if (!isCovered[i]) {
      falseCnt++;

      if (falseCnt === RANGE) {
        // for(let tail=i; tail>i-falseCnt; tail--) {
        //     isCovered[tail] = true
        // }
        answer++;
        falseCnt = 0;
      }
    } else {
      if (falseCnt > 0) {
        // for(let tail=i-1; tail>i-1-falseCnt; tail--) {
        //     isCovered[tail] = true
        // }
        answer++;
        falseCnt = 0;
      }
    }
  }

  if (falseCnt > 0) {
    // for(let tail=isCovered.length-1; tail>isCovered.length-1-falseCnt; tail--) {
    //     isCovered[tail] = true
    // }
    answer++;
  }

  // console.log("FINAL:", isCovered)
  // console.log()

  return answer;
}
