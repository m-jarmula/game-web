class MovementDetectorHelper {
  constructor() {
    this.timestamps = {
      'up': 0,
      'down': 0,
      'left': 0,
      'right': 0
    };
  }

  validateTimestamp(data) {
    return data.timestamp > this.timestamps[data.direction];
  }

  updateTimestamp(data) {
    this.timestamps[data.direction] = data.timestamp;
  }
}

export default MovementDetectorHelper;
