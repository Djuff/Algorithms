const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const pyramidSort = (arr) => {
  let n = arr.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    let temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;

    heapify(arr, i, 0);
  }

  return arr;
}

const heapify = (arr, n, root) => {
  let largest = root;
  let left = 2 * root + 1;
  let right = left + 1;

  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }

  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest !== root) {
    let temp = arr[root];
    arr[root] = arr[largest];
    arr[largest] = temp;

    heapify(arr, n, largest);
  }
}

const numbers = [];
const askForNumber = () => {
  rl.question('Enter a number (or "q" to finish): ', (input) => {
    if (input.toLowerCase() === 'q') {
      console.log('Request:', {...numbers});
      console.log('Result:', {...pyramidSort(numbers)});
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
