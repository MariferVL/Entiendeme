// import { example } from "./data.js";
// import data from './data/lol/lol.js';
// import data from './data/rickandmorty/rickandmorty.js';

//construirás una página web para visualizar un conjunto (set) de datos
//se adecúe a lo que descubras que tu usuario necesita.

// Usa VanillaJS.
//visualizar la data ==>API ==> JSON,
// TODO: conexión DOM ==> main.js
//puedes usar más archivos y carpetas ==>estructura clara

// data.js
// filterData(data, condition): recibiría data, retornaría  datos que cumplan con condición.
// sortData(data, sortBy, sortOrder): 1° parámetro nos entrega datos. 2ndo param refiere campo de data a ordenar.3er param indica==> ascendente o descendente.
// computeStats(data): cálculos estadísticos básicos para ser mostrados .

// TODO: ordenarla y
// TODO:hacer algún cálculo agregado.

// TODO: data de forma dinámica ==> JSON por medio de fetch ==>src/data contiene .js y una .json

/*
const url = "https://api.prokerala.com/v2/astrology/birth-details";
const data = {
  "ayanamsa": "1",
  "coordinates": "19.800904,-99.0627642",
  "datetime": "1996-01-05T01:11:00-06:00",
  "la": "en",
};

 fetch(url, {
  method: "GET", // or 'PUT'
  body: JSON.stringify(data), // data can be `string` or {object}!
  headers: {
    "Content-Type": "application/json",
    // "Grant Type": "Client Credentials",
    "Access Token URL": "https://api.prokerala.com/token",
    "Client ID": "38d679a7-f362-4f48-948e-8a96b28f82a2",
    "Client Secret": "G1adGxWCUcuLm40UeE3toMqkowfdrSTUF6Ncl0p0",
    "Client Authentication": "Send client credentials in body",
  },
})
  .then((res) => res.json())
  .catch((error) => console.error("Error:", error))
  .then((response) => console.log("Success:", response));

console.log(example, data); */
document.addEventListener("click", showBirthChart);
// document.getElementById("details").innerHTML = 
function showBirthChart() {
  fetch("/data/astrology.json")
    .then((res) => {
      return res.json();
    })
    .then((data) => console.log("Data nakshatra vedic name: " + data["data"]["nakshatra"]["lord"]["vedic_name"] 
    + ". Data chandra rasi vedic name: " + data["data"]["chandra_rasi"]["lord"]["vedic_name"]));
  //  LISTA   info[1]
  // Dicc info["data"][1]   ||  info.data[1]  ==> pada: 3
}

