function solution(queries) {
  /*
  GOAL - 각 게임의 결과를 순서대로 배열에 담아 return하라.

  RULES
  1. 턴 제, 두명의 플레이어
  2. 하나의 배열을 공유하며 플레이
  3. 매 턴, 0이 아닌 수 고르고 1 빼기
  4. 3번 행동을 통해 팰린드롬으로 만들면 승리
  5. 둘 중 한명이 승리할 때까지 2~4번 반복

  bfs?
  메모이제이션?
  */

  /*
  PSEUDO CODE
  if 배열이 팰린드롬이면 플레이어 answer 배열에 추가

  for 0이 아닌 수 in query
      slice해서 1빼고 다시 push
  */
  const answer = []
  const PLAYER1 = 1, PLAYER2 = 0

  queries.map(query => {
    query = Object.values(query)
    // console.log("typeof query: ", typeof query, "query="+query, query[0])
    // console.log(Object.values(query))
      const queue = [[query, PLAYER1]]

      console.log("Initial state: ", queue)

      let test = -1
      while(queue.length > 0){
          test++
          if(test === 10) break

          const nowArr = queue[0][0]
          const player = queue[0][1]
          const reversed = nowArr.slice().reverse()
          
          console.log("nowArr="+nowArr, typeof nowArr, "player=",player, reversed)
          
          if(nowArr.toString() === reversed.toString()) {
              console.log("new answer: ", queue[0])
              answer.push(player)
              break
          }

          for(let i=0; i<nowArr.length; i++){
              if(nowArr[i] > 0) {
                  const childNode = []
                  const newArr = nowArr.slice()
                  newArr[i]--
                  childNode.push(newArr)

                  const newPlayer = player === PLAYER1 ? PLAYER2 : PLAYER1
                  childNode.push(newPlayer)

                  queue.push(childNode)
              }
          }

          queue.shift()
          console.log("test="+test, queue)
      }
      console.log()
  })
  console.log()
  console.log("FINAL ANSWER:", answer)

  return answer
}

solution([[2, 0], [3,1]])