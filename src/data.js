// data.js
// filterData(data, condition): recibiría data, retornaría  datos que cumplan con condición.
// sortData(data, sortBy, sortOrder): 1° parámetro nos entrega datos. 2ndo param refiere campo de data a ordenar.3er param indica==> ascendente o descendente.
// computeStats(data): cálculos estadísticos básicos para ser mostrados .

// TODO: visualizar la data
//TODO: filtrar la data
//TODO: ordenar la data
// TODO:hacer algún cálculo agregado.

// document.addEventListener("click", getData);

const astroData = fetch("/data/astrology.json")
  .then((response) => response.json())
  .then((info) => {
    return info.data;
  });

const printData = async () => {
  const a = await astroData;
  console.log(a);
};

JSON.parse(printData());
console.log("Fuera conJSON: " + JSON.parse(astroData));

/* const water = "cancer, pisces, scorpio";
const fire = "aries, sagitarius, leo";
const air = "libra, aquarius, gemini";
const earth = "capricorn, taurus, virgo";
const zodiac = data["data"]["zodiac"]["name"];  */

/* function filterData(data, condition) {
  if (zodiac == "Cancer" || zodiac == "Pisces" || zodiac == "Scorpio") {
    return water;
  }
  else if (zodiac == "Aries" || zodiac == "Sagitarius" || zodiac == "Leo") {
    return fire;
  }
  else if (zodiac == "Libra" || zodiac == "Aquarius" || zodiac == "Gemini") {
    return air;
  }
  else if (zodiac == "Capricorn" || zodiac == "Taurus" || zodiac == "Virgo") {
    return earth;
  }
}


const actorsCancer = [];
const singers = [];
 */





















/* export const example = () => {
  return 'example';
};

export const anotherExample = () => {
  return 'OMG';
};
 */