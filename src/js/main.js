import { filterData } from "./data.js";

//construirás una página web para visualizar un conjunto (set) de datos
//se adecúe a lo que descubras que tu usuario necesita.

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

const printData = async () => {
  const a = await astroData;
  const option = await obj.getOption();

  const zodiac = a["zodiac"]["name"];

  //DOM
  filterData(zodiac, option);
};

// document.querySelector("#condition").addEventListener("click", printData);

// Const of elements
const earth = ["Capricornio", "Tauro", "Virgo"];
const air = ["Libra", "Geminis", "Acuario"];
const water = ["Cancer", "Piscis", "Escorpio"];
const fire = ["Aries", "Leo", "Sagitario"];

// Get element of sign
function getElements(zodiac) {
  const msj = "Este signo pertenece al elemento de ";
  const msj2 = " igual que:";
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
  const date = document.getElementById("dob").value;
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

/* //global variables
var deck = {};
var rank = "";
var suit = "";
var deckArr = [];
var backImg = "<img class='back' src='/images/carta.png' />"

//Creates a tarot card deck 

function createDeck() {
  deckArr = [];

  function deckConst(name, displayName) {
    this.name = name;
    this.displayName = displayName;
  }

  var id = 0;
  for (var a0 = 0; a0 < 4; a0++) {

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

    for (var a1 = 1; a1 < 15; a1++) {
      var rank = a1;
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
      // assigns the name that jives with biddy tarot's urls
      var name = rank + "_" + suit;
      // overcomplicated way to title-case & replace '_' with ' '
      var displayName = name.replace(/_/g, " of ")
        .toLowerCase()
        .split(' ')
        .map(i => i[0].toUpperCase() + i.substring(1))
        .join(' ');

      card = new deckConst(name, displayName);
      deck[id] = card;
    }
  }

  deck[57] = new deckConst('fool');
  deck[58] = new deckConst('magician');
  deck[59] = new deckConst('high_priestess');
  deck[60] = new deckConst('empress');
  deck[61] = new deckConst('emperor');
  deck[62] = new deckConst('hierophant');
  deck[63] = new deckConst('lovers');
  deck[64] = new deckConst('chariot');
  deck[65] = new deckConst('strength');
  deck[66] = new deckConst('hermit');
  deck[67] = new deckConst('wheel_of_fortune');
  deck[68] = new deckConst('justice');
  deck[69] = new deckConst('hanged_man');
  deck[70] = new deckConst('death');
  deck[71] = new deckConst('temperance');
  deck[72] = new deckConst('devil');
  deck[73] = new deckConst('tower');
  deck[74] = new deckConst('star');
  deck[75] = new deckConst('moon');
  deck[76] = new deckConst('sun');
  deck[77] = new deckConst('judgement');
  deck[78] = new deckConst('world');

  // totally over-complicated code to capitolize, space & add a 'the' to trump cards that needed it
  for (var x = 57; x <= 78; x++) {
    var capStr = deck[x].name
      .replace(/_/g, " ")
      .toLowerCase()
      .split(' ')
      .map(i => i[0].toUpperCase() + i.substring(1))
      .join(' ');


    if (x === 65 ||
      x === 68 ||
      x === 70 ||
      x === 71 ||
      x === 77) {
      deck[x].displayName = capStr;
    } else {
      deck[x].displayName = "The " + capStr;
    }
  }



  for (var t = 0; t < 78; t++) {
    deckArr.push(t + 1);
  }

  return deckArr;
  return deck;
}

//gets image i = id from createDeck()
function riderWaite(i) {
  var img = $("<img class='front' src='https://www.biddytarot.com/cards/" +
    deck[i].name + ".jpg' alt=" + deck[i].displayName + "/>");
  return img;

}

//Selects random cards & prevents doubles
function randGen() {
  var cardsLeft = deckArr.length;
  var randInt = Math.floor((Math.random() * cardsLeft));
  var randNum = deckArr[randInt];
  deckArr.splice(randInt, 1);
  return randNum;
}

//Past, Present, Future spread
function pastPresentFuture() {
  $("img, #blurb, #card-name, #rev").remove();
  $("#pastPresentFuture").html('Another Reading?');

  for (var b = 1; b <= 3; b++) {
    var rand = randGen();

    var randInvert = Math.floor((Math.random() * 101));
    var randCardImg = riderWaite(rand);
    var randCardDisplayName = "<p id='card-name'>" + deck[rand].displayName + "</p>"

    if (randInvert >= 15) {
      $("#td-" + b).html(randCardImg);
      $("#td-display-name-" + b).append(randCardDisplayName);
    } else {
      $("#td-" + b).html(randCardImg).addClass("invert");
      $("#td-display-name-" + b).append(randCardDisplayName);
      $("#rev-" + b).html('<p id="rev"><i>Reversed</i></p>');
    }
  }
} */

//Shows all cards (used in debugging)
//function debug() {
//  createDeck();

//  for (var i = 1; i < Object.keys(deck).length; i++) {
//    console.log(deck[i].displayName);
//  }
//}

export { getElements, getGeneration, getLatLng };
