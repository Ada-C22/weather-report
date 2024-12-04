let currentTemperature = 70;

const tempValue = document.getElementById('tempValue');
const increaseTempControl = document.getElementById('increaseTempControl');
const decreaseTempControl = document.getElementById('decreaseTempControl');
const landScrape = document.getElementById('landscape');

const updateTemperature = () => {
    tempValue.textContent = `${currentTemperature}°F`;

    if (currentTemperature >= 80) {
        tempValue.style.color = 'red';
        tempValue.style.backgroundColor = '#FFCCCC';
        landScrape.textContent = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
    } else if (currentTemperature >= 70) {
        tempValue.style.color = 'orange';
        tempValue.style.backgroundColor = '#FFE4B5';
        landScrape.textContent = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";
    } else if (currentTemperature >= 60) {
        tempValue.style.color = 'yellow';
        tempValue.style.backgroundColor = '#FFE4B5';
        landScrape.textContent = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
    } else if (currentTemperature >= 50) {
        tempValue.style.color = 'green';
        tempValue.style.backgroundColor = '#CCFFCC';
        landScrape.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
    } else if (currentTemperature >= 40) {
        tempValue.style.color = 'teal';
        tempValue.style.backgroundColor = '#CCFFFF';
        landScrape.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
    }
}

increaseTempControl.addEventListener('click', () => {
    currentTemperature += 1;
    updateTemperature();
});

decreaseTempControl.addEventListener('click', () => {
    currentTemperature -= 1;
    updateTemperature();
});

updateTemperature();

// let currentCity = cityNameInput.value;

// Wave 3 
document.addEventListener("DOMContentLoaded", () => {
    const cityNameInput = document.getElementById('cityNameInput');
    const headerCityName = document.getElementById('headerCityName');
    const tempValue = document.getElementById("tempValue");
    const currentTempButton = document.getElementById("currentTempButton");

    cityNameInput.addEventListener("input", (event) => {
        const newCityName = event.target.value;
        headerCityName.textContent = newCityName;
    });

// Wave 4


// Wave 6
    const resetButton = document.getElementById('cityNameReset');
    resetButton.addEventListener("click", () => {
        cityNameInput.value = "";
        headerCityName.textContent = "Seattle";
    });
});

