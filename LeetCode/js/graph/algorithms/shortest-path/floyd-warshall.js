const N = 4;
const INF = Infinity;

const dist = Array.from({ length: N + 1 }, () => Array(N + 1).fill(INF));

for (let i = 1; i <= N; i++) dist[i][i] = 0;

dist[1][2] = 2;
dist[1][3] = 5;
dist[2][3] = 1;
dist[2][4] = 4;
dist[3][4] = 2;

function floydWarshall(dist) {
  // k는 "경유지의 위치"도 아니고 "경유지의 개수"도 아니다.
  // "이번 단계에서 새롭게 경유를 허용하는 노드 번호"이다.
  // 예를 들면, k=2가 되었을 때는 이미 k=1까지의 모든 최적화가 dist에 반영되어 있다.
  for (let k = 1; k <= N; k++) {
    for (let i = 1; i <= N; i++) {
      for (let j = 1; j <= N; j++) {
        if (dist[i][j] > dist[i][k] + dist[k][j])
          dist[i][j] = dist[i][k] + dist[k][j];
      }
    }
  }
}
floydWarshall(dist);
