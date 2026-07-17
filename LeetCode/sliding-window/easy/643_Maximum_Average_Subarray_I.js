/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findMaxAverage = function (nums, k) {
  let sum = nums.slice(0, k).reduce((acc, cur) => acc + cur, 0);
  let maxSum = sum;

  for (let left = 1; left <= nums.length - k; left++) {
    sum = sum - nums[left - 1] + nums[left + k - 1];
    maxSum = Math.max(maxSum, sum);
  }

  return maxSum / k;
};
