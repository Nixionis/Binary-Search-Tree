function newBST() {
  let root = null;

  function createNode(newValue, newNodeLeft = null, newNodeRight = null) {
    return {
      value: newValue,
      nodeLeft: newNodeLeft,
      nodeRight: newNodeRight,
    };
  }

  function mergeSort(array) {
    if (array.length < 2) return array;

    let leftHalf;
    let rightHalf;

    leftHalf = mergeSort(array.slice(0, Math.floor(array.length / 2)));
    rightHalf = mergeSort(array.slice(Math.floor(array.length / 2)));

    return mergeHalfs(leftHalf, rightHalf);
  }

  function mergeHalfs(half1, half2) {
    const result = [];

    let firstIndex = 0;
    let secondIndex = 0;

    while (firstIndex < half1.length || secondIndex < half2.length) {
      if (firstIndex === half1.length) {
        result.push(half2[secondIndex]);
        secondIndex += 1;
        continue;
      }

      if (secondIndex === half2.length) {
        result.push(half1[firstIndex]);
        firstIndex += 1;
        continue;
      }

      if (half1[firstIndex] === half2[secondIndex]) {
        result.push(half1[firstIndex]);
        firstIndex += 1;
        secondIndex += 1;
        continue;
      }

      if (half1[firstIndex] > half2[secondIndex]) {
        result.push(half2[secondIndex]);
        secondIndex += 1;
      } else {
        result.push(half1[firstIndex]);
        firstIndex += 1;
      }
    }

    return result;
  }

  function buildTree(unsortedArray) {
    const sortedArray = mergeSort(unsortedArray);
    console.log("input", sortedArray);

    function buildRecursive(array, start, end) {
      if (start > end) return null;

      const midIndex = Math.round((start + end) / 2);
      const currentNode = createNode(array[midIndex]);
      currentNode.nodeLeft = buildRecursive(array, start, midIndex - 1);
      currentNode.nodeRight = buildRecursive(array, midIndex + 1, end);

      return currentNode;
    }

    root = buildRecursive(sortedArray, 0, sortedArray.length - 1);
    return root;
  }

  return { buildTree };
}

const tree = newBST();
let rootNode = tree.buildTree([
  1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,
]);

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.nodeRight !== null) {
    prettyPrint(node.nodeRight, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.nodeLeft !== null) {
    prettyPrint(node.nodeLeft, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

prettyPrint(rootNode);
