/* eslint-disable no-undef */
/* eslint-disable no-prototype-builtins */
import { filterData, sortData, computeStats } from "./data.js";
import celebrities from "../data/celebrities.js";
// import fetch from "./node-fetch";


//Get the button
const mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 ||
    document.documentElement.scrollTop > 20
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}


/* FORM SECTION */

let currentTab = 0;
document.addEventListener("DOMContentLoaded", function () {
  showTab(currentTab);
  document
    .getElementById("prevBtn")
    .addEventListener("click", () => nextPrev(-1));
  document
    .getElementById("nextBtn")
    .addEventListener("click", () => nextPrev(1));
});

function showTab(n) {
  const x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  if (n === 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n === x.length - 1) {
    document.getElementById("nextBtn").innerHTML =
      '<i class="fa fa-angle-double-right"></i>';
  } else {
    document.getElementById("nextBtn").innerHTML =
      '<i class="fa fa-angle-double-right"></i>';
  }
  fixStepIndicator(n);
}

function nextPrev(n) {
  const x = document.getElementsByClassName("tab");
  if (n === 1 && !validateForm()) return false;
  x[currentTab].style.display = "none";
  currentTab = currentTab + n;
  if (currentTab >= x.length) {
    document.getElementById("nextprevious").style.display = "none";
    document.getElementById("all-steps").style.display = "none";
    document.getElementById("register").style.display = "none";
    document.getElementById("text-message").style.display = "block";

    dataAPI();

    // Enable selector
    const elements = document.querySelectorAll(".form-select");
    elements.forEach((element) => {
      element.disabled = false;
    });
  } else {
    showTab(currentTab);
  }
}

function validateForm() {
  let i,
    valid = true;
  const x = document.getElementsByClassName("tab");
  const y = x[currentTab].getElementsByTagName("input");
  for (i = 0; i < y.length; i++) {
    if (y[i].value === "") {
      y[i].className += " invalid";
      valid = false;
    } else {
      if (currentTab === 2) {
        const input = y[i].value;
        const dateSplitted = input.split("-");
        const userYear = dateSplitted[0];
        const dateTimeRegex = /^\d{1,4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
        if (dateTimeRegex.test(input)) {
          const year = input.substring(0, 4);
          if (year <= new Date().getFullYear()) {
            y[i].setCustomValidity("");
          } else {
            y[i].setCustomValidity(
              " ¡Ey!, ✋🏻⚠️ No tan rápido.\n Disfruta tu año, el " +
              userYear +
              " ya llegará. 😉"
            );
            y[i].className += " invalid";
            valid = false;
          }
        } else {
          y[i].setCustomValidity(
            "Wow 😲 ¿Vienes del futuro?\nEl año " +
            userYear +
            " todavía no llega. 😅"
          );
          y[i].className += " invalid";
          valid = false;
        }
      }
    }
  }
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid;
}

const today = new Date().toLocaleString("sv-SE").replace(" ", "T").slice(0, 16);
const dob = document.getElementById("DateOB").value;


function fixStepIndicator(n) {
  let i;
  const x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  x[n].className += " active";
}

/* END FORM SECTION */

// FIXME: Buscar forma de sacar variable global. Indispensable para el parametro de API
let latLong;

// Get lat & long and insert in input
function getLatLng(location) {
  latLong = JSON.stringify(location).replace(/"lat":|"lng":|/gi, "");
  document.getElementById("location").value = latLong;
}

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

let dateTime;

// Get time zone from users location
async function getTimeZone() {
  const promise = new Promise((resolve) => {
    dateTime = document.getElementById("birthdaytime").value;
    const offset = new Date(dateTime).getTimezoneOffset(),
      o = Math.abs(offset);
    resolve(
      (offset < 0 ? "+" : "-") +
      ("00" + Math.floor(o / 60)).slice(-2) +
      ":" +
      ("00" + (o % 60)).slice(-2)
    );
  });

  const result = await promise;
  return result;
}


/* API SECTION */

const url = "https://api.prokerala.com/v2/astrology/birth-details";
const data = {
  ayanamsa: "1",
  coordinates: latLong,
  datetime: dateTime + ":00" + getTimeZone(),
  la: "en",
};

const myHeaders = new Headers();
myHeaders.append(
  "Authorization",
  "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI2MzljZWQ5OC1mYWNhLTQ3YTItOTk1ZC1jMGQwMzRmMjgyYTEiLCJqdGkiOiJjOWY1NzAxNmU5MTk4NWRjY2VhNzNhMzZiMWIyMjM1Zjc3ZjQ1YzYwYmZhZWJiMjgxN2Y1NTQyMTA2Yzk0M2ZjODY4ODVkNjRiMWUyMDQ3NSIsImlhdCI6MTY3NzAwMTYzNi43OTg1OSwibmJmIjoxNjc3MDAxNjM2Ljc5ODU5MywiZXhwIjoxNjc3MDA1MjM2Ljc5ODM3Niwic3ViIjoiMmQ3MDRmMDYtNjlhMC00OTdkLWI0YTQtOTE2OWZkZTk1YThlIiwic2NvcGVzIjpbXSwiY3JlZGl0c19yZW1haW5pbmciOjQ3MDAsInJhdGVfbGltaXRzIjpbeyJyYXRlIjo1LCJpbnRlcnZhbCI6NjB9XX0.HOmB6NTg6GaPYZXBgu-yej_FqF52KRvxgzSB0KcotnK4LaCOs-Rte4MHLjygwQNL6CUwCTDWQO6mJdg_cajNj9QGUPbvKb8jZAvSdIwpc_c-45r2q0J4BubLJWLl3KcDvE7sr_7JuKvZP7PhrPDv3j_PjEGjo0oc9fZqivJpXqtTXUI8gAnV5D7oAWN6FyJkQmVfgZ3WcF25RfJn2fSkM1zZQpuQ-Ej99_9_pcazaB6X-G-fLYhbm32k3jTtQx7hF0qvge5tsVtBSKT66izhcRqi_GbwLxh2SRYnn6KzCQJRxfVv4Oz-6OYokovkVztnHOpM1fh3nMczMPWzQ0a-bw"
);

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

const astroData = fetch(url + new URLSearchParams(data), requestOptions)
  .then((res) => res.text()) // res.json()
  .catch((error) => console.error("Error:", error))
  .then((response) => console.log("Success:", response.json()));

const dataAPI = async () => {
  const wait = await astroData;
  createCards(wait);
};

/* END API SECTION */


/* CARD SECTION */
let zodiac
// Create & print main results
function createCards(data) {
  const button1 = document.getElementById("typeAyur");
  const button2 = document.getElementById("balanceAyur");

  const userName = document.getElementById("fName").value;
  document.getElementById("msgUser").innerText =
    userName + ", estos son tus resultados:";

  zodiac = data["zodiac"]["name"];
  const nakshatra = data["nakshatra"]["name"];
  const animal = data["additional_info"]["animal_sign"];
  const nadi = data["additional_info"]["nadi"];

  document.getElementById("card1").src = "images/cards/card-" + nakshatra + ".png";
  document.getElementById("card1").setAttribute("class", "back front");
  document.getElementById("card2").src = "images/cards/card-" + animal + ".png";
  document.getElementById("card2").setAttribute("class", "back front");
  document.getElementById("card3").src = "images/cards/card-" + nadi + ".png";
  document.getElementById("card3").setAttribute("class", "back front");

  if (nadi === "Vata") {
    button1.href = "https://indiaveda.com/p/constitucion-vata";
    button2.href = "https://indiaveda.com/p/equilibra-vata";
  } else if (nadi === "Pitta") {
    button1.href = "https://indiaveda.com/p/constitucion-pitta";
    button2.href = "https://indiaveda.com/p/equilibra-pitta";
  } else if (nadi === "Kapha") {
    button1.href = "https://indiaveda.com/p/constitucion-kapha";
    button2.href = "https://indiaveda.com/p/equilibra-kapha";
  }

}

/* FILTER SECTION */

// Listener for filter data
const selectOption = document.getElementById("options");
if (selectOption) {
  selectOption.addEventListener("change", () => {
    const condition = document.getElementById("options").value;
    if (!filterData(zodiac, condition)) {
      document
        .getElementById("options")
        .setCustomValidity(
          "¿Quieres saber 'qué quieres saber'? 👀 \n Esa no es una opción válida"
        );
    }
  });
}


// Const of elements
const earth = ["Capricornio", "Tauro", "Virgo"];
const air = ["Libra", "Geminis", "Acuario"];
const water = ["Cancer", "Piscis", "Escorpio"];
const fire = ["Aries", "Leo", "Sagitario"];
const divRes = document.getElementById("mainResult");

// Get element of sign
function getElements(zodiac) {
  const msg = "Este signo pertenece al elemento de ";
  const msg2 = " igual que: ";

  // FIXME: Probar que funcione el msg impreso
  if (zodiac === "Capricorn" || zodiac === "Virgo" || zodiac === "Taurus") {
    divRes.innerText = msg + "tierra" + msg2 + earth.toString();
  } else if (
    zodiac === "Libra" ||
    zodiac === "Gemini" ||
    zodiac === "Aquarius"
  ) {
    divRes.innerText = msg + "aire" + msg2 + air.toString();
  } else if (
    zodiac === "Cancer" ||
    zodiac === "Pisces" ||
    zodiac === "Scorpio"
  ) {
    divRes.innerText = msg + "agua" + msg2 + water.toString();
  } else if (
    zodiac === "Aries" ||
    zodiac === "Leo" ||
    zodiac === "Sagittarius"
  ) {
    divRes.innerText = msg + "fuego" + msg2 + fire.toString();
  }
}

// Get generation
function getGeneration() {
  const msg = "De acuerdo a tu año de nacimiento perteneces a la generación: ";
  const date = document.getElementById("DateOB").value;
  const year = date.slice(0, 4);

  if (year <= "1960" && year >= "1949") {
    divRes.innerText = msg + "Baby Boomer";
  } else if (year <= "1980" && year >= "1969") {
    divRes.innerText = msg + "X";
  } else if (year <= "1993" && year >= "1981") {
    divRes.innerTex = msg + "Millennial";
  } else if (year <= "2010" && year >= "1994") {
    divRes.innerText = msg + "Z";
  } else if (year <= "2023" && year >= "2011") {
    divRes.innerText = msg + "Alfa";
  }
}

// Remove elements from DOM
function removeElements(id) {
  const parent = document.getElementById(id);
  let child = parent.firstChild;
  while (child) {
    parent.removeChild(child);
    child = parent.firstChild;
  }
}

// Get selected option from Categories
function getCategory(sign) {

  const categoriesList = celebrities["celebrities"]
    .filter(
      (celebrity) => celebrity.sign.slice(0, 5) === sign.slice(0, 5)
    )
    .map(
      (celebrity) => celebrity.category
    )

  removeElements("sortBy");

  // Filter categories repetitions
  const categoriesToPrint = [...new Set(categoriesList)]
  //spread operator 

  // Create new options in select
  const sel = document.getElementById("sortBy");
  sel.innerHTML =
    "<option selected disabled>Selecciona área de tu interés</option>";
  categoriesToPrint.forEach((element) => {
    const opt = document.createElement("option");
    opt.value = element;
    opt.text = element;
    opt.class = "form-option";
    sel.add(opt);
  });

  // Listener with change for select option
  const optionCategory = document.getElementById("sortBy");
  optionCategory.addEventListener("change", () => {
    removeElements("celebrity");
    const category = optionCategory.options[optionCategory.selectedIndex].value;
    sortData(sign, category, "ordenAlfabetico");
  });
}

// Show celebrities with the same sign
function getCelebrities(celebritiesNames) {
  // Create anchor for celebrities names
  const divCeleb = document.getElementById("celebrity");
  const rootList = document.createElement("ul");
  divCeleb.appendChild(rootList);
  for (let i = 0; i < celebritiesNames.length; i++) {
    const name = celebritiesNames[i];
    const itemList = document.createElement("li");
    const anchor = document.createElement("a");
    anchor.href = "#displayResult";
    anchor.text = name;
    anchor.id = "celebrity" + i;
    anchor.setAttribute("class", "sortBy");
    rootList.appendChild(itemList);
    itemList.appendChild(anchor);
  }

  // Enable sort by Order options
  const elements = document.querySelectorAll(".sortOrder");
  elements.forEach((element) => {
    element.classList.remove("disabled");
  });

  document.getElementById("asc").addEventListener("click", (order) => {
    removeElements("celebrity");
    sortData("sign", "category", order.target.value);
  });
  document.getElementById("desc").addEventListener("click", (order) => {
    removeElements("celebrity");
    sortData("sign", "category", order.target.value);
  });
}

// Print quotes of celebrities
function printQuotes(celebName) {
  celebrities["celebrities"].forEach((dictionary) => {
    if (celebName === dictionary["name"]) {
      divRes.innerText = dictionary["quote"];
      document.getElementById("nameCeleb").innerText = dictionary["name"];
      document.getElementById("DOB").innerHTML =
        "<i class='fas fa-birthday-cake'></i> " + dictionary["DOB"];
    }
  });
}

const celebrityOptions = document.getElementById("celebrity")
if (celebrityOptions) {
  celebrityOptions.addEventListener("click", (event) => {
    printQuotes(event.target.text);
  })
}

// Listener and print of stats
const statsOptions = document.getElementById("optionsStats");
if (statsOptions) {
  statsOptions.addEventListener("change", (event) => {
    const stats = computeStats(
      celebrities["celebrities"],
      event.target.value,
      zodiac
    );

    let msg1;
    const msg2 = [];

    if (event.target.value === "signStat") {
      msg1 = " de tu signo";
      for (const key in stats) {
        if (stats.hasOwnProperty(key)) {
          const value = stats[key];
          msg2.push(" " + key + ": " + value + "%");
        }
      }
    } else if (event.target.value === "elementStat") {
      msg1 = " del elemento al que pertenece tu signo";
      for (const key in stats) {
        if (stats.hasOwnProperty(key)) {
          const value = stats[key];
          msg2.push(" " + key + ": " + value + "%");
        }
      }
    }

    divRes.innerText =
      "De acuerdo a nuestra base de datos y lo que sabemos " +
      msg1 +
      ", estas son nuestras estadísticas: " +
      msg2.toString();
    document.getElementById("nameCeleb").innerText = "";
    document.getElementById("DOB").innerText = "";
  })
}

const goingOut = {
  getElements,
  getGeneration,
  getCategory,
  getCelebrities,
};

export default goingOut;
