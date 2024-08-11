function solution(book_time) {
  /*
  RULES
  1. 10분간 청소한다. 청소가 끝나는 시간이 예약시간과 같다면 입실이 가능한 것으로 가정한다.
  
  IDEAS
  1. 예약시간 별로 예약을 정렬. 정렬할 때 종료시간 + 10분.
  2. 방에 예약을 할당한다.
      2.1. 생성된 방이 없으면, 새로 할당.
      2.2. 생성된 방이 있으면, 모든 방을 돌며 *이용시간이 종료되었는지 파악.
          2.2.1. 종료된 방이 있으면, 예약을 해당 방에 할당.
          2.2.2. 종료된 방이 없으면, 새로운 방을 생성.
  3. 모든 예약에 대해 2번을 반복.
  
  * 이용시간 종료 파악
  1. 객체에 종료시간을 저장.
  2. 새로운 예약의 시작시간을 종료시간과 비교.
      2.1. 시작시간이 종료시간보다 작다면, 새로운 방에 예약을 할당.
      2.2. 시작시간이 종료시간보다 크거나 같다면, 해당 방에 예약을 할당.

  PSEUDO CODE
  for book of books
      종료시간 += 10
  
  rooms = []
  
  while book_time.length > 0
      start_time = 현재 예약의 시작시간
      
      if rooms.length === 0: 방 객체 생성 후 rooms에 push
      else:
          for room of rooms
              if room의 종료시간 <= start_time: 현재 예약을 할당
              if 모든 방을 search 했다면:
                  새로운 방 객체 생성 후 할당.
      
  */

  //     PSEUDO CODE
  //     for book of books
  //         종료시간 += 10
  function getIntTime(str_time) {
    const splited = str_time.split(":");
    return parseInt(splited[0]) * 60 + parseInt(splited[1]);
  }
  for (let i = 0; i < book_time.length; i++) {
    const now_book = book_time[i];

    const start_time = getIntTime(now_book[0]);
    const fin_time = getIntTime(now_book[1]) + 10;
    book_time[i] = [start_time, fin_time];
  }

  book_time = book_time.sort((second, first) => second[0] - first[0]);

  // console.log(book_time);

  const rooms = [];
  let pointer = 0;
  while (pointer < book_time.length) {
    const now_book = book_time[pointer];
    const now_start_time = now_book[0];

    if (rooms.length === 0) rooms.push(now_book);
    else {
      const room_len = rooms.length;
      for (let i = 0; i < room_len; i++) {
        const room = rooms[i];

        if (room[1] <= now_start_time) {
          rooms[i] = now_book;
          break;
        }
        if (i === rooms.length - 1) rooms.push(now_book);
      }
    }
    // console.log(rooms);

    pointer++;
  }

  return rooms.length;
}
