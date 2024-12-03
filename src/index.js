"use strict";

const state = {
    curTemp: 60,
}

const increaseTemp = () => {
    const temp = document.getElementById("tempValue");
    state.curTemp += 1;
    temp.textContent = state.curTemp;
    changeColorAndLandscape(state.curTemp);
};

const decreaseTemp = () => {
    const temp = document.getElementById("tempValue");
    state.curTemp -= 1;
    temp.textContent = state.curTemp;
    changeColorAndLandscape(state.curTemp);
};

const changeColorAndLandscape = (temp) => {
    const tempValue = document.getElementById("tempValue");
    const landscape = document.getElementById("landscape");
    if (temp >= 80) {
        tempValue.style.color = "Red";
        landscape.textContent = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
    } else if (temp >= 70) {
        tempValue.style.color = "Orange";
        landscape.textContent = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";
    } else if (temp >= 60) {
        tempValue.style.color = "Yellow";
        landscape.textContent = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
    } else if (temp >= 50) {
        tempValue.style.color = "Green";
        landscape.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
    } else {
        tempValue.style.color = "Teal";
        landscape.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
    }
};

// const axios = require('axios');

const findLatitudeAndLongitude = () => {
    let latitude, longitude;
    const cityName = document.getElementById("cityNameInput").value;
    axios.get('http://127.0.0.1:5000/location',
        {
            params: {
                q: cityName,
            }
        })
        .then((response) => {
            latitude = response.data[0].lat;
            longitude = response.data[0].lon;
            findWeather(latitude, longitude);
        })
        .catch((error) => {
            console.log('error in findLatitudeAndLongitude!');
        });
}

const findWeather = (latitude, longitude) => {
    axios.get('http://127.0.0.1:5000/weather', {
            params: { lat: latitude, lon: longitude },
        })
        .then((response) => {
            const kelvinTemp = response.data.main.temp;
            const fahrenheitTemp = Math.round(kelvinTemp * 9 / 5 - 459.67);
            state.curTemp = fahrenheitTemp;
            const temp = document.getElementById("tempValue");
            temp.textContent = state.curTemp;
        })

        .catch((error) => {
            console.log('error in Weather!');
        });
}


const changeCityName = () => {
    const cityName = document.getElementById("cityNameInput").value;
    document.getElementById("headerCityName").textContent = cityName;
};

const registerEventHandlers = () => {
    const increaseButton = document.getElementById("increaseTempControl");
    increaseButton.addEventListener("click", increaseTemp)

    const decreaseButton = document.getElementById("decreaseTempControl");
    decreaseButton.addEventListener("click", decreaseTemp)

    const cityResetButton = document.getElementById("cityNameReset");
    cityResetButton.addEventListener("click", changeCityName)

    const updateTempButton = document.getElementById('currentTempButton')
    updateTempButton.addEventListener('click', findLatitudeAndLongitude)
};

document.addEventListener("DOMContentLoaded", registerEventHandlers);