/**
 * 문제 출처: 백준 온라인 져지
 * https://www.acmicpc.net/problem/9372
 * 
 * 시간제한: 1초
 * 메모리제한: 256MB
 * 
 * 문제
 * 상근이는 겨울방학을 맞아 N개국을 여행하면서 자아를 찾기로 마음먹었다. 
 * 하지만 상근이는 새로운 비행기를 무서워하기 때문에, 최대한 적은 종류의 비행기를 타고 국가들을 이동하려고 한다.
 * 이번 방학 동안의 비행 스케줄이 주어졌을 때, 상근이가 가장 적은 종류의 비행기를 타고 모든 국가들을 여행할 수 있도록 도와주자.
 * 상근이가 한 국가에서 다른 국가로 이동할 때 다른 국가를 거쳐 가도(심지어 이미 방문한 국가라도) 된다.
 * 
 * 입력
 * 첫 번째 줄에는 테스트 케이스의 수 T(T ≤ 100)가 주어지고,
 * 각 테스트 케이스마다 다음과 같은 정보가 주어진다.
 * 첫 번째 줄에는 국가의 수 N(2 ≤ N ≤ 1 000)과 비행기의 종류 M(1 ≤ M ≤ 10 000) 가 주어진다.
 * 이후 M개의 줄에 a와 b 쌍들이 입력된다. a와 b를 왕복하는 비행기가 있다는 것을 의미한다. (1 ≤ a, b ≤ n; a ≠ b) 
 * 주어지는 비행 스케줄은 항상 연결 그래프를 이룬다.
 * 
    2
    3 3
    1 2
    2 3
    1 3
    5 4
    2 1
    2 3
    4 3
    4 5
 * 
 * 출력
 * 테스트 케이스마다 한 줄을 출력한다.
 * 상근이가 모든 국가를 여행하기 위해 타야 하는 비행기 종류의 최소 개수를 출력한다.
 * 
    2
    4
 * 
 * 파싱
 * T = 2
 * arr = [[3, 3], [1, 2], [2, 3], [1, 3], [5, 4], [2, 1], [2, 3], [4, 3], [4, 5]]
 * 
 * {{초기 설정}}
 * 결과 출력용 배열
 * count = [];
 * 
 * {{각 케이스마다}}
 * 인접 비행기 리스트 객체
 * obj = {}
 * 
 * 체크리스트
 * checkList = [0 * N+1]
 */
const fs = require("fs");
let [T, ...arr] = fs.readFileSync("input.txt").toString().trim().split("\n");
arr = arr.map((a) => a.split(" ").map(Number));
let count = [];

// 각 케이스마다
for (let i = 0; i < arr.length; i += arr[i][1] + 1) {
  let obj = {};
  for (let j = i + 1; j <= i + arr[i][1]; j++) {
    let flight = arr[j];
    if (!obj[flight[0]]) obj[flight[0]] = [];
    if (!obj[flight[1]]) obj[flight[1]] = [];

    obj[flight[0]].push(flight[1]);
    obj[flight[1]].push(flight[0]);
  }

  let checkList = new Array(arr[i][0] + 1).fill(0);
  checkList[1] = 1;
  count.push(0);
  dfs(obj, 1, checkList);
}

console.log(count.join("\n"));

/**
 * DFS 수행
 * 방문하지 않은 곳에 대해서만
 * 비행기 종류의 수를 늘린다.
 */
function dfs(obj, current, checkList) {
  if (obj[current]) {
    obj[current].forEach((next) => {
      if (!checkList[next]) {
        checkList[next] = 1;
        count[count.length - 1] += 1;
        dfs(obj, next, checkList);
      }
    });
  }
}
/**
 * 채점 결과
 * 메모리: 65748KB
 * 시간: 432ms
 * 언어: JS
 */
