/**
 * @param {string} word1
 * @param {string} word2
 * @return {string}
 */
var mergeAlternately = function (word1, word2) {
  let ret = "";

  for (let i = 0; i < Math.max(word1.length, word2.length); i++)
    ret += (word1[i] ?? "") + (word2[i] ?? "");

  return ret;
};
