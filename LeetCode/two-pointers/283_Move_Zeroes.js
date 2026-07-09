/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  let writerPos = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[writerPos] = nums[i];
      writerPos++;
    }
  }

  for (let i = writerPos; i < nums.length; i++) {
    nums[i] = 0;
  }
};
