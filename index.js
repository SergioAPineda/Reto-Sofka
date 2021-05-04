const fs = require("fs");
const inquirer = require("inquirer");
const Driver = require("./Models/Driver");
const Car = require("./Models/Car");
const TrackRace = require("./Models/TrackRace");
const { rejects } = require("assert");
const { resolve } = require("path");


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
    message: `\n\n***Bienvenido a CarRace***\n\n
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
    return 'Se ha añadido la información'
  });
};

const getListOfPlaces = (arriveCarOrderList) => {
  if (arriveCarOrderList.length < 6){
    const message = `\nNo hay jugadores suficientes para completar el podio \n`;
    console.log(message);
    return;
  }else{
    let items = [];
    arriveCarOrderList.forEach((item) => {
      if (typeof item !== "string") items.push(item);
    });
    return items;
  }
};

const sortArrivePlaces = (arrivePlaces) => {
  if (!arrivePlaces) return;
  return arrivePlaces.sort();
};

const getWinnersList = (arriveCarOrderList, sortArrivePlaces) => {
  if (!sortArrivePlaces) return;
  let winnersList = [];
  for (let index = 0; index < 3; index++) {
    const element = arriveCarOrderList.indexOf(sortArrivePlaces[index]);
    let nameIndex = element + 1;
    winnersList.push(arriveCarOrderList[nameIndex]);
  }
  return winnersList;
};

const createPodium = (arriveCarsOrder) => {
  if(!arriveCarsOrder) return;
    const firstPlace = arriveCarsOrder[0].driver.name;
    const secondPlace = arriveCarsOrder[1].driver.name;
    const thirdPlace = arriveCarsOrder[2].driver.name;
    const podiumResult = `\n\nEl ganador fue: -${firstPlace}-, el segundo lugar fue para: -${secondPlace}- y el tercer lugar: -${thirdPlace}- \n`;
    console.log(podiumResult);
    return podiumResult;
};

const getInfoFromFile = () => {
  let info = fs.readFileSync("./documento.txt", { encoding: "utf-8" });
  const infoTxtList = info.split('\n')
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
  //}
};

const getListOfWinners = (infotxtList) => {
  let winnersList = [];
  infotxtList.forEach((element) => {
    const elementsList = element.split("-");
    winnersList = winnersList.concat(createWinnersList(elementsList));
  });
  return winnersList;
};

const getNameToCheck = async () => {
  const { playerName } = await inquirer.prompt({
    type: "input",
    name: "playerName",
    message: `\n Si desea consultar el historico de un jugador, ingrese el nombre del jugador o juego presione enter Enter para finalizar.`,
  });
  return playerName;
};

const consultWinners = (winnerName) => {
  if(winnerName === '') return 'Finalizando...'
    let count = 0;
    const infoFromFile = getInfoFromFile();
    const listOfWinners = getListOfWinners(infoFromFile);
    listOfWinners.forEach((winner) => {
      if (winner === winnerName) {
        count++;
      }
    });
    console.log(`\n El jugador ${winnerName} ha ganado ${count} carreras \n`);
    return count;
};

const main = async () => {
  const numberOfPlayers = await requestNumberOfPlayes();
  const driversList = await createListOfDrivers(numberOfPlayers);
  const carsList = createListOfCars(driversList);
  const trackRace = new TrackRace(carsList, 10000);
  const arriveCarOrderList = trackRace.startRace();
  const arrivePlaces = getListOfPlaces(arriveCarOrderList);
  const listSortArrivePlaces = sortArrivePlaces(arrivePlaces);
  const winnersList = getWinnersList(arriveCarOrderList, listSortArrivePlaces);
  const podium = createPodium(winnersList);
  createFile(podium);
  const winnerName = await getNameToCheck();
  console.log(consultWinners(
    winnerName
  ));
  console.log("\n\n*** CarRace ha Finalizado ***\n\n");
};

main();
