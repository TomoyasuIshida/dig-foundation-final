'use strict'
// 1行目に記載している 'use strict' は削除しないでください

function test(actual, expected) {
  if (JSON.stringify(actual) === JSON.stringify(expected)) {
    console.log("PASSED! NICE!!");
  } else {
    console.error("TEST FAILED.")
    console.log(`expected: ${expected}`);
    console.log(`actual: ${actual}`);
  }
}