function solution(ingredients) {
  /*
  RULES
  1. 1 - 빵, 2 - 야채, 3 - 고기
  
  IDEAS
  0. 괄호문제랑 동일.
  1. 첫 빵의 위치를 기억.
      1.1. 빵 뒤에 순서대로(1-2-3-1) 오지 않으면 첫 빵의 위치를 다음 빵으로 재할당.
  2. break 조건
      2.1. pointer가 배열의 끝에 도달하면 break.
  3. ingredient.length > 0 인 동안 반복.
  
  PSEUDO CODE
  while ingredient.length > 0
      if pointer === ingredient.length: break
      
      if 현재요소 === 빵:
          if 이미 빵이 지정되어 있다면(아래 빵이 지정되어 있으면, 현재 빵이 덮는 빵이면): 
              임시 배열의 순서를 파악
              if 임시배열의 순서가 옳다면: 
                  아래 빵부터 현재 빵까지 배열에서 제거
              else: 
                  현재 인덱스를 아래 빵으로 지정
              임시배열을 초기화
                  
          else: 현재 인덱스를 아래 빵에 저장
      else:
          임시배열에 현재 재료를 저장
  */
  let answer = 0
  
  let tempArr = []
  let downBreadIdx = null
  let pointer = 0
  
  while(ingredients.length > 0) {
      // console.log("pointer="+pointer)
      
      if(pointer === ingredients.length) break
      
      const ingredient = ingredients[pointer]
      
      if(ingredient === 1){
          if((downBreadIdx || downBreadIdx === 0) && 
             (tempArr.length === 2 && tempArr[0] === 2 && tempArr[1] === 3)) {
              ingredients.splice(downBreadIdx, 4)
              pointer = -1 // 끝에 pointer++가 있으므로 하나 더 빼줌.
              answer++
              downBreadIdx = null

              // console.log("answer++")

          } else {
              downBreadIdx = pointer
              
              // console.log("downBreadIdx is assigned! downBreadIdx="+downBreadIdx)
          }
          if(tempArr.length > 0) tempArr = []
          
      } else {
          tempArr.push(ingredient)
      }
      
      pointer++
      
      // console.log("ingredients:", ingredients)
      // console.log("tempArr:", tempArr)
      // console.log()
  }
  
  return answer
}