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
 * @return {number}
 */
var goodNodes = function (root) {
  let count = 0;

  const dfs = (node, stack) => {
    if (!node) return;

    if (stack.every((num) => num <= node.val)) count++;

    stack.push(node.val);
    dfs(node.left, stack);
    dfs(node.right, stack);
    stack.pop();
  };
  dfs(root, []);

  return count;
};
