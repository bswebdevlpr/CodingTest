function solution(name, yearning, photo) {
  var answer = [];
  const dict = {};
  name.forEach((name, idx) => {
    dict[name] = yearning[idx];
  });

  photo.forEach((people) => {
    let sum = 0;

    people.forEach((name) => {
      if (dict[name]) sum += dict[name];
    });

    answer.push(sum);
  });

  return answer;
}
