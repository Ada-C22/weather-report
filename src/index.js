// To get a little more error reporting help from the browser, 
// we can request strict behavior. 


"use strict";
// Initial temperature setup
let temperature = 70;

const tempValueElement = document.getElementById("tempValue");
const landscapeElement = document.getElementById("landscape");
const cityNameInput = document.getElementById("cityNameInput");
const headerCityName = document.getElementById("headerCityName");
const cityNameReset = document.getElementById("cityNameReset");


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