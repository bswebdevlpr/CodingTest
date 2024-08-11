// Definition for singly-linked list.
// class ListNode {
//    val: number
//    next: ListNode | null
//    constructor(val?: number, next?: ListNode | null) {
//        this.val = (val===undefined ? 0 : val)
//        this.next = (next===undefined ? null : next)
//    }
// }

function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  let pointer1 = l1;
  let str1 = "";
  while (pointer1) {
    str1 += pointer1.val;
    pointer1 = pointer1.next;
  }
  const num1 = BigInt(str1.split("").reverse().join(""));

  let pointer2 = l2;
  let str2 = "";
  while (pointer2) {
    str2 += pointer2.val;
    pointer2 = pointer2.next;
  }
  const num2 = BigInt(str2.split("").reverse().join(""));

  const root = new ListNode();
  (num1 + num2)
    .toString()
    .split("")
    .reverse()
    .reduce((acc, cur, idx, origin) => {
      acc.val = Number(cur);
      acc.next = idx === origin.length - 1 ? null : new ListNode();

      return acc.next;
    }, root);

  return root;
}
