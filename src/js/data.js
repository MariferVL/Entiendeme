import { getElements, getGeneration, getCelebrities } from "./main.js";


// Filter data by zodiac or generation
function filterData(data, condition) { 
  console.log("Zodiaco en data es: " + data);
  console.log("objeto en data es: " + condition);
  let valid = true
  if (condition === "element") {
    getElements(data);
  }
  else if (condition === "generation") {
    getGeneration()
  }
  else if (condition === "celebrities"){
    getCelebrities(data);
  } else {
    valid = false;
  }
  return valid;
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
