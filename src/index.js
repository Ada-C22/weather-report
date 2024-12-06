"use strict";

let currentTempValue = 32;

const state = {
  increaseTempControl: null,
  decreaseTempControl: null,
  tempElement: null,
  gardenLandscape: null,
  cityName: null,
  cityInput: null,
  currentTempButton: null,
  skySelect: null,
  sky: null,
  resetButton: null
};

const loadControls = () => {
  state.tempElement = document.getElementById('tempValue');
  state.decreaseTempControl = document.getElementById('decreaseTempControl');
  state.increaseTempControl = document.getElementById('increaseTempControl');
  state.gardenLandscape = document.getElementById('landscape');
  state.cityInput = document.getElementById('cityNameInput');
  state.cityName = document.getElementById('headerCityName');
  state.currentTempButton = document.getElementById('currentTempButton');
  state.skySelect = document.getElementById('skySelect');
  state.sky = document.getElementById('sky');
  state.resetButton = document.getElementById('cityNameReset');
};

const kelvinToFahrenheit = (kelvin) => Math.round((kelvin - 273.15) * (9 / 5) + 32);

const getLandscape = (temp) => {
  if (temp <= 49) return { color: 'blue', text: "A cold, snowy winter day..." };
  if (temp <= 59) return { color: 'green', text: "A mild spring day..." };
  if (temp <= 69) return { color: 'yellow', text: "A warm summer afternoon..." };
  if (temp <= 79) return { color: 'orange', text: "An autumn landscape..." };
  return { color: 'red', text: "A scorching hot desert scene..." };
};

const updateTemperatureDisplay = () => {
  state.tempElement.textContent = `${currentTempValue}°F`;
  const { color, text } = getLandscape(currentTempValue);
  state.tempElement.style.color = color;
  state.gardenLandscape.textContent = text;
};

const increaseTemp = () => {
  currentTempValue += 1;
  updateTemperatureDisplay();
};

const decreaseTemp = () => {
  currentTempValue -= 1;
  updateTemperatureDisplay();
};

const updateCityName = () => {
  state.cityName.textContent = state.cityInput.value || null;
};

const resetCityNameAndText = () => {
  state.cityInput.value = null;
  state.cityName.textContent = null;
  currentTempValue = 32;
  updateTemperatureDisplay();
};

const skySelector = () => {
  const skyOptions = {
    sunny: "☁️ ☁️ ☁️ ☀️ ☁️ ☁️",
    cloudy: "☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️",
    rainy: "🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧",
    default: "🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨"
  };

  state.sky.textContent = skyOptions[state.skySelect.value.toLowerCase()] || skyOptions.default;
};

const getCityLocationAndTemp = () => {
  const location = state.cityInput.value;
  axios
    .get('http://127.0.0.1:5000/location', { params: { q: location } })
    .then((response) => {
      const { lat, lon } = response.data[0];
      getCityWeather(lat, lon);
    })
    .catch((error) => console.error('Error fetching location:', error.response.data));
};

const getCityWeather = (lat, lon) => {
  axios
    .get('http://127.0.0.1:5000/weather', { params: { lat, lon } })
    .then((response) => {
      currentTempValue = kelvinToFahrenheit(response.data.main.temp);
      updateTemperatureDisplay();
    })
    .catch((error) => console.error('Error fetching weather:', error.response.data));
};

const registerEventHandlers = () => {
  loadControls();
  updateTemperatureDisplay();

  state.increaseTempControl.addEventListener('click', increaseTemp);
  state.decreaseTempControl.addEventListener('click', decreaseTemp);
  state.cityInput.addEventListener('input', updateCityName);
  state.currentTempButton.addEventListener('click', getCityLocationAndTemp);
  state.skySelect.addEventListener('change', skySelector);
  state.resetButton.addEventListener('click', resetCityNameAndText);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
