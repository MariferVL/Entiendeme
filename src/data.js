import { getElements, getGeneration } from "./main.js";
// data.js
// filterData(data, condition): recibiría data, retornaría  datos que cumplan con condición.
// sortData(data, sortBy, sortOrder): 1° parámetro nos entrega datos. 2ndo param refiere campo de data a ordenar.3er param indica==> ascendente o descendente.
// computeStats(data): cálculos estadísticos básicos para ser mostrados .

// TODO: visualizar la data
//TODO: filtrar la data
//TODO: ordenar la data
// TODO:hacer algún cálculo agregado.



// Filter data by zodiac or generation
function filterData(zodiac, condition) { 
  console.log("Zodiaco en data es: " + zodiac);
  console.log("objeto en data es: " + condition);
  if (condition === "element") {
    console.log("Zodiaco en if es: " + zodiac);
    console.log("objeto en if es: " + condition);
    getElements(zodiac);
  }
  else if (condition === "generation") {
    console.log("Entro a generación");
    getGeneration();
  }
}



const actorsCancer = [];
const singers = [];





















export { filterData }
/* export const example = () => {
  return 'example';
};

export const anotherExample = () => {
  return 'OMG';
};
 */