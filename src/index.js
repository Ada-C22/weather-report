// src/index.js

// Variables
let currentTemp = 70; // Default temperature

// Elements
const tempValue = document.getElementById('tempValue');
const increaseTempControl = document.getElementById('increaseTempControl');
const decreaseTempControl = document.getElementById('decreaseTempControl');
const landscapeDiv = document.getElementById('landscape');

// Function to update temperature display and its style
const updateTemperatureDisplay = () => {
    tempValue.textContent = `${currentTemp}°F`;
    let color = '';
    let landscape = '';

    // Determine color and landscape based on temperature
    if (currentTemp >= 80) {
        color = 'red';
        landscape = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
    } else if (currentTemp >= 70) {
        color = 'orange';
        landscape = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";
    } else if (currentTemp >= 60) {
        color = 'yellow';
        landscape = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
    } else if (currentTemp >= 50) {
        color = 'green';
        landscape = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
    } else {
        color = 'teal';
        landscape = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
    }

    // Apply styles
    tempValue.style.color = color;
    landscapeDiv.textContent = landscape;
};

// Event Listeners for temperature controls
increaseTempControl.addEventListener('click', () => {
    currentTemp += 1;
    updateTemperatureDisplay();
});

decreaseTempControl.addEventListener('click', () => {
    currentTemp -= 1;
    updateTemperatureDisplay();
});

// Initialize display
updateTemperatureDisplay();


/////////////////


