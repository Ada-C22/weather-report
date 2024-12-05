const state = {
  currentTemp: 0,
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
  tempValueElement.textContent = `${state.currentTemp}°F`;

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

// Event handler function to retrieve user input:
const retrieveInput = () => {
  const cityNameInput = document.getElementById("cityNameInput");
  return cityNameInput.value;
};

// Event handler function to UPDATE the headerCityName to user's input:
const updateCityName = () => {
  const currentCity = document.getElementById("headerCityName");
  state.cityName = retrieveInput();
  currentCity.textContent = state.cityName;
};


/************************/
/******* Wave 4 *********/
/************************/

// Cannot pass parameters into function
const updateRealtimeTempButton = () => {
  const realtimeTempValue = document.getElementById("currentTempButton");
  // state.currentTemp = 
 
};

const getRealtimeTempButton = () => {
  const realtimeTemp = document.getElementById("currentTempButton");
  realtimeTemp.addEventListener("click", updateRealtimeTempButton);
};

// ASK IN OFFICE HOURS!
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


const getLatAndLong = (location) => {
  let latitude, longitude;
  return axios
    .get("http://127.0.0.1:5000/location", {
    params: {
        "q": location
      },
    })
    .then((response) => {
      latitude = response.data[0].lat;
      longitude = response.data[0].lon;

      console.log(
        `Location: ${location}, Latitude: ${latitude}, Longitude: ${longitude}`
      );

      return {
        latitude: latitude,
        longitude: longitude,
      };
    })
    .catch((error) => {
      console.log("Error found in getLatAndLong!");
      console.log(
        `The value of status inside of error response is: 
        ${error.response.status}`
      );
  
    });
};

// API Call for weather status/temp of current city displayed
const getCurrentCityWeather = (lat, long) => {
  // Info from OpenWeather API Call documentation:
  // https://openweathermap.org/current#geo

  // Function call is returning a Promise Object - cannot call this
  // Create a 3rd separate helper function to chain together location + weather
  // by chaining the .then()

  return axios
    .get("http://127.0.0.1:5000/weather", {
      params: {
          "lat": lat,
          "lon": long,
    }})
    .then((response) => {
      return Object.keys(response.main.temp);
    })
    .catch((error) => {
      console.log("Error found in getCurrentCityWeather!");
      console.log(
        `The value of status inside of error response is: 
        ${error.response.status}`
      );
    })

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

// const resetCityName = () => {
//   const currentCity = document.getElementById("headerCityName");
//   const cityNameInput = document.getElementById("cityNameInput");

//   state.cityName = state.defaultCityName

//   currentCity.textContent = state.cityName
//   cityNameInput.value =  state.defaultCityName

// };


// Register event handlers for temperature controls
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
  getRealtimeTempButton();
};

// Initialize the application when DOM content is loaded
document.addEventListener("DOMContentLoaded", registerEventHandlers);
