function solution(words) {
  let ret = 0;

  const model = new AutoCompleteModel(words);

  words.forEach((word) => {
    ret += model.find(word);
  });

  return ret;
}

class AutoCompleteModel {
  words;
  dict = {};

  // training
  constructor(words) {
    this.words = words;

    words.forEach((element, idx) => {
      this.dict[element] = idx;
    });
  }

  find(word) {
    let ret = 0;

    let wordsStartsWithNowWord = 0,
      nowWord = "";
    let searchCnt = 0;
    const splited = word.split("");
    for (let i = 0; i < splited.length; i++) {
      nowWord += splited[i];
      searchCnt++;

      for (let word of this.words) {
        if (word.startsWith(nowWord)) {
          wordsStartsWithNowWord++;
        }
      }

      if (wordsStartsWithNowWord === 1 || i === splited.length - 1) {
        ret = searchCnt;
        break;
      }
      wordsStartsWithNowWord = 0;
    }

    return ret;
  }
}

console.log(solution(["go", "gone", "guild"]));
console.log(solution(["abc", "def", "ghi", "jklm"]));
console.log(solution(["word", "war", "warrior", "world"]));
