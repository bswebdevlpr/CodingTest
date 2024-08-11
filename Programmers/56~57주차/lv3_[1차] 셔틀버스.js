function solution(n, t, m, timetable) {
  var answer = "";

  // 09:00부터 t분 텀으로 n대, m명씩 수용가능
  timetable = timetable.map((timeStr) => {
    const [hour, min] = timeStr.split(":").map((splited) => parseInt(splited));
    return hour * 60 + min;
  });
  timetable = timetable.sort((b, a) => a - b);

  let crewIdx = timetable.length - 1;
  let thisTime = 540;
  let thisBusSeatableCnt;
  let lastCrew = "";
  for (let i = 0; i < n; i++) {
    thisBusSeatableCnt = m;

    while (crewIdx >= 0 && thisBusSeatableCnt > 0) {
      if (timetable[crewIdx] <= thisTime) {
        lastCrew = timetable[crewIdx];
        thisBusSeatableCnt--;
        crewIdx--;
      } else break;
    }

    if (i < n - 1) {
      thisTime += t;
    }
  }

  // 탑승을 전부 끝낸 후
  // 마지막 버스에 자리가 남아있는 경우, 가장 마지막 배차시간에 탑승한다.
  if (thisBusSeatableCnt > 0) answer = convertTimeToStr(thisTime);
  // 마지막 버스에 자리가 남아있지 않은 경우, 마지막으로 탑승한 사람보다 1분 빠르게 도착한다.
  else answer = convertTimeToStr(lastCrew - 1);

  return answer;
}

function convertTimeToStr(timeNum) {
  const hour = Math.floor(timeNum / 60);
  const min = timeNum % 60;

  return setPrefix(hour) + ":" + setPrefix(min);
}

function setPrefix(num) {
  return num < 10 ? "0" + num : num;
}
