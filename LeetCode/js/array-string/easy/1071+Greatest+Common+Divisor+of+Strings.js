// https://leetcode.com/problems/greatest-common-divisor-of-strings/?envType=study-plan-v2&envId=leetcode-75

/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
var gcdOfStrings = function (str1, str2) {
  const candidates = [];
  let word = "";
  for (let i = 0; i < Math.min(str1.length, str2.length); i++) {
    if (str1[i] !== str2[i]) break;
    word += str1[i];
    if (
      str1.length % word.length === 0 &&
      str2.length % word.length === 0 &&
      word.repeat(str1.length / word.length) === str1 &&
      word.repeat(str2.length / word.length) === str2
    )
      candidates.push(word);
  }

  return candidates.length > 0 ? candidates[candidates.length - 1] : "";
};
