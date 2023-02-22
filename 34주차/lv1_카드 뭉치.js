function solution(cards1, cards2, goal) {
  /*
  IDEAS
  1. 각 분기마다 가능한 선택은 두 가지.
  */
  var answer = "";
  const merged = [];

  let cards1Pointer = 0;
  let cards2Pointer = 0;

  while (true) {
    if (
      (cards1Pointer === cards1.length && cards2Pointer === cards2.length) ||
      merged.length === goal.length
    ) {
      if (merged.toString() === goal.toString()) answer += "Yes";
      break;
    }

    let case1 = cards1[cards1Pointer];
    let case2 = cards2[cards2Pointer];

    if (case1 === goal[merged.length]) {
      merged.push(case1);
      cards1Pointer++;
    } else if (case2 === goal[merged.length]) {
      merged.push(case2);
      cards2Pointer++;
    } else {
      answer += "No";
      break;
    }
  }

  return answer;
}
