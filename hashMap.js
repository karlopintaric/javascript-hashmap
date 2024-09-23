class Node {
  constructor(key, value = null, nextNode = null) {
    this.key = key;
    this.value = value;
    this.next = nextNode;
  }
}

class LinkedList {
  #head;
  #size;

  constructor() {
    this.#head = null;
    this.#size = 0;
  }

  append(key, value) {
    if (this.head === null) {
      this.#head = new Node(key, value);
    } else {
      let curr = this.head;
      while (curr.next !== null) {
        curr = curr.next;
      }

      curr.next = new Node(key, value);
    }
    this.#size++;
  }

  find(key) {
    let curr = this.head;

    while (curr !== null) {
      if (curr.key === key) {
        return curr;
      }

      curr = curr.next;
    }

    return null;
  }

  remove(key) {
    if (this.head.key === key) {
      this.#head = this.head.next;
      this.#size--;

      return true;
    }

    let prev = this.head;
    let curr = prev.next;

    while (curr !== null) {
      if (curr.key === key) {
        prev.next = curr.next;
        this.#size--;

        return true;
      }

      prev = curr;
      curr = curr.next;
    }

    return false;
  }

  toArray() {
    const arr = [];

    let curr = this.head;
    while (curr !== null) {
      arr.push(curr);
      curr = curr.next;
    }

    return arr;
  }

  get head() {
    return this.#head;
  }

  get size() {
    return this.#size;
  }
}

class HashMap {
  constructor(capacity = 16, loadFactor = 0.75) {
    this.capacity = capacity;
    this.loadFactor = loadFactor;
    this.hashMap = this.#initHashMap();
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const bucket = this.hashMap[this.hash(key)];
    const node = bucket.find(key);

    if (node === null) {
      bucket.append(key, value);
    } else {
      node.value = value;
    }

    this.#checkBucketCapacity();
  }

  get(key) {
    const bucket = this.hashMap[this.hash(key)];
    const node = bucket.find(key);

    return node;
  }

  has(key) {
    const node = this.get(key);

    return node !== null;
  }

  remove(key) {
    const bucket = this.hashMap[this.hash(key)];

    return bucket.remove(key);
  }

  length() {
    let total = 0;
    for (let bucket of this.hashMap) {
      total += bucket.size;
    }

    return total;
  }

  clear() {
    this.hashMap = this.#initHashMap();
  }

  keys() {
    const keys = [];

    for (let bucket of this.hashMap) {
      keys.push(...bucket.toArray().map((node) => node.key));
    }

    return keys;
  }

  values() {
    const values = [];

    for (let bucket of this.hashMap) {
      values.push(...bucket.toArray().map((node) => node.value));
    }

    return values;
  }

  entries() {
    const entries = [];

    for (let bucket of this.hashMap) {
      entries.push(...bucket.toArray().map((node) => [node.key, node.value]));
    }

    return entries;
  }

  #initHashMap() {
    return new Array(this.capacity).fill(null).map(() => new LinkedList());
  }

  #checkBucketCapacity() {
    const totalEntries = this.length();
    if (totalEntries > this.capacity * this.loadFactor) {
      console.log("Growing...");
      this.#growBuckets();
    }
  }

  #growBuckets() {
    const entries = this.entries();

    // Double capacity and create new hashmap
    this.capacity *= 2;
    this.clear();

    for (let [key, value] of entries) {
      this.set(key, value);
    }
  }
}

const test = new HashMap(); // or HashMap() if using a factory
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log(test.entries());
console.log(test.length());
console.log(test.capacity);

test.set("lion", "brown");
test.set("apple", "yellow");
console.log(test.entries());
console.log(test.length());
console.log(test.capacity);

test.set("moon", "silver");
console.log(test.length());
console.log(test.capacity);
