import {
  getElements,
  getGeneration,
  getCategory,
  hideSelector,
  getCelebrities,
} from "./main.js";
import celebrities from "../data/celebrities.js";

// Filter data by zodiac or generation
function filterData(data, condition) {
  let valid = true;
  if (condition === "element") {
    hideSelector();
    getElements(data);
  } else if (condition === "generation") {
    hideSelector();
    getGeneration();
  } else if (condition === "celebrities") {
    hideSelector();
    getCategory(data);
  } else {
    valid = false;
  }
  return valid;
}

const actorsCancer = [];
const singers = [];

let names = [];

// Sort data by celebrity type (singer or actor) and in ascending/descendig order.
function sortData(data, sortBy, sortOrder) {
  // sortBy = [Actuación, canto, deporte y tv]
  // sortOrder = [Ascendente, descendente]
  celebrities["celebrities"].forEach((dictionary) => {
    if (data.slice(0, 5) === dictionary["sign"].slice(0, 5)) {
      if (sortBy === dictionary["category"]) {
        names.push(dictionary["name"]);
      }
    }
  });
  if (sortOrder === "A-Z") {
    names = names.sort();
    console.log("Entró  :  A-Z");
  } else if (sortOrder === "Z-A") {
    console.log("Entró Z-A ");

    names = names.sort().reverse();
  }
  getCelebrities(names);
}

// Show any chart just because.
function computeStats(data) {}

// function sortData(data, sortBy, sortOrder){

export { filterData, sortData };
