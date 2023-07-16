// https://lessons.springboard.com/Rest-Spread-Operator-Exercises-d231a859b76c4bbda6fe6013ff5093b0

// function filterOutOdds() {
//   var nums = Array.prototype.slice.call(arguments);
//   return nums.filter(function(num) {
//     return num % 2 === 0
//   });
// }
// Refactor it to use the rest operator & an arrow function:

// ## **findMin**

// Write a function called findMin that accepts a variable number of arguments and returns the smallest argument.

// Make sure to do this using the rest and spread operator.

// findMin(1,4,12,-3) // -3
// findMin(1,-1) // -1
// findMin(3,1) // 1

function findMin(...args) {
  return Math.min(...args);
}

// console.log(findMin(1, 4, 12, -3)); // -3

// mergeObjects

// Write a function called *** mergeObjects *** that accepts two objects and returns a new object which contains all the keys and values of the first object and second object.

// mergeObjects({a:1, b:2}, {c:3, d:4}) // {a:1, b:2, c:3, d:4}

function mergeObjects(ob1, ob2) {
  return { ...ob1, ...ob2 };
}

// console.log(mergeObjects({ a: 1, b: 2 }, { c: 3, d: 4 }));

// doubleAndReturnArgs
// Write a function called doubleAndReturnArgs which accepts an array and a variable number of arguments.The function should return a new array with the original array values and all of additional arguments doubled.

// doubleAndReturnArgs([1,2,3],4,4) // [1,2,3,8,8]
// doubleAndReturnArgs([2],10,4) // [2, 20, 8]
function doubleAndReturnArgs(arr, ...args) {
  const doubles = [...args].map((n) => n * 2);
  return [...arr, ...doubles];
}

// console.log(doubleAndReturnArgs([1, 2, 3], 4, 4)); // [1,2,3,8,8]

// Slice and Dice!
// For this section, write the following functions using rest, spread and refactor these functions to be arrow functions!

// Make sure that you are always returning a new array or object and not modifying the existing inputs.

/** remove a random element in the items array
and return a new array without that item. */

// function removeRandom(items) {
//   const rand = Math.floor(Math.random() * items.length);
//   const before = items.slice(0, rand);
//   const after = items.slice(rand + 1);
//   return [...before, ...after];
// }

const removeRandom = (items) => {
  const rand = Math.floor(Math.random() * items.length);
  const before = items.slice(0, rand);
  const after = items.slice(rand + 1);
  return [...before, ...after];
};

// console.log(removeRandom([2, 4, 6, 8, 10]));

// /** Return a new array with every item in array1 and array2. */
// function extend(array1, array2) {
//   return [...array1, ...array2];
// }

const extend = (array1, array2) => [...array1, ...array2];

// console.log(extend([1, 3, 5, 7], [2, 4, 6, 8]));

// /** Return a new object with all the keys and values
// from obj and a new key/value pair */

// function addKeyVal(obj, key, val) {
//   const newObj = { ...obj, [key]: val };
//   //   newObj[key] = val;
//   return newObj;
// }

const addKeyVal = (obj, key, val) => {
  return { ...obj, [key]: val };
};

// console.log(addKeyVal({ first: 1, second: 2 }, "third", 3));

// /** Return a new object with a key removed. */

// function removeKey(obj, key) {
//   const newObj = { ...obj };
//   delete newObj[key];
//   return newObj;
// }

const removeKey = (obj, key) => {
  const newObj = { ...obj };
  delete newObj[key];
  return newObj;
};

// console.log(removeKey({ first: 1, second: 2, third: 3 }, "third"));

// /** Combine two objects and return a new object. */
// function combine(obj1, obj2) {
//   return { ...obj1, ...obj2 };
// }

const combine = (obj1, obj2) => {
  return { ...obj1, ...obj2 };
};

// console.log(combine({ first: 1, second: 2, third: 3 }, { fourth: 4 }));

// /** Return a new object with a modified key and value. */
// function update(obj, key, val) {
//   return { ...obj, [key]: val };
// }

const update = (obj, key, val) => {
  return { ...obj, [key]: val };
};

// console.log(update({ first: 1, second: 2, third: 4 }, "third", 3));
