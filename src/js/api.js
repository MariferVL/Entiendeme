// // FIXME: Parar llamado a la API
// /* const url = "https://api.prokerala.com/v2/astrology/birth-details";
// const data = {
//   ayanamsa: "1",
//   coordinates: latLong,
//   datetime: dateTime + ":00" + timeZone(),
//   la: "en",
// };

// const myHeaders = new Headers();
// myHeaders.append(
//   "Authorization",
//   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI2MzljZWQ5OC1mYWNhLTQ3YTItOTk1ZC1jMGQwMzRmMjgyYTEiLCJqdGkiOiJjOWY1NzAxNmU5MTk4NWRjY2VhNzNhMzZiMWIyMjM1Zjc3ZjQ1YzYwYmZhZWJiMjgxN2Y1NTQyMTA2Yzk0M2ZjODY4ODVkNjRiMWUyMDQ3NSIsImlhdCI6MTY3NzAwMTYzNi43OTg1OSwibmJmIjoxNjc3MDAxNjM2Ljc5ODU5MywiZXhwIjoxNjc3MDA1MjM2Ljc5ODM3Niwic3ViIjoiMmQ3MDRmMDYtNjlhMC00OTdkLWI0YTQtOTE2OWZkZTk1YThlIiwic2NvcGVzIjpbXSwiY3JlZGl0c19yZW1haW5pbmciOjQ3MDAsInJhdGVfbGltaXRzIjpbeyJyYXRlIjo1LCJpbnRlcnZhbCI6NjB9XX0.HOmB6NTg6GaPYZXBgu-yej_FqF52KRvxgzSB0KcotnK4LaCOs-Rte4MHLjygwQNL6CUwCTDWQO6mJdg_cajNj9QGUPbvKb8jZAvSdIwpc_c-45r2q0J4BubLJWLl3KcDvE7sr_7JuKvZP7PhrPDv3j_PjEGjo0oc9fZqivJpXqtTXUI8gAnV5D7oAWN6FyJkQmVfgZ3WcF25RfJn2fSkM1zZQpuQ-Ej99_9_pcazaB6X-G-fLYhbm32k3jTtQx7hF0qvge5tsVtBSKT66izhcRqi_GbwLxh2SRYnn6KzCQJRxfVv4Oz-6OYokovkVztnHOpM1fh3nMczMPWzQ0a-bw"
// );

// const requestOptions = {
//   method: "GET",
//   headers: myHeaders,
//   redirect: "follow",
// };

// const astroData = fetch(url + new URLSearchParams(data), requestOptions)
//   .then((res) => res.text()) // res.json()
//   .catch((error) => console.error("Error:", error))
//   .then((response) => console.log("Success:", response.json())); */



/* Llamada al JSON */

/* const astroData = fetch("/data/astrology.json")
  .then((response) => response.json())
  .then((info) => {
    return info.data;
  })
  .catch((error) => error);

/* let zodiac;
const printData = async () => {
  const a = await astroData;
  console.log("AstroData: " + astroData);
  zodiac = a["zodiac"]["name"];
  console.log("Zodiac dentro de astro " + zodiac);
}; */


// NUEVA VERSION API 

/* // const url = "https://api.prokerala.com/v2/astrology/birth-details";
// const data = {
//   ayanamsa: "1",
//   coordinates: latLong,
//   datetime: dateTime + ":00" + getTimeZone(),
//   la: "en",
// };

var myHeaders = new Headers();
myHeaders.append("Accept", "application/json");
myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJmZDg0MTM3MS05MTQzLTQ3ZjYtYTMzMS1hNGY4YmE3YTVkZGYiLCJqdGkiOiI0YWE4MTkzMjVmMTg3MDcwMDFjN2I1YTY3MGYwM2FjOTM0NjgxYjk2MmM5NWVhM2E2YmJmYTFkMWFlYzIzNzdmOGZiNGViNDlmMmViZmEwZiIsImlhdCI6MTY3ODE1NDgyNS44OTI3NDIsIm5iZiI6MTY3ODE1NDgyNS44OTI3NDUsImV4cCI6MTY3ODE1ODQyNS44OTI1MzEsInN1YiI6Ijk3ZTJiOTdmLTQyYjAtNGJmZi04ODE4LWQ2YWIzY2MyMmJkMCIsInNjb3BlcyI6W10sImNyZWRpdHNfcmVtYWluaW5nIjo0OTAwLCJyYXRlX2xpbWl0cyI6W3sicmF0ZSI6NSwiaW50ZXJ2YWwiOjYwfV19.STZa7GnjF7z71uM4D1kt7Elj8qw98WmrBeFqgFYoVO1tb_lUvBslrPBhmOgdWqwv4WOBTEg2eJWqRViQw3Y2zFEQMlHuqfFM5i9sPqiScHNDPQ88TdPU-M6xsNTlF3IpAB_JqR_zPG5UmzJyOx1ltWhtfnG12ftx3pmpL0MGBqDjpvzk8gGtJWAA2aYYKMe3GeCDv9sSKIZiujLoMw7gRhy06O2dGy4JNSwzgjn9Ra_xvj6CDaE_g9R8zRIE0JuJBS_F9gbmcuBvG8JpdKa63v_YwCRC915Z7Nh1AFgf1GEOOAH1vjBi2E4qpzviJQOgQGeWD7_HJZ2ArRuBcGHGWg");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

const astroData = fetch("https://api.prokerala.com/v2/astrology/birth-details?ayanamsa=1&coordinates=-33.0055289,-71.5302556&datetime=1986-11-11T12:30:00-03:00&la=en", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));



// const astroData = fetch(url + new URLSearchParams(data), requestOptions)
//   .then((res) => res.text()) // res.json()
//   .catch((error) => console.error("Error:", error))
//   .then((response) => console.log("Success:", response.json()));

const dataAPI = async () => {
  const wait = await astroData;
  createCards(wait);
}; */


// COLATERALES API 

/* let dateTime;

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
} */

/* const today = new Date().toLocaleString("sv-SE").replace(" ", "T").slice(0, 16);
const dob = document.getElementById("DateOB").value; */