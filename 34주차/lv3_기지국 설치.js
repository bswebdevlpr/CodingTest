function solution(n, stations, w) {
  /*
  IDEAS
  1. range: 기지국 위치 + 좌우 w
  2. 시작 ~ 기지국 왼쪽 경계 / 기지국 오른쪽 경계 ~ 기지국 왼쪽 경계 / 기지국 오른쪽 경계 ~ 끝 사이를 나눔.
  3. 2번의 각 경우에서 몫 + 나머지가 있으면 1이 추가할 기지국의 개수.
  
  */
  const RANGE = w * 2 + 1;
  var answer = 0;
  const ranges = []; // 전파되지 않는 구역들

  let leftMargin = -1,
    rightMargin = -1;

  stations.map((station) => {
    station = station - 1;
    leftMargin = station - w;

    ranges.push([rightMargin + 1, leftMargin - 1]);

    rightMargin = station + w;
  });
  if (rightMargin < n - 1) ranges.push([rightMargin + 1, n - 1]);
  // console.log(ranges)

  for (const range of ranges) {
    const head = range[0];
    const tail = range[1];

    const diff = tail - head + 1;

    let quot = Math.floor(diff / RANGE);

    answer += diff % RANGE === 0 ? quot : quot + 1;
  }

  return answer;
}
