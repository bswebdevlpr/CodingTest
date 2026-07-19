// https://leetcode.com/problems/find-the-difference-of-two-arrays/?envType=study-plan-v2&envId=leetcode-75

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[][]}
 */
var findDifference = function (nums1, nums2) {
  const num1Set = new Set(nums1),
    num2Set = new Set(nums2);
  return [
    Array.from(num1Set).filter((num) => !num2Set.has(num)),
    Array.from(num2Set).filter((num) => !num1Set.has(num)),
  ];
};
