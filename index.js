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

    root = null;

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

  function insert(value, currentNode = root) {
    if (currentNode === null) {
      currentNode = createNode(value);
      return currentNode;
    }

    if (currentNode.value > value) {
      currentNode.nodeLeft = insert(value, currentNode.nodeLeft);
    } else if (currentNode.value < value) {
      currentNode.nodeRight = insert(value, currentNode.nodeRight);
    }

    return currentNode;
  }

  function remove(value, currentNode = root) {
    if (currentNode === null) {
      console.log("Value not found!");
      return currentNode;
    }

    if (currentNode.value > value) {
      currentNode.nodeLeft = remove(value, currentNode.nodeLeft);
      return currentNode;
    } else if (currentNode.value < value) {
      currentNode.nodeRight = remove(value, currentNode.nodeRight);
      return currentNode;
    } else {
      //Case 1 - one child
      if (!currentNode.nodeLeft) {
        return currentNode.nodeRight;
      } else if (!currentNode.nodeRight) {
        return currentNode.nodeLeft;
      } else {
        //Case 2 - has two children - find next minimal node in right subtree (swap data and delete that node)

        const minNextData = function findMinData(node) {
          let minData = node.value;
          let newCurrentNode = node;

          while (newCurrentNode.nodeLeft) {
            if (newCurrentNode.nodeLeft.value < minData) {
              newCurrentNode = newCurrentNode.nodeLeft;
              minData = newCurrentNode.value;
            }
          }

          return minData;
        };

        currentNode.value = minNextData(currentNode.nodeRight);
        currentNode.nodeRight = remove(
          currentNode.value,
          currentNode.nodeRight
        );
        return currentNode;
      }
    }
  }

  function find(value, node = root) {
    if (node === null) {
      return null;
    }

    if (node.value === value) {
      return node;
    }

    if (node.value > value) {
      return find(value, node.nodeLeft);
    } else {
      return find(value, node.nodeRight);
    }
  }

  function levelOrderIter(callback = null, node = root) {
    if (node === null) return;

    const queue = [];
    const values = [];

    queue.push(node);

    while (queue.length > 0) {
      const currentNode = queue.shift();
      values.push(currentNode.value);

      if (callback) callback(currentNode);

      if (currentNode.nodeLeft) queue.push(currentNode.nodeLeft);

      if (currentNode.nodeRight) queue.push(currentNode.nodeRight);
    }

    if (!callback) return values;

    return;
  }

  function levelOrderRec(callback = null, queue = [root]) {
    if (queue.length === 0) return [];

    const currentNode = queue.shift();

    if (currentNode.nodeLeft) queue.push(currentNode.nodeLeft);
    if (currentNode.nodeRight) queue.push(currentNode.nodeRight);
    if (callback) callback(currentNode);

    const array = [currentNode.value].concat(levelOrderRec(callback, queue));

    if (!callback) return array;
    return "hjkh";
  }

  function preOrder(callback = null, currentNode = root) {
    if (!currentNode) return [];

    let resultArray = [];

    if (callback) callback(currentNode);
    resultArray.push(currentNode.value);
    resultArray = resultArray.concat(preOrder(callback, currentNode.nodeLeft));
    resultArray = resultArray.concat(preOrder(callback, currentNode.nodeRight));

    if (!callback) return resultArray;

    return;
  }

  function inOrder(callback = null, currentNode = root) {
    if (!currentNode) return [];

    let resultArray = [];

    resultArray = resultArray.concat(inOrder(callback, currentNode.nodeLeft));
    if (callback) callback(currentNode);
    resultArray.push(currentNode.value);
    resultArray = resultArray.concat(inOrder(callback, currentNode.nodeRight));

    if (!callback) return resultArray;

    return;
  }

  function postOrder(callback = null, currentNode = root) {
    if (!currentNode) return [];

    let resultArray = [];

    resultArray = resultArray.concat(postOrder(callback, currentNode.nodeLeft));
    resultArray = resultArray.concat(
      postOrder(callback, currentNode.nodeRight)
    );
    if (callback) callback(currentNode);
    resultArray.push(currentNode.value);

    if (!callback) return resultArray;

    return;
  }

  function height(node = root) {
    if (!node) return 0;

    const leftHeight = height(node.nodeLeft) + (node.nodeLeft ? 1 : 0);
    const rightHeight = height(node.nodeRight) + (node.nodeRight ? 1 : 0);

    return leftHeight > rightHeight ? leftHeight : rightHeight;
  }

  function depth(currentNode = root, rootNode = root, currentDepth = 0) {
    if (!rootNode || !currentNode) {
      return null;
    }

    if (rootNode === currentNode) {
      return currentDepth;
    }

    if (rootNode.value > currentNode.value)
      return depth(currentNode, rootNode.nodeLeft, currentDepth + 1);
    else return depth(currentNode, rootNode.nodeRight, currentDepth + 1);
  }

  function isBalanced(node = root) {
    const leftHeight = height(node.nodeLeft);
    const rightHeight = height(node.nodeRight);

    const dif = Math.abs(leftHeight - rightHeight);

    if (dif < 2) return true;
    else return false;
  }

  function rebalance() {
    const oldValueArray = levelOrderRec();
    return buildTree(oldValueArray);
  }

  return {
    buildTree,
    insert,
    remove,
    find,
    levelOrderIter,
    levelOrderRec,
    preOrder,
    inOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
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
console.log("===================================");

tree.insert(0);
tree.insert(2);
tree.insert(3);
tree.insert(10);
tree.insert(18);
tree.insert(11);
prettyPrint(rootNode);

function printNode(node) {
  console.log("Printing node", node.value);
}

//console.log(tree.levelOrderRec());
//console.log(tree.height(tree.find(8)));
//console.log(tree.depth(tree.find(0)));
console.log(tree.isBalanced());
//console.log(tree.preOrder());
//console.log(tree.inOrder());
//console.log(tree.postOrder());
rootNode = tree.rebalance();
prettyPrint(rootNode);
console.log(tree.isBalanced());
