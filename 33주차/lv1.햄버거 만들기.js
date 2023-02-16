// shift가 코스트가 진짜 높은거같음 시발

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
  let answer = 0;

  const stack = [];
  let pointer = 0;
  let downBreadIdx = -1;

  while (pointer < ingredients.length) {
    // break point
    // 스택에 다 들어갔을 때 어떻게 멈춤?

    const ingredient = ingredients[pointer];
    pointer++;
    stack.push(ingredient);

    if (ingredient === 1) {
      // 만약 아래 빵이 없다면 아래 빵 설정
      if (downBreadIdx === -1) downBreadIdx = stack.length - 1;
      // 만약 아래 빵이 있는데 덮는 빵을 만났다면
      else {
        const upBreadIdx = stack.length - 1;

        // 빵 사이 재료가 2개가 아니거나, 순서가 맞지 않는다면 아래 빵 인덱스를 재할당.
        if (
          upBreadIdx - downBreadIdx !== 3 ||
          !(stack[upBreadIdx - 1] === 3 && stack[upBreadIdx - 2] === 2)
        ) {
          downBreadIdx = upBreadIdx;
        }
        // 햄버거 만들고 아래 빵 인덱스를 초기화
        else {
          // console.log("햄버거 제조");
          answer++;
          for (let i = 0; i < 4; i++) stack.pop();

          for (downBreadIdx -= 1; downBreadIdx >= 0; downBreadIdx--)
            if (stack[downBreadIdx] === 1) break;
        }
      }
    }

    // console.log("downBreadIdx=" + downBreadIdx);
    // console.log("ingredients:", ingredients);
    // console.log("stack:", stack);
    // console.log();
  }

  // console.log(answer);

  return answer;
}

solution([2, 1, 1, 2, 3, 1, 2, 3, 1]);
