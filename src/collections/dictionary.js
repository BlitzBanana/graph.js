class Dictionary {
  constructor(obj = {}) {
    this.items = {};
    Object
      .keys(obj)
      .forEach(key => {
        this.add(key, obj[key]);
      });
  }

  get keys() {
    return Object.keys(this.items);
  }

  get length() {
    return this.keys.length;
  }

  get count() {
    return this.length;
  }

  get values() {
    return Object
      .keys(this.items)
      .map(key => this.items[key]);
  }

  add(key, value) {
    if (key === undefined || key === null) {
      throw new Error('Key is undefined');
    }
    if (this.items[key] !== undefined) {
      throw new Error('An element with the same key already exists');
    }
    this.items[key] = value;
  }

  get(key) {
    return this.items[key];
  }

  remove(key) {
    if (this.items[key] === undefined) {
      throw new Error('Key does not exists');
    }
    delete this.items[key];
  }

  containsKey(key) {
    let result = false;
    this.keys.forEach(x => {
      result = result || (x === key);
    });
    return result;
  }

  containsValue(value) {
    let result = false;
    this.values.forEach(x => {
      result = result || (x === value);
    });
    return result;
  }

  toJSON() {
    return JSON.stringify(this.items);
  }
}

export default Dictionary;
