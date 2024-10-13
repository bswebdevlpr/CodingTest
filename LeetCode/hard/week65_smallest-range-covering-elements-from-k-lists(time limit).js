/**
 * @param {number[][]} nums
 * @return {number[]}
 */

var smallestRange = function (nums) {
  // INIT
  // key: list number, value: selected idx of this list
  const dict = new Map();
  /**
   * key: idx of this list in nums
   * value: now selected value of this list
   */
  nums.forEach((list, idx) => {
    dict.set(idx, 0);
  });

  let minRange = Infinity,
    head = -1,
    rear = -1;
  //

  while (true) {
    const targets = Array.from(dict.entries())
      .map(([listNum, val]) => [listNum, nums[listNum][val]])
      .sort((b, a) => b[1] - a[1]);
    // [listNum, listVal]
    // console.log(targets);

    const [thisHeadListNum, thisHeadListVal] = targets[0];
    const [thisRearListNum, thisRearListVal] = targets[targets.length - 1];
    const thisRange = thisRearListVal - thisHeadListVal;

    if (minRange > thisRange) {
      minRange = thisRange;
      head = thisHeadListVal;
      rear = thisRearListVal;

      // console.log("new minRange:", thisRange);
      // console.log("new head:", thisHeadListVal);
      // console.log("new rear:", thisRearListVal);
    }

    const thisHeadNowSelectedIdx = dict.get(thisHeadListNum);
    const thisHeadPointingArr = nums[thisHeadListNum];
    // console.log(thisHeadNowSelectedIdx, thisHeadPointingArr.length - 1);
    if (thisHeadNowSelectedIdx === thisHeadPointingArr.length - 1) break;
    else dict.set(thisHeadListNum, thisHeadNowSelectedIdx + 1);

    // console.log();
  }

  return [head, rear];
};

// console.log(
//   smallestRange([
//     [4, 10, 15, 24, 26],
//     [0, 9, 12, 20],
//     [5, 18, 22, 30],
//   ])
// );
// console.log(
//   smallestRange([
//     [1, 2, 3],
//     [1, 2, 3],
//     [1, 2, 3],
//   ])
// );
console.log(
  smallestRange([
    [1, 4, 7, 10, 13],
    [2, 5, 8, 11, 13],
    [3, 6, 9, 12],
  ])
);
