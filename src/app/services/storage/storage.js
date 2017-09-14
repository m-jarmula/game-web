class Storage {
  getItem(item) {
    let data = this.sessionProvider[item];
    return !!data ? JSON.parse(data) : null;
  }

  setItem(itemName, itemValue) {
    var dataAsString = JSON.stringify(itemValue);
    this.sessionProvider[itemName] = dataAsString;
  }
}

export default Storage;
