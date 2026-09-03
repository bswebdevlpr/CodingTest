/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function (s, t) {
  let results = new Array(s.length).fill(false);
  let tPos = 0;

  for (let i = 0; i < s.length; i++) {
    let letter = s[i];

    for (tPos; tPos < t.length; tPos++) {
      if (letter === t[tPos]) {
        results[i] = true;
        tPos++;
        break;
      }
    }
  }

  return results.every((result) => result);
};
