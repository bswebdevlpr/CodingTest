// https://leetcode.com/problems/max-number-of-k-sum-pairs/?envType=study-plan-v2&envId=leetcode-75

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxOperations = function (nums, k) {
  let cnt = 0;

  nums.sort((b, a) => b - a);
  let left = 0,
    right = nums.length - 1;

  while (left < right) {
    let sum = nums[left] + nums[right];
    if (sum === k) {
      cnt++;
      left++;
      right--;
    } else if (sum > k) right--;
    else left++;
  }

  return cnt;
};
