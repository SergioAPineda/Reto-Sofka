const { throwDice } = require("../Utils/utils");

class Lane {
  constructor(car, distance) {
    this.car = car;
    this.distance = distance;
    this.currentPosition = 0;
  }
  setCarPosition(position) {
    this.currentPosition += position;
  }

  didCarFinish() {
    return this.currentPosition >= this.distance;
  }
}

class TrackRace {
  constructor(cars, distance = 1000) {
    this.cars = cars;
    this.distance = distance;
    this.lanes = cars.map((car) => new Lane(car, distance));
  }
  startRace() {
    const arriveCarsOrder = [];
    this.lanes.forEach((lane) => {
      while (!lane.didCarFinish()) {
        const diceResult = throwDice();
        const distanceToMove = diceResult * 100;
        lane.setCarPosition(distanceToMove);
        console.log(lane.currentPosition);
        if (lane.didCarFinish()) {
          arriveCarsOrder.push(lane.car);
        }
      }
    });
    console.log(arriveCarsOrder);
  }
}

module.exports = TrackRace;
