// https://leetcode.com/problems/determine-if-two-strings-are-close/?envType=study-plan-v2&envId=leetcode-75

/**
 * @param {string} word1
 * @param {string} word2
 * @return {boolean}
 */
var closeStrings = function (word1, word2) {
  if (word1.length !== word2.length) return false;

  const freq1 = new Int32Array(26),
    freq2 = new Int32Array(26);

  for (let i = 0; i < word1.length; i++) {
    freq1[word1.charCodeAt(i) - 97]++;
    freq2[word2.charCodeAt(i) - 97]++;
  }

  for (let i = 0; i < freq1.length; i++)
    if (freq1[i] !== 0 && freq2[i] === 0) return false;

  for (
    let i = 0,
      arr1 = freq1.filter((e) => e > 0).sort(),
      arr2 = freq2.filter((e) => e > 0).sort();
    i < freq1.length;
    i++
  )
    if (arr1[i] !== arr2[i]) return false;

  return true;
};
