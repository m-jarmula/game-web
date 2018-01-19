class SortedQueueHelper {
  constructor(options) {
    this.maxLength = options.maxLength || 999;
    this.queue = [];
  }

  add(element) {
    if(this.queue.length < this.maxLength) {
      this.queue.push(element)
    } else {
      this.queue = [];
    }
    this.queue = this.sortedQueue();
    return this;
  }

  sortedQueue() {
    return this.queue.sort((a, b) => {
      if(a.timestamp > b.timestamp) {
        return 1
      } else if(b.timestamp > a.timestamp) {
        return -1
      } else {
        return 0;
      }
    });
  }

  last() {
    var lastIndex = this.queue.length - 1;
    return this.queue[lastIndex];
  }
}

export default SortedQueueHelper;
