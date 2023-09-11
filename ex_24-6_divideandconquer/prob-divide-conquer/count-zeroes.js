function countZeroes(array) {
  let leftIdx = 0;
  let rightIdx = array.length - 1;
  // search for leftmost 0
  while (leftIdx <= rightIdx) {
    let middleIdx = Math.floor((leftIdx + rightIdx) / 2);
    // if test value is a 0
    if (array[middleIdx] == 0) {
      // check if value to the left is a 0
      // end condition - test value is first in array or has a 1 to the left
      if (middleIdx == 0) {
        return array.length;
      } else if (array[middleIdx - 1] == 0) {
        // if test value is 0 and first item in array, the entire array is zeroes
        // keep searching to the left
        rightIdx = middleIdx;
      } else {
        return array.length - middleIdx;
      }
    }
    // if test value is a 1
    else {
      // of all values in the search window are 1, there are no zeroes
      if (array[leftIdx] == 1 && array[rightIdx] == 1) {
        return 0;
      }
      leftIdx = middleIdx;
    }
  }
}

// console.log("countZeroes([1, 1, 1, 1, 0, 0])");
// console.log(countZeroes([1, 1, 1, 1, 0, 0]));
// console.log("countZeroes([1, 0, 0, 0, 0])");
// console.log(countZeroes([1, 0, 0, 0, 0]));
// console.log("countZeroes([0, 0, 0])");
console.log(countZeroes([0, 0, 0]));
console.log("countZeroes([1,1,1,1])");
console.log(countZeroes([1, 1, 1, 1]));

// find middle

// if middle value is not zero, eliminate everything to the left
// feed subarray into same function

// right subarray starts as entire array
// check leftIdx value
// if leftIdx value is 0, everything to the right is a zero
// create
// first value to check: first item in array
// if its not zero, jump to the middle value

// check first value, if zero, count is length of array
// if first value is not 0, check middle value
// if middle value is not 0, keep
// check middle value, if zero, keep moving left

// find the leftmost 0
// stop when index of rightmost 1 and leftmost 0 are 1 away from each other
// check the middle value to see if its a zero
// if its not a zero, continue looking for a zero by jumping right
// if it is a zero, check to
// }

// module.exports = countZeroes

// describe("#countZeroes", function(){
//     it("counts the number of zeroes", function(){
//       expect(countZeroes([1, 1, 1, 1, 0, 0])).toBe(2)
//       expect(countZeroes([1, 0, 0, 0, 0])).toBe(4)
//       expect(countZeroes([0, 0, 0])).toBe(3)
//       expect(countZeroes([1, 1, 1, 1])).toBe(0)
//     })
//   })
