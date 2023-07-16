// Maps and Sets Exercise

// Quick Question #1
// What does the following code return?
// new Set([1, 1, 2, 2, 3, 4])
// {1, 2, 3, 4}

// Quick Question #2
// What does the following code return?
// [...new Set("referee")].join("")
// 'ref'

// Quick Questions #3
// What does the Map m look like after running the following code?

// let m = new Map();
// m.set([1, 2, 3], true);
// m.set([1, 2, 3], false);

// m = {[1,2,3]: true, [1,2,3]: false}
// explanation: the two arrays used when setting are not the same object, even though they look the same and have the same elements

// vowelCount
// Write a function called vowelCount which accepts a string and returns a map where the keys are numbers and the values are the count of the vowels in the string.

// vowelCount('awesome') // Map { 'a' => 1, 'e' => 2, 'o' => 1 }
// vowelCount('Colt') // Map { 'o' => 1 }

const vowelCount = (str) => {
  let strArray = str.split("");
  let vowels = new Set(strArray.filter((c) => "aeiou".indexOf(c) !== -1));
  let tally = new Map();
  let count = null;
  for (let vowel of vowels) {
    count = strArray.filter((v) => v === vowel).length;
    tally.has(count) ? tally.get(count).push(vowel) : tally.set(count, [vowel]);
  }
  return tally;
};

// console.log(vowelCount("hihihohohajeejee"));
