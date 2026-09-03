// https://leetcode.com/problems/the-latest-time-to-catch-a-bus/?envType=problem-list-v2&envId=two-pointers

/**
 * @param {number[]} buses
 * @param {number[]} passengers
 * @param {number} capacity
 * @return {number}
 */
var latestTimeCatchTheBus = function (buses, passengers, capacity) {
  buses = buses.sort((b, a) => b - a);
  passengers = passengers.sort((b, a) => b - a);

  let busPos = 0,
    passengerPos = 0,
    leftSit;
  while (busPos < buses.length) {
    bus = buses[busPos];
    leftSit = capacity;

    while (leftSit > 0 && passengers[passengerPos] <= bus) {
      passengerPos++;
      leftSit--;
    }

    busPos++;
  }
  (busPos--, passengerPos--);

  let ret = leftSit > 0 ? buses[busPos] : passengers[passengerPos];
  for (let i = passengerPos; i >= 0; i--) {
    if (ret === passengers[i]) ret = passengers[i] - 1;
    else break;
  }

  return ret;
};
