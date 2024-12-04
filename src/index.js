// Q: I had added the const (doc elements) in their respective functions, should i have added it to load controls
const state = {
  temperature: 69,
  cityName: "",
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
      let tempK = response.data.main.temp;
      let tempF = Math.round((tempK - 273.15) * 1.8 + 32);
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

// register the buttons and their respective listener + function
const registerEventHandlers = () => {
  // when DOM loads, the default temp text should also change colors
  changeTemp();

  const upButton = document.querySelector("#increaseTempControl");
  upButton.addEventListener("click", increaseTemp);

  const downButton = document.querySelector("#decreaseTempControl");
  downButton.addEventListener("click", decreaseTemp);

  const searchBar = document.getElementById("cityNameInput");
  searchBar.addEventListener("input", updateCityName);

  const currentTempButton = document.querySelector("#currentTempButton");
  currentTempButton.addEventListener("click", updateToCityTemp);
};

document.addEventListener("DOMContentLoaded", registerEventHandlers);
