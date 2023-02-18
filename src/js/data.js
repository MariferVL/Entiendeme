import {
  getElements,
  getGeneration,
  getCategory,
  getCelebrities,
} from "./main.js";
import celebrities from "../data/celebrities.js";

// Filter data by zodiac or generation
function filterData(data, condition) {
  let valid = true;
  if (condition === "element") {
    
    getElements(data);
  } else if (condition === "generation") {
    
    getGeneration();
  } else if (condition === "celebrities") {
   
    getCategory(data);
  } else {
    valid = false;
  }
  return valid;
}

const actorsCancer = [];
const singers = [];


let namesFilter = [];
// Sort data by celebrity type (singer or actor) and in ascending/descendig order.
function sortData(data, sortBy, sortOrder) {
  const names = [];
  let namesArray = []

  celebrities["celebrities"].forEach((dictionary) => {
    if (data.slice(0, 5) === dictionary["sign"].slice(0, 5)) {
      if (sortBy === dictionary["category"]) {
        names.push(dictionary["name"]);
        namesFilter = names.filter(
          (item, index) => names.indexOf(item) === index
        );
        namesArray = names;
      }
    }
  });
  if (sortOrder === "A-Z") {
    namesFilter = namesFilter.sort();
    namesArray = namesFilter;
  } else if (sortOrder === "Z-A") {
    namesFilter = namesFilter.sort().reverse();
    namesArray = namesFilter;
  }
  // Algo que contenga los dos names por separado  
  getCelebrities(namesArray);
}

// Show any chart just because.
function computeStats(data) {}

// function sortData(data, sortBy, sortOrder){

export { filterData, sortData };
