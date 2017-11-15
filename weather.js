const http = require("http");
const secret = require("./secret.js");

const printWeather = (data) => {
  console.log(
    "Weather for ",
    data.name,
    "today:",
    "\n",
    "Temperature:",
    data.main.temp,
    "C",
    "\n",
    "Humidity:",
    data.main.humidity,
    "%",
    "\n",
    "Forecast: ",
    data.weather[0].main,
    "\n",
    "Description: ",
    data.weather[0].description
  );
}

const printError = (error) => {
  console.error(error.message)
}

const get = (query) => {
  try{
    const request = http.get(
      `http://api.openweathermap.org/data/2.5/weather?appid=${secret.apiKey}&q=${query}`,
      response => {
        if (response.statusCode === 200){
          let body = "";
          response.on(
            'data',
            chunk => {
              body += chunk;
            }
          );
          response.on(
            'end',
            () => {
              parsedBody = JSON.parse(body);
              printWeather(parsedBody);

            }
          );
        }else{
          console.error("There was a problem: ", response.statusCode)
        }
      }
    );
  }
  catch(error){
    printError(error);
  }
}

module.exports.get = get;
