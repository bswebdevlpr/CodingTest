/**
 * @param {number[]} nums
 * @return {number}
 */
var pivotIndex = function (nums) {
  if (nums.length === 1) return 0;

  let pivotIdx = -1;
  let leftSum = 0,
    rightSum = nums.reduce((acc, cur) => acc + cur, 0);
  for (let i = 0; i < nums.length; i++) {
    rightSum -= nums[i];
    if (leftSum === rightSum) {
      pivotIdx = i;
      break;
    }

    leftSum += nums[i];
  }

  return pivotIdx;
};
