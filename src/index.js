'use strict';
// C = K - 273.15

const state = {
  tempCount: 70,
  cityName: "Seattle",
  tempValue: null,
};

//wave 2
const updateDecreaseTempCount = () => {
  --state.tempCount;
  refreshUI()
  updateTempColorAndLandscape();
};

const updateIncreaseTempCount = () => {
  ++state.tempCount;
  refreshUI();
  updateTempColorAndLandscape();
};

const refreshUI = () => {
  state.tempValue.textContent = `${state.tempCount}°F`;
};

const updateTempColorAndLandscape = () => {
  const newLandscape = document.createElement("div");
  const landscapeContainer = document.getElementById("landscape");
  landscapeContainer.textContent = "";

  switch (true) {
    case state.tempCount >= 80:
      tempValue.style.color = "red";
      newLandscape.textContent = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
      break;
    case state.tempCount >= 70:
      tempValue.style.color = "orange";
      newLandscape.textContent = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";
      break;
    case state.tempCount >= 60:
      tempValue.style.color = "yellow";
      newLandscape.textContent = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
      break;
    case state.tempCount >= 50:
      tempValue.style.color = "green";
      newLandscape.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
      break;
    case state.tempCount < 50:
      tempValue.style.color = "teal";
      newLandscape.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
      break;
  }
  landscapeContainer.appendChild(newLandscape);
};

//Wave 3
const updateCityNameInput = () => {
  const cityNameInput = document.getElementById("cityNameInput");
  const headerCityName = document.getElementById("headerCityName");
  headerCityName.textContent = cityNameInput.value;
  state.cityName = cityNameInput.value;
};

//wave 6
const resetCityNameInput = () => {
  cityNameInput.value = "";
  headerCityName.textContent = "Seattle";
};

//wave 4
const findTemperature = (coordinates) => {
  console.log(coordinates)
  return axios
    .get("http://127.0.0.1:5000/weather", {
      params: {
        lat: coordinates.lat,
        lon: coordinates.lon,
      },
    })
    .then((response) => {
      console.log("success in findTemperature!", response.data.main.temp);
      return response.data.main.temp;
    })
    .catch((error) => {
      console.log("error in findTemperature!", error);
    });
};


const findLatitudeAndLongitude = () => {
  let latitude, longitude;
  return axios
    .get("http://127.0.0.1:5000/location", {
      params: {
        q: state.cityName,
        format: "json",
      },
    })
    .then((response) => {
      latitude = response.data[0].lat;
      longitude = response.data[0].lon;
      console.log("success in findLatitudeAndLongitude!", latitude, longitude);
      return {
        lat: latitude, 
        lon: longitude, 
      };
    })
    .catch((error) => {
      console.log("error in findLatitudeAndLongitude!");
      throw error;
    });
};

const getTemperature = () => {

  return findLatitudeAndLongitude()
    .then((coordinates) => {
      return findTemperature(coordinates);
    })
    .then((temp) => {
      const fahrenheit = 1.8 * (temp - 273) + 32;
      state.tempCount = Math.round(fahrenheit);
      refreshUI();
      updateTempColorAndLandscape();
    })
    .catch((error) => {
      console.error("Error in getTemperature!");
      tempValue.textContent = "City does not exist";
    });
};

const loadControls = () => {
  state.tempValue = document.getElementById("tempValue");

}

const registerEventHandlers = () => {
  loadControls();

  const decreaseTemp = document.getElementById("decreaseTempControl");
  decreaseTemp.addEventListener("click", updateDecreaseTempCount);

  const increaseTemp = document.getElementById("increaseTempControl");
  increaseTemp.addEventListener("click", updateIncreaseTempCount);

  const headerCityName = document.getElementById("headerCityName");
  headerCityName.textContent = "Seattle";

  const cityNameReset = document.getElementById("cityNameReset");
  cityNameReset.addEventListener("click", resetCityNameInput);
  cityNameInput.addEventListener("input", updateCityNameInput);

  const currentTempButton = document.getElementById("currentTempButton");
  currentTempButton.addEventListener("click", getTemperature);

  updateTempColorAndLandscape();
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
