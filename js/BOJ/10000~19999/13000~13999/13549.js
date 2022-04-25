/**
 * 문제 출처: 백준 온라인 져지
 * https://www.acmicpc.net/problem/13549
 * 
 * 시간제한: 2초
 * 메모리제한: 512MB
 * 
 * 문제
 * 수빈이는 동생과 숨바꼭질을 하고 있다. 수빈이는 현재 점 N(0 ≤ N ≤ 100,000)에 있고, 동생은 점 K(0 ≤ K ≤ 100,000)에 있다. 수빈이는 걷거나 순간이동을 할 수 있다. 만약, 수빈이의 위치가 X일 때 걷는다면 1초 후에 X-1 또는 X+1로 이동하게 된다. 순간이동을 하는 경우에는 0초 후에 2*X의 위치로 이동하게 된다.
 * 수빈이와 동생의 위치가 주어졌을 때, 수빈이가 동생을 찾을 수 있는 가장 빠른 시간이 몇 초 후인지 구하는 프로그램을 작성하시오.
 * 
 * 입력
 * 첫 번째 줄에 수빈이가 있는 위치 N과 동생이 있는 위치 K가 주어진다. N과 K는 정수이다.
 * 
    5 17
 * 
 * 출력
 * 수빈이가 동생을 찾는 가장 빠른 시간을 출력한다.
 * 
    2
 * 
 * 파싱
 * A = 5, B = 17
 * 
 * {{초기 설정}}
 * 도착할 수 있는 가장 빠른 시간의 최솟값
 * result = Infinity
 */
const fs = require("fs");
let [A, B] = fs.readFileSync("input.txt").toString().split(" ").map(Number);
let result = Infinity;

if (A == 0) {
  // A가 0인 경우 1로밖에 못가기 때문에 1부터 출발하고 시간은 1 추가
  jump(1, B, 1);
} else {
  // A가 0이 아닌 경우에는 일반적으로 해결
  jump(A, B, 0);
}
console.log(result); // 결과값 출력

function jump(a, b, time) {
  if (b <= a) {
    // b가 a의 위치보다 앞에 있거나 b와 a의 위치가 같을 때
    if (result > time + a - b) {
      result = time + a - b; // 그 차이만큼 a는 -1하는 방법밖에 없기 때문에 time + a - b의 시간이 걸림
    }
    return;
  } else {
    // a < b
    /**
     * b가 짝수일 때
     * a에서 b/2로 가는 방법 혹은
     * a에서 계속해서 +1해서 b까지 가는 방법
     *
     * b가 홀수일 때
     * b-1이나 b+1은 짝수가 되므로 재귀함수에 의해 위에 짝수일 경우로 넘어감(시간은 1 증가)
     * a에서 b-1로 가는 방법 혹은
     * a에서 b+1로 가는 방법
     */
    if (b % 2 == 0) {
      jump(a, b / 2, time);
      jump(a, a, time + b - a);
    } else {
      jump(a, b - 1, time + 1);
      jump(a, b + 1, time + 1);
    }
  }
}
/**
 * 채점 결과
 * 메모리: 9584KB
 * 시간: 128ms
 * 언어: JS
 * 참고 링크: https://blog.naver.com/y2kdj9723/222710852340
 */
