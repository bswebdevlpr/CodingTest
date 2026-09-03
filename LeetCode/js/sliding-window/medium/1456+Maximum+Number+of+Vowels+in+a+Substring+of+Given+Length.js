/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var maxVowels = function (s, k) {
  const vowels = new Set(["a", "e", "i", "o", "u"]);

  let subStr = s.substring(0, k);
  let vowelNum = 0;
  for (let i = 0; i < subStr.length; i++) if (vowels.has(subStr[i])) vowelNum++;
  let maxVowelNum = vowelNum;

  for (let left = 1; left <= s.length - k; left++) {
    vowelNum =
      vowelNum -
      (vowels.has(s[left - 1]) ? 1 : 0) +
      (vowels.has(s[left + k - 1]) ? 1 : 0);
    maxVowelNum = Math.max(maxVowelNum, vowelNum);

    if (maxVowelNum === k) return k;
  }

  return maxVowelNum;
};
