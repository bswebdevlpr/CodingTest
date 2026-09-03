/**
 * @param {number[][]} nums
 * @return {number[]}
 */

// 나올 수 있는 범위의 조합을 전부 구한다음 범위 크기순으로 오름차순 정렬
var smallestRange = function (nums) {
  const allCases = findAllCases(nums).sort((b, a) => {
    return b[b.length - 1] - b[0] - (a[a.length - 1] - a[0]);
  });

  const targetList = allCases[0];
  return [targetList[0], targetList[targetList.length - 1]];
};

function findAllCases(nums) {
  // NEED MEMOIZATION
  const memo = new Map();

  const dict = new Map();
  nums.forEach((elem, idx) => {
    dict.set(idx, elem);
  });

  // DFS
  const dfs = (thisCase, lists, visited) => {
    if (visited.length === lists.length) {
      thisCase = thisCase.sort((b, a) => Number(b) - Number(a));

      const memoKey = thisCase.join();
      if (memo.get(memoKey)) return [];
      else memo.set(memoKey, true);

      return [thisCase];
    }

    const allCases = [];

    lists.forEach((list, idx) => {
      if (visited.includes(idx)) return;

      list.forEach((elem) => {
        allCases.push(...dfs([...thisCase, elem], lists, [...visited, idx]));
        return;
      });
    });

    return allCases;
  };

  return dfs([], nums, []);
}

smallestRange([
  [4, 10, 15, 24, 26],
  [0, 9, 12, 20],
  [5, 18, 22, 30],
]);
