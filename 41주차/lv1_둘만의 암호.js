function solution(s, skip, index) {
  const MIN_ASCII = 97;
  const MAX_ASCII = 122;

  var answer = "";

  const dict = {};
  skip.split("").forEach((alp) => {
    if (!dict[alp]) dict[alp] = true;
  });

  answer += s
    .split("")
    .map((alp) => {
      let ascii = alp.charCodeAt();

      for (let i = 1; i <= index; i++) {
        ascii++;

        while (dict[String.fromCharCode(ascii)] || ascii > MAX_ASCII) {
          ascii++;
          if (ascii > MAX_ASCII) {
            ascii = MIN_ASCII;
          }
        }
      }
      return String.fromCharCode(ascii);
    })
    .join("");

  return answer;
}
