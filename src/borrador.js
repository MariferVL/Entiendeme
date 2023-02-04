// const url = "https://api.prokerala.com/v2/astrology/birth-details";
//const data = {
//  "ayanamsa": "1",
  //"coordinates": "19.800904,-99.0627642",
  //"datetime": "1996-01-05T01:11:00-06:00",
  //"la": "en",
//};

//const tokens = {
  //"Client ID": "aqui va el token",
  //"Client Secret": "aqui va el token",
//}


fetch(url + new URLSearchParams(data),)
  .then((res) => res.json())
  .catch((error) => console.error("Error:", error))
  .then((response) => console.log("Success:", response.json()));

  // Notas
// https://github.com/zalando-stups/oauth2-client-js ¿?
//https://www.webtips.dev/solutions/send-query-params-in-get-and-post-in-javascript
// https://es.stackoverflow.com/questions/381268/fetch-api-con-javascript-token

/*

fetch(url + new URLSearchParams(data), {
  method: "GET", // or 'PUT'
  body: JSON.stringify(tokens), // data can be `string` or {object}!
  headers: {
    "Content-Type": "application/json",
    // "Grant Type": "Client Credentials",
    "Access Token URL": "https://api.prokerala.com/token",
    "Client Authentication": "Send client credentials in body",
  },
})
  .then((res) => res.json())
  .catch((error) => console.error("Error:", error))
  .then((response) => console.log("Success:", response.json())); */


// (async () => {
//   const response = await fetch(url + new URLSearchParams(data))

//   const data = await response.json()

//   console.log(data)
// })()

