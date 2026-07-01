// https://leetcode.com/problems/house-robber/?envType=study-plan-v2&envId=leetcode-75

/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  if (nums.length === 1) return nums[0];
  else if (nums.length === 2) return Math.max(nums[0], nums[1]);

  let now;
  let p2 = nums[0],
    p1 = Math.max(nums[0], nums[1]);
  for (let i = 2; i < nums.length; i++) {
    now = Math.max(p2 + nums[i], p1);

    p2 = p1;
    p1 = now;
  }

  return now;
};
