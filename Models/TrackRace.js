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
  startRace(name) {
    const arriveCarsOrder = [];
    this.lanes.forEach((lane,index) => {
      while (!lane.didCarFinish()) {
        const diceResult = throwDice();
        const distanceToMove = diceResult * 100;
        lane.setCarPosition(distanceToMove);
        console.log(index, lane.currentPosition);
        if (lane.didCarFinish()) {
          arriveCarsOrder.push(lane.car);
        }
      }
    });
    return arriveCarsOrder
  }
}

module.exports = TrackRace;
