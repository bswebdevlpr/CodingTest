// https://leetcode.com/problems/reverse-vowels-of-a-string/?envType=study-plan-v2&envId=leetcode-75

/**
 * @param {string} s
 * @return {string}
 */
var reverseVowels = function (s) {
  const set = new Set();
  set
    .add("a")
    .add("e")
    .add("i")
    .add("o")
    .add("u")
    .add("A")
    .add("E")
    .add("I")
    .add("O")
    .add("U");

  const splited = s.split("");

  let left = 0,
    right = splited.length - 1;
  while (left <= right) {
    if (set.has(splited[left]) && set.has(splited[right])) {
      let temp = splited[left];
      splited[left] = splited[right];
      splited[right] = temp;

      left++;
      right--;
    } else {
      if (!set.has(splited[left])) left++;
      if (!set.has(splited[right])) right--;
    }
  }

  return splited.join("");
};
