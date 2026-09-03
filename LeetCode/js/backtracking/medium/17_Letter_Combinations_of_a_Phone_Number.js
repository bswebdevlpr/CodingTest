// https://leetcode.com/problems/letter-combinations-of-a-phone-number/description/?envType=study-plan-v2&envId=leetcode-75

/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  const dict = {
    2: ["a", "b", "c"],
    3: ["d", "e", "f"],
    4: ["g", "h", "i"],
    5: ["j", "k", "l"],
    6: ["m", "n", "o"],
    7: ["p", "q", "r", "s"],
    8: ["t", "u", "v"],
    9: ["w", "x", "y", "z"],
  };

  let ret = [];
  const origin = [];

  const dfs = function (idx) {
    if (idx === digits.length) {
      ret.push(origin.join(""));
      return;
    }

    const num = digits[idx];

    for (let c of dict[num]) {
      origin.push(c);
      dfs(idx + 1);

      origin.pop();
    }
  };
  dfs(0);

  return ret;
};
