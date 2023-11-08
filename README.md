# Binary Search Tree

Project that allows to create and work with Binary Search Tree in JavaScript.

### Functions

```js
// New tree creation
const tree = newBST();

// Build tree from the array of values (sorts array with merge sort without duplicates)

const rootNode = tree.buildTree(array);

// Insert value in the tree
tree.insert(value);

// Remove value from the tree
tree.remove(value);

// Find value in the tree and get node with that value
const node = tree.find(value);

// Go through tree with Bread-first search using iteration and call callback on each node or return array of values if callback was not provided
tree.levelOrderIter(callback);

// Go through tree with Bread-first search using recursion and call callback on each node or return array of values if callback was not provided
tree.levelOrderRec(callback);

// Go through tree with Depth-first search in DLR order and call callback on each node or return array of values if callback was not provided
tree.preOrder(callback);

// Go through tree with Depth-first search in LDR order and call callback on each node or return array of values if callback was not provided
tree.inOrder(callback);

// Go through tree with Depth-first search in LRD order and call callback on each node or return array of values if callback was not provided
tree.postOrder(callback);

// Get height of the node in the tree
tree.height(node);

// Get depth of the node in the tree
tree.depth(node);

// Check if tree is balanced
tree.isBalanced();

// Rebalance tree (get tree values, sort them and build a new tree)
rootNode = tree.rebalance();

// Print tree in the console with nodes and edges
prettyPrint(rootNode);
```
