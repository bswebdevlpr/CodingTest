function solution(k, m, score) {
  /*
      k: 최대점수
      m: 한 상자에 포장되는 사과의 개수
      score: 각 사과의 점수
  */

  var answer = 0;
  score = score.sort((b, a) => b - a);

  let nowBox = [];
  while (nowBox.length + score.length > m) {
    nowBox.push(score.pop());

    if (nowBox.length === m) {
      answer += nowBox[nowBox.length - 1] * nowBox.length;
      // console.log(nowBox)
      nowBox = [];
    }
  }
  if (nowBox.length + score.length === m) {
    answer += score[0] * m;
  }

  return answer;
}
