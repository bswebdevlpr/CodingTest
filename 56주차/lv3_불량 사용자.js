function solution(user_id, banned_id) {
  var answer = 0;

  const joined = user_id.join(" ");

  // Regular Expression
  const cases = [];
  banned_id.forEach((val) => {
    const regExp = new RegExp(`\\b${val.replaceAll("*", "\\S")}\\b`, "g");
    cases.push(joined.match(regExp));
  });

  // DFS
  const dfsResult = dfs(cases, [], 0).map((arr) => arr.sort().join());

  // Eliminate duplicates
  const set = new Set();
  dfsResult.forEach((key) => {
    set.add(key);
  });
  answer = set.size;

  return answer;
}

function dfs(cases, answer) {
  if (answer.length === cases.length) {
    return [answer];
  }

  let ret = [];
  const thisCase = cases[answer.length];
  for (let word of thisCase) {
    if (!answer.includes(word))
      ret = [...ret, ...dfs(cases, [...answer, word])];
  }

  return ret;
}
