/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
  return nums.sort((b, a) => b - a).reduce((acc, cur) => acc ^ cur, 0);
};
