const newLinkedList = require("./index");

describe("Linked List", () => {
  const testList = newLinkedList();

  test("Item insertion on end", () => {
    testList.append("1");
    testList.append("2");
    testList.append("3");
    expect(testList.toString).toEqual("(1) -> (2) -> (3) -> null");
  });

  test("Item insertion on start", () => {
    testList.prepend("4");
    testList.prepend("5");
    expect(testList.toString).toEqual(
      "(5) -> (4) -> (1) -> (2) -> (3) -> null"
    );
  });

  test("Returns correct list size", () => {
    expect(testList.size).toEqual(5);
  });
  test("Returns head item", () => {
    expect(testList.head.value).toEqual("5");
  });
  test("Returns tail item", () => {
    expect(testList.tail.value).toEqual("3");
  });
  test("Get item at negative index", () => {
    expect(testList.at(-1)).toEqual(null);
  });

  test("Get last item in list", () => {
    expect(testList.at(testList.size - 1).value).toEqual("3");
  });

  test("Get item not in list range", () => {
    expect(testList.at(10)).toEqual(null);
  });

  test("Pop item", () => {
    expect(testList.pop().value).toEqual("3");
  });

  test("Returns correct list size after pop", () => {
    expect(testList.size).toEqual(4);
  });

  test("Get last item in list after pop", () => {
    expect(testList.at(testList.size - 1).value).toEqual("2");
  });

  test("Contains existing item", () => {
    expect(testList.contains("4")).toEqual(true);
  });

  test("Contains not existing item", () => {
    expect(testList.contains("9")).toEqual(false);
  });

  test("Find existing item", () => {
    expect(testList.find("4")).toEqual(1);
  });

  test("Find not existing item", () => {
    expect(testList.find("9")).toEqual(null);
  });

  test("Insert item at 0 index", () => {
    testList.insertAt("9", 0);
    expect(testList.toString).toEqual(
      "(9) -> (5) -> (4) -> (1) -> (2) -> null"
    );
  });

  test("Insert item at last index", () => {
    testList.insertAt("8", testList.size - 1);
    expect(testList.toString).toEqual(
      "(9) -> (5) -> (4) -> (1) -> (8) -> (2) -> null"
    );
  });

  test("Remove item at 0 index", () => {
    testList.removeAt(0);
    expect(testList.toString).toEqual(
      "(5) -> (4) -> (1) -> (8) -> (2) -> null"
    );
  });

  test("Remove item at last index", () => {
    testList.removeAt(testList.size - 1);
    expect(testList.toString).toEqual("(5) -> (4) -> (1) -> (8) -> null");
  });
});
