// https://leetcode.com/problems/decode-string/

/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function (s) {
  let ns = [],
    ws = [[]];
  let num = "";

  for (let c of s) {
    if (c === "[") {
      ns.push(num === "" ? 1 : parseInt(num));
      num = "";
      ws.push([]);
    } else if (c === "]") {
      const n = ns.pop(),
        wa = ws.pop();
      ws[ws.length - 1].push(wa.join("").repeat(n));
    } else if (isNaN(c)) ws[ws.length - 1].push(c);
    else num += c;
  }

  return ws[0].join("");
};
