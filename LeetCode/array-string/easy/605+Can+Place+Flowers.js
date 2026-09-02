// https://leetcode.com/problems/can-place-flowers/description/?envType=study-plan-v2&envId=leetcode-75

/**
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */
var canPlaceFlowers = function (flowerbed, n) {
  flowerbed.unshift(0);
  flowerbed.push(0);

  for (let i = 1; i < flowerbed.length - 1; i++) {
    if (n === 0) break;

    if (flowerbed[i] === 0) {
      const left = i - 1,
        right = i + 1;

      if (
        left >= 0 &&
        flowerbed[left] === 0 &&
        right <= flowerbed.length - 1 &&
        flowerbed[right] === 0
      ) {
        flowerbed[i] = 1;
        n--;
      }
    }
  }

  return n === 0;
};
