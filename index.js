const inquirer = require("inquirer");
const Driver = require("./Models/Driver");
const Car = require("./Models/Car");
const TrackRace = require("./Models/TrackRace");

const driverList = [];

const requestNumberOfPlayes = async () => {
  const { numberOfPlayers } = await inquirer.prompt({
    type: "input",
    name: "numberOfPlayers",
    validate: (answer) => {
      if (isNaN(answer)) {
        return "Por favor ingrese un número";
      }
      return true;
    },
    message: `***Bienvenido a CarRace***\n\n
      ingrese el número de jugadores 
    `,
  });

  return numberOfPlayers;
};

const requestName = async () => {
  const { playerName } = await inquirer.prompt({
    type: "input",
    name: "playerName",
    message: `ingrese el nombre del jugador `,
  });
  return playerName;
};

const createListOfDrivers = async (numberOfPlayers) => {
  if (!numberOfPlayers) return [];
  const driversList = [];
  for (let index = 0; index < numberOfPlayers; index++) {
    const playerName = await requestName();
    driversList.push(new Driver(playerName));
  }
  return driversList;
};

const createListOfCars = (driversList) => {
  if (!driversList || driversList.length <= 0) return [];
  return driversList.map((driver, index) => new Car(driver, index));
};

const main = async () => {
  const numberOfPlayers = await requestNumberOfPlayes();
  const driversList = await createListOfDrivers(numberOfPlayers);
  const carsList = createListOfCars(driversList);
  console.log(carsList);
};

main();
