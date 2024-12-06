const state = {
  currentTemp: 0,
  cityName: "Miami",
  defaultCityName: "Seattle",
};

/************************/
/******* Wave 2 *********/
/************************/

// Function to update the temperature display and apply color changes
const updateTemperatureDisplay = () => {
  const tempValueElement = document.getElementById("tempValue");
  const landscapeElement = document.getElementById("landscape");
  tempValueElement.textContent = `${state.currentTemp}°`;

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

// Function to increase temperature
const increaseTemp = () => {
  state.currentTemp += 1;
  updateTemperatureDisplay();
};

// Function to decrease temperature
const decreaseTemp = () => {
  state.currentTemp -= 1;
  updateTemperatureDisplay();
};

/** Wave 2 events **/
const temperatureControls = () => {
  const warmUpButton = document.getElementById("increaseTempControl");
  const coolDownButton = document.getElementById("decreaseTempControl");

  warmUpButton.addEventListener("click", increaseTemp);
  coolDownButton.addEventListener("click", decreaseTemp);
};


/************************/
/******* Wave 3 *********/
/************************/

const updateCity = () => {
  const cityNameInput = document.getElementById("cityNameInput");
  const currentCityHeader = document.getElementById("headerCityName");
  currentCityHeader.textContent = cityNameInput.value;
};

const handleUpdateCityEvent = () => {
  const cityNameInput = document.getElementById("cityNameInput");
  const resetButton = document.getElementById("cityNameReset");
  cityNameInput.addEventListener("input", updateCity);
  resetButton.addEventListener("click", ResetCity);
};
  
/************************/
/******* Wave 4 *********/
/************************/

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Event handler function to retrieve user input:
const retrieveCityInput = () => {
  const cityNameInput = document.getElementById("cityNameInput");
  return cityNameInput.value;
};

// API Call to LocationIQ for location coordinates
const getCoordinates = () => {
  let location = retrieveCityInput();

  return axios
    .get("http://127.0.0.1:5000/location", {
      params: {
        q: location,
      },
    })
    .then((response) => {
      let latitude = response.data[0].lat;
      let longitude = response.data[0].lon;

      console.log(
        `Location: ${location}, Latitude: ${latitude}, Longitude: ${longitude}`
      );
      return {
        latitude: latitude,
        longitude: longitude,
      };
    })
    .catch((error) => {
      console.log("Error found inside getCoordinates function!");
      console.log(
        `The value of status inside of error response is: 
        ${error.response.status}`
      );
    });
};

// API Call for weather status/temp of current city displayed
const getCurrentCityWeather = () => {
  // Info from OpenWeather API Call documentation:
  // https://openweathermap.org/current#geo
  return getCoordinates()
    .then((coordinatesResponse) => {
      if (!coordinatesResponse) {
        throw new Error("Coordinates could not be retrieved.");
      } else {
        return axios.get("http://127.0.0.1:5000/weather", {
          params: {
            lat: coordinatesResponse.latitude,
            lon: coordinatesResponse.longitude,
          },
        });
      }
    })
    .then((locationTempResponse) => {
      let temp = locationTempResponse.data.main.temp; // in KELVIN
      console.log(`Current Location temperature is: ${temp}`);
      return temp;
    })
    .catch((error) => {
      console.log("Error found inside getCurrentCityWeather!");
      console.log(
        `The value of status inside of error response is: 
        ${error}`
      );
    });
};

const updateRealtimeTempBtn = () => {
  // Chaining the axios Promise API call/response from above
  getCurrentCityWeather().then((tempKelvin) => {
    if (tempKelvin) {
      const conversion = (tempKelvin - 273) * (9 / 5) + 32;
      state.currentTemp = Math.round(conversion);
      updateTemperatureDisplay();
    }
  });
};

const getRealtimeTempButton = () => {
  const realtimeTemp = document.getElementById("currentTempButton");
  realtimeTemp.addEventListener("click", updateRealtimeTempBtn);
};

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
// Event handler function to UPDATE the headerCityName to user's input:
const ResetCity = () => {
  const currentCityHeader = document.getElementById("headerCityName");
  currentCityHeader.textContent = state.defaultCityName;

  const cityNameInput = document.getElementById("cityNameInput");
  cityNameInput.value = state.defaultCityName;
};


/************************/
/**** Event Handling ****/
/************************/

const registerEventHandlers = () => {
  /** Wave 2 events **/
  temperatureControls();

  /** Wave 3 events **/
  handleUpdateCityEvent();
  
  /**** Wave 5 events ****/
  updateSky();


  getRealtimeTempButton();
  updateTemperatureDisplay();
};

// Initialize the application when DOM content is loaded
document.addEventListener("DOMContentLoaded", registerEventHandlers);
