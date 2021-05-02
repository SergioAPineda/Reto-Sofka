const Driver = require('./Models/Driver')
const Car = require('./Models/Car')
const TrackRace = require('./Models/TrackRace')

const driver1 = new Driver('Sergio');
const driver2 = new Driver('Rolin')
const carsList = [new Car(driver1, 1), new Car(driver2, 2)]
const trackRace = new TrackRace(carsList, 5000);