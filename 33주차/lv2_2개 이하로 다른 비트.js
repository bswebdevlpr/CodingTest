function solution(numbers) {
  /*
  RULES
  1. 인풋보다 큰 수
  2. 비트가 2개 이하로 다른 수 중 가장 작은 수

  PSEUDO CODE
  1. 인풋에서 1 증가
  2. 비트 개수 차이가 2 이하인지 검사
  3. 1~2를 반복
  */
  var answer = [];

  numbers.map((num) => {
    if (num % 2 === 0) answer.push(num + 1);
    else {
      let biNum = num.toString(2).split("");
      biNum.unshift("0");
      // console.log("biNum="+biNum)

      let firstZeroIdx;
      for (let i = biNum.length - 1; i >= 0; i--) {
        if (biNum[i] === "0") {
          firstZeroIdx = i;
          break;
        }
      }

      if (firstZeroIdx === "0") biNum[firstZeroIdx] = "1";
      else {
        biNum[firstZeroIdx] = "1";
        biNum[firstZeroIdx + 1] = "0";
      }

      let newNum = parseInt(biNum.join(""), 2);
      answer.push(newNum);

      // console.log("After: biNum:",biNum)
      // console.log("newNum="+newNum)
      // console.log()
    }
  });

  return answer;
}
