// https://leetcode.com/problems/dota2-senate/?envType=study-plan-v2&envId=leetcode-75

/**
 * @param {string} senate
 * @return {string}
 */
var predictPartyVictory = function (senate) {
  // 1. 다른 senator의 권리를 박탈
  // 2. 같은 파티 senator들이 여전히 투표할 권리가 있을 때 승리를 선언하고 게임에 변화를 줄 수 있다.

  let rQueue = [],
    dQueue = [];
  for (let i = 0; i < senate.length; i++)
    senate[i] === "R" ? rQueue.push(i) : dQueue.push(i);

  // TURN
  let rIdx = 0,
    dIdx = 0;
  while (rIdx < rQueue.length && dIdx < dQueue.length) {
    let rP = rQueue[rIdx],
      dP = dQueue[dIdx];

    if (rP < dP) rQueue.push(rP + senate.length);
    else dQueue.push(dP + senate.length);

    rIdx++;
    dIdx++;
  }

  return rIdx < rQueue.length ? "Radiant" : "Dire";
};
