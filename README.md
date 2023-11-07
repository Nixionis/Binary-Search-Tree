# linked list

Project that allows to create and work with linked list in JavaScript.

### Functions

New list creation

```js
const list = newLinkedList();
```

Add item to the end of the list

```js
list.append(value);
```

Add item to the start of the list

```js
list.prepend(value);
```

Get the size of the list

```js
list.size;
```

Get the head item of the list

```js
list.head;
```

Get the tail item of the list

```js
list.tail;
```

Get an item index in the list

```js
list.at(index);
```

Pop an item from the list

```js
list.pop();
```

Check if an item in the list

```js
list.contains(value);
```

Check if an item in the list

```js
list.contains(value);
```

Find an item in the list

```js
list.find(value);
```

Convert list to string

```js
list.toString;
```

Convert list to string

```js
list.toString;
```

Insert item at index in the list

```js
list.insertAt(value, index);
```

Remove item at index in the list

```js
list.removeAt(index);
```

### Usage

1. Clone the repo
   ```sh
   git clone https://github.com/Nixionis/linked-list.git
   ```
2. Install NPM packages (jest for testing purposes)
   ```sh
   npm install
   ```
3. Test linked list
   ```sh
   npm test
   ```
4. Import linked list module
   ```js
   const newLinkedList = require("./index");
   ```
