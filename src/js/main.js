import { filterData, sortData, computeStats } from "./data.js";
import celebrities from "../data/celebrities.js";


// Show map for long/lat
function initMap() {
  const myLatlng = { lat: -14.6306, lng: -57.4633 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: myLatlng,
  });
  // Create the initial InfoWindow.
  let infoWindow = new google.maps.InfoWindow({
    content: "¡Dale click en tu ciudad de nacimiento!",
    position: myLatlng,
  });

  infoWindow.open(map);
  // Configure the click listener.
  map.addListener("click", (mapsMouseEvent) => {
    // Close the current InfoWindow.
    infoWindow.close();
    // Create a new InfoWindow.
    infoWindow = new google.maps.InfoWindow({
      position: mapsMouseEvent.latLng,
    });
    infoWindow.setContent(
      getLatLng(mapsMouseEvent.latLng),
      JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
    );
    infoWindow.open(map);
  });
}

window.initMap = initMap;

// Get lat & long
//"19.800904,-99.0627642"
function getLatLng(location) {
  const latLong = JSON.stringify(location).replace(/"lat":|"lng":|/gi, "");
  document.getElementById("location").value = latLong;
}

// Select value of filter (element, generation)
const obj = {
  getOption: function () {
    return document.getElementById("options").value;
  },
};

//TODO: API se llama solo con click confirmación formulario

// API Conection
// https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe

const astroData = fetch("/data/astrology.json")
  .then((response) => response.json())
  .then((info) => {
    return info.data;
  });

let zodiac;
const printData = async () => {
  const a = await astroData;
  const option = await obj.getOption();

  zodiac = a["zodiac"]["name"];

  //DOM
  if (!filterData(zodiac, option)) {
    // Mensaje de "Opcion no válida"
  }
};


document.querySelector("#options").addEventListener("change", printData);

// Const of elements
const earth = ["Capricornio", "Tauro", "Virgo"];
const air = ["Libra", "Geminis", "Acuario"];
const water = ["Cancer", "Piscis", "Escorpio"];
const fire = ["Aries", "Leo", "Sagitario"];

// Get element of sign
function getElements(zodiac) {
  // recorrer diccionario
  // match entre signo y sign de diccionario
  const msj = "Este signo pertenece al elemento de ";
  const msj2 = " igual que: ";

  if (zodiac === "Capricorn" || zodiac === "Virgo" || zodiac === "Taurus") {
    console.log(msj + "tierra" + msj2);
    earth.forEach((sign) => console.log(sign));
  } else if (
    zodiac === "Libra" ||
    zodiac === "Gemini" ||
    zodiac === "Aquarius"
  ) {
    console.log(msj + "aire" + msj2);
    air.forEach((sign) => console.log(sign));
  } else if (
    zodiac === "Cancer" ||
    zodiac === "Pisces" ||
    zodiac === "Scorpio"
  ) {
    console.log(msj + "agua" + msj2);
    water.forEach((sign) => console.log(sign));
  } else if (
    zodiac === "Aries" ||
    zodiac === "Leo" ||
    zodiac === "Sagittarius"
  ) {
    console.log(msj + "fuego" + msj2);
    fire.forEach((sign) => console.log(sign));
  }
}

// Get generation
function getGeneration() {
  const msj = "De acuerdo a tu año de nacimiento perteneces a la generación: ";
  const date = document.getElementById("DateOB").value;
  const year = date.slice(0, 3);

  if (year <= "1960" && year >= "1949") {
    console.log(msj + "Baby Boomer");
  } else if (year <= "1980" && year >= "1969") {
    console.log(msj + "X");
  } else if (year <= "1993" && year >= "1981") {
    console.log(msj + "Millennial");
  } else if (year <= "2010" && year >= "1994") {
    console.log(msj + "Z");
  } else if (year <= "2023" && year >= "2011") {
    console.log(msj + "Alfa");
  }
}


function removeElements(id) {
  const parent = document.getElementById(id);
  let child = parent.firstChild;
  while (child) {
    parent.removeChild(child);
    child = parent.firstChild
  }
}

//Get selected option from Categories
function getCategory(sign) {
  const categoriesList = [];
  celebrities["celebrities"].forEach((dictionary) => {
    if (sign.slice(0, 5) === dictionary["sign"].slice(0, 5)) {
      categoriesList.push(dictionary["category"]);
    }
  });
  removeElements("sortBy");
  // Create new options in select
  const categoriesToPrint = categoriesList.filter(
    (item, index) => categoriesList.indexOf(item) === index
  );

  const sel = document.getElementById("sortBy");
  sel.innerHTML =
    "<option selected disabled>Selecciona área de tu interés</option>";
  categoriesToPrint.forEach((element) => {
    const opt = document.createElement("option");
    opt.value = element;
    opt.text = element;
    sel.add(opt);
  });

  // Listener with change for select option
  const optionCategory = document.getElementById("sortBy");
  optionCategory.addEventListener("change", () => {
    removeElements("celebrity")
    const category = optionCategory.options[optionCategory.selectedIndex].value;
    sortData(sign, category, "ordenAlfabetico");
  });
}

// Show celebrities with the same sign
function getCelebrities(celebritiesNames) {
  // Create anchor for celebrities names
  for (let i = 0; i < celebritiesNames.length; i++) {
    const name = celebritiesNames[i];
    const divCeleb = document.getElementById("celebrity");
    const anchor = document.createElement("a");
    anchor.href = "#celebrityInfo";
    anchor.text = name;
    anchor.id = "celebrity" + i;
    divCeleb.appendChild(anchor);

  }

  //Enable sort by Order options
  const elements = document.querySelectorAll(".nav-link");
  elements.forEach((element) => {
    element.classList.remove("disabled");
  });

  document.getElementById("asc").addEventListener("click", (order) => {
    removeElements("celebrity")
    sortData("sign", "category", order.target.value);
  });
  document.getElementById("desc").addEventListener("click", (order) => {
    removeElements("celebrity")
    sortData("sign", "category", order.target.value);
  });
}

document.getElementById("celebrity").addEventListener("click", (event) => {
  console.log("Entro al listener " + event.target.text);
  printQuotes(event.target.text)
})

// Print quotes of celebrities
function printQuotes(celebName) {
  console.log("Entro a la funcion ");
  //entrar a mi diccionario, 
  celebrities["celebrities"].forEach(dictionary => {
    console.log("Entro al diccionario ");
    if (celebName === dictionary["name"]) {
      console.log("Entro al if" + dictionary["quote"] + dictionary["name"] + dictionary["DOB"]);
      document.getElementById("quote").innerText = dictionary["quote"];
      document.getElementById("nameCeleb").innerText = dictionary["name"];
      document.getElementById("DOB").innerText = dictionary["DOB"];
    }
  })
}

document.getElementById("optionsStats").addEventListener("change", (event) => {
  computeStats(celebrities["celebrities"], event.target.value, zodiac)
})



//global variables
const deck = {};
let deckArr = [];
const backImg = "<img class='back' src='./images/carta.png'/>"

//Creates a tarot card deck 

function createDeck() {
  deckArr = [];

  function cardsConst(displayName) {
    this.displayName = displayName;
  }

  let id = 0;
  for (let a0 = 0; a0 < 4; a0++) {

    switch (a0) {
    case 0:
      suit = "cups";
      break;
    case 1:
      suit = "pentacles";
      break;
    case 2:
      suit = "swords";
      break;
    case 3:
      suit = "wands";
      break;
    }

    for (let a1 = 1; a1 < 15; a1++) {
      let rank = a1;
      switch (a1) {
      case 1:
        rank = "ace";
        break;
      case 2:
        rank = "two"
        break;
      case 3:
        rank = "three"
        break;
      case 4:
        rank = "four"
        break;
      case 5:
        rank = "five"
        break;
      case 6:
        rank = "six"
        break;
      case 7:
        rank = "seven"
        break;
      case 8:
        rank = "eight"
        break;
      case 9:
        rank = "nine"
        break;
      case 10:
        rank = "ten"
        break;
      case 11:
        rank = "page";
        break;
      case 12:
        rank = "knight";
        break;
      case 13:
        rank = "queen";
        break;
      case 14:
        rank = "king";
        break;
      default:
        break;
      }
      id++;

      msg = new cardsConst(displayName);
      deck[id] = msg;
    }
  }

  deck[57] = new cardsConst('fool');
  deck[58] = new cardsConst('magician');
  deck[59] = new cardsConst('high_priestess');
  deck[60] = new cardsConst('empress');
  deck[61] = new cardsConst('emperor');
  deck[62] = new cardsConst('hierophant');
  deck[63] = new cardsConst('lovers');
  deck[64] = new cardsConst('chariot');
  deck[65] = new cardsConst('strength');
  deck[66] = new cardsConst('hermit');
  deck[67] = new cardsConst('wheel_of_fortune');
  deck[68] = new cardsConst('justice');
  deck[69] = new cardsConst('hanged_man');
  deck[70] = new cardsConst('death');
  deck[71] = new cardsConst('temperance');
  deck[72] = new cardsConst('devil');
  deck[73] = new cardsConst('tower');
  deck[74] = new cardsConst('star');
  deck[75] = new cardsConst('moon');
  deck[76] = new cardsConst('sun');
  deck[77] = new cardsConst('judgement');
  deck[78] = new cardsConst('world');


  for (let t = 0; t < 78; t++) {
    deckArr.push(t + 1);
  }

  return deckArr;
}

//gets image i = id from createDeck()
function getFront(i) {
  let img = $("<img class='front' src='https://www.biddytarot.com/cards/" +
    deck[i].name + ".jpg' alt=" + deck[i].displayName + "/>");
  return img;

}


// //Past, Present, Future spread
// function pastPresentFuture() {
//   $("img, #blurb, #card-name, #rev").remove();
//   $("#pastPresentFuture").html('Another Reading?');


//     let randCardDisplayName = "<p id='card-name'>" + deck[rand].displayName + "</p>"

//       $("#td-" + b).html(randCardImg);
//       $("#td-display-name-" + b).append(randCardDisplayName);
//       $("#td-" + b).html(randCardImg).addClass("invert");
//       $("#td-display-name-" + b).append(randCardDisplayName);
//       $("#rev-" + b).html('<p id="rev"><i>Reversed</i></p>');
//     }
//   }


export {
  getElements,
  getGeneration,
  getCategory,
  getCelebrities,
  createDeck,

};
