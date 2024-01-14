function solution(words) {
  let ret = 0;

  const tree = new AutoCompleteModel(words);
  words.forEach((word) => {
    ret += tree.getSearchCnt(word);
  });

  return ret;
}

class AutoCompleteModel {
  root = {};

  // training
  constructor(words) {
    words.forEach((word) => {
      let pointer = this.root;

      for (let i = 0; i < word.length; i++) {
        if (!pointer[word[i]]) {
          pointer[word[i]] = {
            data: false,
            cnt: 0,
          };
        }
        pointer[word[i]].cnt++;
        pointer = pointer[word[i]];
      }
      pointer.data = true;
    });
  }

  // 하위 노드에 true가 몇 개 있는지 알아야함

  getSearchCnt(word) {
    let depth = 0;

    let pointer = this.root;
    for (let i = 0; i < word.length; i++) {
      depth++;

      if (i === word.length - 1) {
        break;
      } else if (pointer[word[i]].cnt === 1) {
        break;
      }

      pointer = pointer[word[i]];
    }

    return depth;
  }
}

// console.log(solution(["go", "gone", "guild"]));
// console.log();
// console.log(solution(["abc", "def", "ghi", "jklm"]));
// console.log();
// console.log(solution(["word", "war", "warrior", "world"]));
