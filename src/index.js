// const axios = require('axios');
const state = {
    city: 'Seattle',  
    temperature: 0     
};

const getCurrentTemperature = () => {
    const cityName = cityNameInput.value || 'Seattle';  

    // Fetch latitude and longitude for the city
    axios
        .get('http://localhost:5000/location', {
            params: { q: cityName }
        })
        .then(response => {
            const { lat, lon } = response.data[0];  
            console.log('Latitude:', lat);
            console.log('Longitude:', lon);

            return axios.get('http://localhost:5000/weather', {
                params: { lat: lat, lon: lon }
            });
        })
        .then(weatherResponse => {
            const temperatureInKelvin = weatherResponse.data.main.temp;
            const temperatureInFahrenheit = parseInt((temperatureInKelvin - 273.15) * 9 / 5 + 32);
            console.log(`Temperature in Fahrenheit: ${temperatureInFahrenheit}°F`);

            state.temperature = parseFloat(temperatureInFahrenheit, 10);  

            tempValue.textContent = `${state.temperature}°F`;

            headerCityName.textContent = cityName;

            temperatureColor();
            weatherGardenDisplay();
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
};

const tempValue = document.getElementById('tempValue')
const gardenSection = document.querySelector('.garden__section ');
const landscape = document.getElementById('landscape')
const cityNameInput = document.getElementById('cityNameInput');
const headerCityName = document.getElementById('headerCityName');
const currentTemperature = document.getElementById('currentTempButton')

const temperatureIncrease = () => {
    state.temperature += 1;  
    tempValue.textContent = `${state.temperature}°F`;  
    temperatureColor();  
    weatherGardenDisplay();  
};

// Function to decrease the temperature
const temperatureDecrease = () => {
    state.temperature -= 1; 
    tempValue.textContent = `${state.temperature}°F`;  
    temperatureColor();  
    weatherGardenDisplay();  
};

const temperatureColor = () => {
    tempValue.classList.remove("red", "orange", "yellow", "green", "teal");

    if (state.temperature >= 80) {
        tempValue.classList.add("red");
    } else if (state.temperature >= 70) {
        tempValue.classList.add("orange");
    } else if (state.temperature >= 60) {
        tempValue.classList.add("yellow");
    } else if (state.temperature >= 50) {
        tempValue.classList.add("green");
    } else {
        tempValue.classList.add("teal");
    }
}

const weatherGardenDisplay = () => {
    gardenSection.classList.remove("sunny", "cloudy", "rainy", "snowy");
    if (state.temperature >= 80) {
        gardenSection.classList.add("sunny")
        landscape.innerHTML = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂"
    } else if (state.temperature >= 70) {
        gardenSection.classList.add("cloudy")
        landscape.innerHTML = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷"
    } else if (state.temperature >= 60) {
        gardenSection.classList.add("rainy")
        landscape.innerHTML = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃"
    } else {
        gardenSection.classList.add("snowy")
        landscape.innerHTML = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲"
    }
}

const updateCityName = () => {
    const cityInputValue = cityNameInput.value 
    headerCityName.textContent = cityInputValue
}

const registerEventHandlers = () => {
    //whatever function is updating UI
    const increaseButton = document.getElementById('increaseButton');
    increaseButton.addEventListener("click",temperatureIncrease);

    const decreaseButton = document.getElementById('decreaseButton');
    decreaseButton.addEventListener("click",temperatureDecrease);

    cityNameInput.addEventListener('input', updateCityName);

    const currentTemperatureButton =  document.getElementById('currentTempButton');
    currentTemperatureButton.addEventListener("click", getCurrentTemperature)
};

document.addEventListener("DOMContentLoaded", registerEventHandlers);


