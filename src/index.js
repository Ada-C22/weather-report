// To get a little more error reporting help from the browser, 
// we can request strict behavior. 


"use strict";
// Initial temperature setup
let temperature = 70;

const tempValueElement = document.getElementById("tempValue");
const landscapeElement = document.getElementById("landscape");
const cityNameInput = document.getElementById('cityNameInput');
const headerCityName = document.getElementById('headerCityName');
const cityNameReset = document.getElementById('cityNameReset');
const cityForcastButton = document.getElementById('cityForcastButton');


const updateTemperature = () => {
    tempValueElement.textContent = `${temperature}°F`;

    // Change temperature color
    if (temperature >= 80) {
        tempValueElement.className = "red";
    } else if (temperature >= 70) {
        tempValueElement.className = "orange";
    } else if (temperature >= 60) {
        tempValueElement.className = "yellow";
    } else if (temperature >= 50) {
        tempValueElement.className = "green";
    } else {
        tempValueElement.className = "teal";
    }

    // Change landscape
    if (temperature >= 80) {
        landscapeElement.textContent = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
    } else if (temperature >= 70) {
        landscapeElement.textContent = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";
    } else if (temperature >= 60) {
        landscapeElement.textContent = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
    } else {
        landscapeElement.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
    }
};

// Initial render
updateTemperature();

// Increase temperature
document.getElementById("increaseTempControl").addEventListener("click", () => {
    temperature += 1;
    updateTemperature();
});

// Decrease temperature
document.getElementById("decreaseTempControl").addEventListener("click", () => {
    temperature -= 1;
    updateTemperature();
});


cityNameInput.addEventListener('input', (e) => {
  headerCityName.textContent = e.target.value + '.';
});

cityNameReset.addEventListener('click', () => {
  headerCityName.textContent = '';
  cityNameInput.value = '';
});

const kelvinToFarenheit = (kelvin) => {
  return (kelvin - 273.15) * 9/5 + 32
}

cityForcastButton.addEventListener('click', () => {
  const search = cityNameInput.value;
  const locationIQURL = `http://127.0.0.1:5000/location`;
  axios
  .get(locationIQURL, {
    params: {
      q: search
    }
  })
  .then((response) => {
    // Code that executes with a successful response goes here
    const lat = response.data[0].lat;
    const lon = response.data[0].lon;
    const openWeartherURL = `http://127.0.0.1:5000/weather`;
    axios
    .get(openWeartherURL, {
      params: {
        lat: lat,
        lon: lon
      }
    })
    .then((response) => {
      const temperature = kelvinToFarenheit(response.data.main.temp).toFixed(2);
      tempValueElement.innerText = temperature;
    })
  }
)
  .catch((error) => {
    // Code that executes with an unsuccessful response goes here
    console.log((error));
  });
})
  

const skySelectElement = document.getElementById("skySelect");
const skyElement = document.getElementById("sky");

// Define sky options
const skyOptions = {
  sunny: "☁️ ☁️ ☁️ ☀️ ☁️ ☁️",
  cloudy: "☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️",
  rainy: "🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧",
  snowy: "🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨",
};

// Function to update the sky based on selection
const updateSky = () => {
  const selectedSky = skySelectElement.value; // Get selected value
  skyElement.textContent = skyOptions[selectedSky]; // Update the sky display
};

// Event listener for dropdown change
skySelectElement.addEventListener("change", updateSky);
