const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const mergeSort = (arr) => {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  return merge(mergeSort(left), mergeSort(right));
}

const merge = (left, right) => {
  let mergedArr = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      mergedArr.push(left[leftIndex]);
      leftIndex++;
    } else {
      mergedArr.push(right[rightIndex]);
      rightIndex++;
    }
  }

  return mergedArr.concat(left.slice(leftIndex).concat(right.slice(rightIndex)));
}

const numbers = [];
const askForNumber = () => {
  rl.question('Enter a number (or "q" to finish): ', (input) => {
    if (input.toLowerCase() === 'q') {
      console.log('Request:', {...numbers});
      console.log('Result:', {...mergeSort(numbers)});
      rl.close();
    } else if (!isNaN(input)) {
      numbers.push(Number(input));
      askForNumber();
    } else {
      console.log('Error: value is not of type number');
      askForNumber();
    }
  });
}

askForNumber();
