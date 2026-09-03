/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
  let words = [];

  s = s.trim();
  let word = "";
  for (let i = 0; i < s.length; i++) {
    if (s[i] === " ") {
      if (word.length > 0) {
        words.push(word);
        word = "";
      } else continue;
    } else word += s[i];
  }
  if (word.length > 0) words.push(word);

  return words.reverse().join(" ");
};
