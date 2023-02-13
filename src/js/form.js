let currentTab = 0;
document.addEventListener("DOMContentLoaded", function (event) {
  showTab(currentTab);
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
  } else {
    //FIXME: fuera del else
    showTab(currentTab);
  }
}

function validateForm() {
  let  i, valid = true;
  const x = document.getElementsByClassName("tab");
  const y = x[currentTab].getElementsByTagName("input");
  for (i = 0; i < y.length; i++) {
    if (y[i].value === "" ) {
      y[i].className += " invalid";
      valid = false;
    }
  }
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid;
}

// Set max date of input
//1923-01-01T00:00 https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_input_date_max
const today = new Date().toLocaleString("sv-SE").replace(" ", "T").slice(0,16);


function updateHTML(elmId, value) {
  const elem = document.getElementById(elmId);
  if (typeof elem !== "undefined" && elem !== null) {
    elem.setAttribute("max", value);
    console.log("Max Value: " + value);
  }
}
updateHTML("DateOB", today);
const dob = document.getElementById("DateOB").value;

function fixStepIndicator(n) {
  let i;
  const  x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  x[n].className += " active";
}


