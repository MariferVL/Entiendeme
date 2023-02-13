import { getElements, getGeneration } from "./main.js";


// Filter data by zodiac or generation
function filterData(data, condition) { 
  console.log("Zodiaco en data es: " + data);
  console.log("objeto en data es: " + condition);
  if (condition === "element") {
    console.log("Zodiaco en if es: " + data);
    console.log("objeto en if es: " + condition);
    getElements(data);
  }
  else if (condition === "generation") {
    console.log("Entro a generation")
    getGeneration()
  }
  else {
    console.log("Opcion no válida");
  }
  
}

const actorsCancer = [];
const singers = [];

// Sort data by celebrity type (singer or actor) and in ascending/descendig order.
function sortData(data, sortBy, sortOrder){

}

// Show any chart just because.
function computeStats(data){

}
























export { filterData }
