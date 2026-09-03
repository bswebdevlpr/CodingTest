// https://leetcode.com/problems/validate-binary-search-tree/?envType=problem-list-v2&envId=tree

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function (root) {
  const dfs = (node, min, max) => {
    if (node.val <= min || node.val >= max) return false;

    return (
      (node.left ? dfs(node.left, min, node.val) : true) &&
      (node.right ? dfs(node.right, node.val, max) : true)
    );
  };

  return dfs(root, -Infinity, Infinity);
};
