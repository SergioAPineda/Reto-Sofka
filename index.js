const fs = require("fs");
const inquirer = require("inquirer");
const Driver = require("./Models/Driver");
const Car = require("./Models/Car");
const TrackRace = require("./Models/TrackRace");

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

const createFile = (informacion) => {
  fs.appendFile("documento.txt", `Resultado: ${informacion}`, (error) => {
    if (error) {
      throw error;
    }
  });
};

const createPodium = (arriveCarsOrder) => {
  if (arriveCarsOrder.length < 3) {
    const message = `No hay jugadores suficientes para completar el podio \n`;
    return message;
  } else {
    const firstPlace = arriveCarsOrder[0].driver.name;
    const secondPlace = arriveCarsOrder[1].driver.name;
    const thirdPlace = arriveCarsOrder[2].driver.name;
    const podiumResult = `El ganador fue: -${firstPlace}-, el segundo lugar fue para: -${secondPlace}- y el tercer lugar: -${thirdPlace}- \n`;
    return podiumResult;
  }
};

const getInfoFromFile = () => {
  let info = fs.readFileSync("./documento.txt", { encoding: "utf-8" });
  const infoTxtList = info.split("\n");
  return infoTxtList;
};

const createWinnersList = (elementsList) => {
  listOfWinners = [];
  elementsList.forEach((element) => {
    if (
      elementsList.indexOf(element) === 1 ||
      elementsList.indexOf(element) === 3 ||
      elementsList.indexOf(element) === 5
    ) {
      listOfWinners.push(element);
    }
  });
  return listOfWinners;
};

const getListOfWinners = (infotxtList) => {
  let winnersList = [];
  infotxtList.forEach((element) => {
    if (element !== `No hay jugadores suficientes para completar el podio \n`) {
      const elementsList = element.split("-");
      winnersList = winnersList.concat(createWinnersList(elementsList));
    }
  });
  console.log("winner list", winnersList);
  return winnersList;
};

const getNameToCheck = async () => {
  const { playerName } = await inquirer.prompt([{
    type: 'confirm',
    name: "confirm",
    message: `Desea consultar resultados por jugador?`,
  },{
    type: "input",
    name: "playerName",
    message: `ingrese el nombre del jugador que desea condultar `,
  }]);
  return playerName;
};

const main = async () => {
  const numberOfPlayers = await requestNumberOfPlayes();
  const driversList = await createListOfDrivers(numberOfPlayers);
  const carsList = createListOfCars(driversList);
  const trackRace = new TrackRace(carsList, 10000);
  const arriveCarOrderList = trackRace.startRace();
  const podium = createPodium(arriveCarOrderList);
  createFile(podium);
  const infoFromFile = getInfoFromFile();
  getListOfWinners(infoFromFile);
  await getNameToCheck()
};

main();
