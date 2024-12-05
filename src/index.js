const state = {
  currentTemp: 39,
  cityName: "Miami",
  // defaultCityName = "Seattle",
};

/************************/
/******* Wave 2 *********/
/************************/

// Function to update the temperature display and apply color changes
const updateTemperatureDisplay = () => {
  const tempValueElement = document.getElementById("tempValue");
  const landscapeElement = document.getElementById("landscape");
  tempValueElement.textContent = `${state.currentTemp} °F`;

  if (state.currentTemp >= 80) {
    tempValueElement.style.color = "red";
    landscapeElement.textContent = "🌵  🐍 🦂 🌵🌵  🐍 🏜 🦂";
  } else if (state.currentTemp >= 70) {
    tempValueElement.style.color = "orange";
    landscapeElement.textContent = "🌸🌿🌼  🌷🌻🌿 ☘️🌱 🌻🌷";
  } else if (state.currentTemp >= 60) {
    tempValueElement.style.color = "salmon";
    landscapeElement.textContent = "🌾🌾 🍃 🪨  🛤 🌾🌾🌾 🍃";
  } else if (state.currentTemp >= 50) {
    tempValueElement.style.color = "green";
    landscapeElement.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
  } else if (state.currentTemp <= 49) {
    tempValueElement.style.color = "blue";
    landscapeElement.textContent = "⛄️ ⛄️ ⛄️";
  }
};

// Event handler to increase temperature
const increaseTemp = () => {
  state.currentTemp += 1;
  updateTemperatureDisplay();
};

// Event handler to decrease temperature
const decreaseTemp = () => {
  state.currentTemp -= 1;
  updateTemperatureDisplay();
};

/************************/
/******* Wave 3 *********/
/************************/

const retrieveInput = () => {
  const cityNameInput = document.getElementById("cityNameInput");
  return cityNameInput.value;
};

const updateCityName = () => {
  const currentCity = document.getElementById("headerCityName");
  state.cityName = retrieveInput();
  currentCity.textContent = state.cityName;
};

// // Register event handlers for temperature controls
const registerEventHandlers = () => {
  /** Wave 2 events **/
  const warmUpButton = document.getElementById("increaseTempControl");
  const coolDownButton = document.getElementById("decreaseTempControl");

  warmUpButton.addEventListener("click", increaseTemp);
  coolDownButton.addEventListener("click", decreaseTemp);

  /** Wave 3 events **/
  const cityNameInput = document.getElementById("cityNameInput");
  const resetButton = document.getElementById("cityNameReset");

  cityNameInput.addEventListener("input", retrieveInput);
  resetButton.addEventListener("click", updateCityName);

  // Initialize the temperature display
  updateTemperatureDisplay();
  updateSky();
  TempButton();
};

// Initialize the application when DOM content is loaded
document.addEventListener("DOMContentLoaded", registerEventHandlers);

/************************/
/******* Wave 4 *********/
/************************/

// const trueCityTemp = () => {

// }:

// const TempButton = () => {
//   const cityNameInput = document.getElementById("currentTempButton");
//   cityNameInput.addEventListener("click", trueCityTemp);
// };

// const axios = require("axios");
// const LOCATIONIQ_KEY = ;

// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// const results = {};

// const findLatitudeAndLongitude = (location) => {
//   let latitude, longitude;
//   axios
//     .get("https://us1.locationiq.com/v1/search.php", {
//       params: {
//         key: LOCATIONIQ_KEY,
//         q: location,
//         format: "json",
//       },
//     })
//     .then((response) => {
//       latitude = response.data[0].lat;
//       longitude = response.data[0].lon;
//       //console.log(location, ":", latitude, longitude);
//       results[location] = {
//         latitude: latitude,
//         longitude: longitude,
//       };
//     })
//     .catch((error) => {
//       console.log("error in findLatitudeAndLongitude!");
//     });
// };

/************************/
/******* Wave 5 *********/
/************************/

const skyOptions = {
  sunny: "☁️ ☁️ ☁️ ☀️ ☁️ ☁️",
  cloudy: "☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️",
  rainy: "🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧",
  snowy: "🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨",
};

// Function to update the sky display
const updateSky = () => {
  const skySelect = document.getElementById("skySelect");
  const skyDisplay = document.getElementById("sky");

  // Get the selected option value
  const selectedSky = skySelect.value;

  // Update the sky display
  skyDisplay.textContent = skyOptions[selectedSky];
  skySelect.addEventListener("change", updateSky);
};

/************************/
/******* Wave 6 *********/
/************************/

// reset city name to default

// const resetCityName = () => {
//   const currentCity = document.getElementById("headerCityName");
//   const cityNameInput = document.getElementById("cityNameInput");

//   state.cityName = state.defaultCityName

//   currentCity.textContent = state.cityName
//   cityNameInput.value =  state.defaultCityName

// };
