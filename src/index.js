const state = {
  temperature: 69,
  cityName: "",
  upButton: null,
  downButton: null,
  searchBar: null,
  currentTempButton: null,
  skySelectDD: null,
};

// Function when clicking on up button
const increaseTemp = () => {
  state.temperature += 1;
  changeTemp();
};

// Function when clicking on down button
const decreaseTemp = () => {
  state.temperature -= 1;
  changeTemp();
};

const changeTemp = () => {
  const currentTemp = document.getElementById("tempValue");
  currentTemp.textContent = state.temperature;
  changeStyleToTemp(currentTemp);
};

// helper function to change text color and landscape
const changeStyleToTemp = (currentTemp) => {
  const currentLandscape = document.getElementById("landscape");
  if (state.temperature >= 80) {
    currentTemp.style.color = "red";
    currentLandscape.textContent = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
  } else if (state.temperature >= 70) {
    currentTemp.style.color = "orange";
    currentLandscape.textContent = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";
  } else if (state.temperature >= 60) {
    currentTemp.style.color = "yellow";
    currentLandscape.textContent = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
  } else if (state.temperature >= 50) {
    currentTemp.style.color = "green";
    currentLandscape.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
  } else if (state.temperature <= 49) {
    currentTemp.style.color = "teal";
    currentLandscape.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
  }
};

// function that runs when user inputs in search bar
const updateCityName = () => {
  const searchBar = document.getElementById("cityNameInput");
  const cityNameDisplay = document.getElementById("headerCityName");
  state.cityName = searchBar.value;
  cityNameDisplay.textContent = state.cityName;
};

const getCoords = () => {
  return axios
    .get("http://127.0.0.1:5000/location", {
      params: {
        q: state.cityName,
      },
    })
    .then((response) => {
      results = {
        lat: response.data[0].lat,
        lon: response.data[0].lon,
      };
      console.log("success getCoords", results);
      return results;
    })
    .catch((error) => {
      console.log("failed getting lat and lon!", error.response.data);
    });
};

const getCityTemp = (coords) => {
  return axios
    .get("http://127.0.0.1:5000/weather", {
      params: {
        lat: coords.lat,
        lon: coords.lon,
      },
    })
    .then((response) => {
      const tempK = response.data.main.temp;
      const tempF = Math.round((tempK - 273.15) * 1.8 + 32);
      console.log("success getCityTemp", tempF);
      return tempF;
    })
    .catch((error) => {
      console.log("failed getting temp!", error.response.data);
    });
};

const updateToCityTemp = () => {
  getCoords()
    .then((coords) => {
      return getCityTemp(coords);
    })
    .then((tempF) => {
      state.temperature = tempF;
      changeTemp();
    });
};

const showSky = () => {
  let selection = state.skySelectDD.value;
  const sky = document.getElementById("sky");
  if (!selection) {
    sky.textContent = ""
  } else if (selection=="sunny") {
    sky.textContent = "☁️ ☁️ ☁️ ☀️ ☁️ ☁️"
  } else if (selection == "cloudy") {
    sky.textContent = "☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️"
  } else if (selection == "rainy") {
    sky.textContent = "🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧"
  } else if (selection == "snowy") {
    sky.textContent = "🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨"
  }
;
};

// load the elements into the states
const loadControls = () => {
  state.upButton = document.querySelector("#increaseTempControl");
  state.downButton = document.querySelector("#decreaseTempControl");
  state.searchBar = document.getElementById("cityNameInput");
  state.currentTempButton = document.querySelector("#currentTempButton");
  state.skySelectDD = document.getElementById("skySelect")
};

// register the buttons and their respective listener + function
const registerEventHandlers = () => {
  loadControls()
  changeTemp(); // when DOM loads, the default temp text should also change colors
  
  state.upButton.addEventListener("click", increaseTemp);
  state.downButton.addEventListener("click", decreaseTemp);
  state.searchBar.addEventListener("input", updateCityName);
  state.currentTempButton.addEventListener("click", updateToCityTemp);
  state.skySelectDD.addEventListener("change", showSky)
};

document.addEventListener("DOMContentLoaded", registerEventHandlers);
