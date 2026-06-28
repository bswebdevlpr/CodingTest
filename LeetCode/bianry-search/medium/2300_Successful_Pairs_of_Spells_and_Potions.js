// https://leetcode.com/problems/successful-pairs-of-spells-and-potions/?envType=study-plan-v2&envId=leetcode-75

/**
 * @param {number[]} spells
 * @param {number[]} potions
 * @param {number} success
 * @return {number[]}
 */
var successfulPairs = function (spells, potions, success) {
  let ret = [];

  potions = potions.sort((b, a) => b - a);

  for (let spell of spells) {
    let left = 0,
      right = potions.length - 1;

    let flag = false;
    while (right - left > 1) {
      if (potions[right] * spell < success) {
        flag = true;
        break;
      }

      let mid = left + Math.floor((right - left) / 2);
      if (potions[mid] * spell < success) left = mid;
      else right = mid;
    }

    let val;
    if (flag) val = 0;
    else if (potions[left] * spell >= success) val = potions.length - left;
    else if (potions[right] * spell >= success) val = potions.length - right;
    else val = potions.length - (right + 1);

    ret.push(val);
  }

  return ret;
};
