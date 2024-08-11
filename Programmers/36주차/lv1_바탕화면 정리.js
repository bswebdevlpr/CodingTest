function solution(wallpaper) {
  /*
  IDEAS
  1. 왼쪽 위 문서 찾기. => 가장 왼쪽인 문서와 가장 위쪽인 문서의 위치가 같은지 파악.
      1.1. 같은 경우, 가장 오른쪽이자 아래 문서 찾기.
      1.2. 다른 경우, 위, 왼쪽으로 선을 쭉 그어서 겹치는 지점 찾고 거기서 시작.
  2. 오른쪽 아래 문서 찾기. => 1번과 비슷하게.
  */
  const MAX_ROW = wallpaper.length,
    MAX_COL = wallpaper[0].length;

  var answer = [];
  let bestUp = MAX_ROW,
    bestDown = 0,
    bestLeft = MAX_COL,
    bestRight = 0;

  wallpaper.map((str, row) => {
    for (let col = 0; col < str.length; col++) {
      if (str[col] === "#") {
        if (bestUp > row) bestUp = row;
        if (bestDown < row) bestDown = row;
        if (bestLeft > col) bestLeft = col;
        if (bestRight < col) bestRight = col;
      }
    }
  });
  // console.log(bestUp, bestDown, bestLeft, bestRight)

  answer = [bestUp, bestLeft, bestDown + 1, bestRight + 1];

  return answer;
}
