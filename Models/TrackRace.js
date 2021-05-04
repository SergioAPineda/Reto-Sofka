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
    let arriveCarsOrder = [];
    this.lanes.forEach((lane,index) => {
      let counter = 0;
      while (!lane.didCarFinish()) {
        const diceResult = throwDice();
        const distanceToMove = diceResult * 100;
        lane.setCarPosition(distanceToMove);
        counter ++
        //console.log(index, lane.currentPosition);
        if (lane.didCarFinish()) {
          arriveCarsOrder.push(counter);
          arriveCarsOrder.push(lane.car);
        }
      }
    });
    return arriveCarsOrder
  }
}

module.exports = TrackRace;
