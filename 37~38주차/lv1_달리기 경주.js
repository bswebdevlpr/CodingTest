function solution(players, callings) {
  let answer = [];

  const nameMap = new Map();
  const rankMap = new Map();
  players.forEach((name, idx) => {
    nameMap.set(name, idx);
    rankMap.set(idx, name);
  });

  callings.forEach((name) => {
    const rank = nameMap.get(name);
    const prevRank = rank - 1;
    const prevName = rankMap.get(prevRank);

    nameMap.set(name, prevRank);
    nameMap.set(prevName, rank);
    rankMap.set(rank, prevName);
    rankMap.set(prevRank, name);
  });
  answer = Array.from(rankMap.values());

  return answer;
}
