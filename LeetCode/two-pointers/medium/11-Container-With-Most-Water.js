// https://leetcode.com/problems/container-with-most-water/description/?envType=study-plan-v2&envId=leetcode-75

/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  // 수조의 최대 부피 구하기
  // 수렴형
  // 가로가 줄던가 세로가 줄던가

  let left = 0,
    right = height.length - 1;
  let volume = (right - left) * Math.min(height[left], height[right]);
  while (left !== right) {
    let width = right - left,
      maxHeight = Math.min(height[left], height[right]);
    volume = Math.max(volume, width * maxHeight);

    if (height[left] < height[right]) left++;
    else right--;
  }

  return volume;
};
