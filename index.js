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

const correr = (a) => {
  var end, start;

  start = new Date();
  for (var i = 0; i < 1000; i++) {
    Math.sqrt(i);
  }
  while (a.distancia < a.carro.carril.longitud) {
    function aleatorio(minimo, maximo) {
      return Math.floor(Math.random() * (maximo + 1 - minimo) + minimo);
    }

    const numero = aleatorio(1, 6);
    //console.log(numero)
    let nuevaDistancia = numero * 100;
    //console.log('la nueva distancia es', nuevaDistancia)
    a.distancia = a.distancia + nuevaDistancia;
    console.log(a.nombre, "ha recorrido", a.distancia, "KM");
  }

  end = new Date();
  console.log(
    "Tu tiempo fue de " + (end.getTime() - start.getTime()) + " msec"
  );
  console.log("has alcanzado la meta", a.nombre);
};

const main = async () => {
  const numberOfPlayers = await requestNumberOfPlayes();
  const driversList = await createListOfDrivers(numberOfPlayers);
  const carsList = createListOfCars(driversList);
  console.log(carsList);
  const trackRace = new TrackRace(carsList, 10000);
  trackRace.startRace();
};

main();
