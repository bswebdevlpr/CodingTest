function solution(data, col, row_begin, row_end) {
  /*
  PREVIEW
  1. 정렬: col 기준 오름차, 값이 동일하면 첫 번째 원소 기준 내림차
  2. S_i: i 번째 행의 모든 원소에 대해 i로 나눈 나머지들의 총합.
  3. row_begin <= i <= row_end
  */
  var answer = -1;
  
  col--
  
  data = data.sort((arr2, arr1) => {
      if (arr2[col] !== arr1[col]) {
          return arr2[col] - arr1[col]
      } else {
          return arr1[0] - arr2[0]
      }
  })
  
  for(let i=row_begin; i<=row_end; i++){
      let sum = 0
      
      for (const num of data[i-1]) {
          sum += (num % i)
      }
      
      if(answer === -1) answer = sum
      else answer = answer ^ sum
  }
  
  return answer;
}