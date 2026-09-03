/**
 * @param {number[]} gain
 * @return {number}
 */
var largestAltitude = function (gain) {
  let alt = 0,
    maxAlt = 0;

  for (let i = 0; i < gain.length; i++) {
    let newAlt = alt + gain[i];

    maxAlt = Math.max(maxAlt, newAlt);
    alt = newAlt;
  }

  return maxAlt;
};
