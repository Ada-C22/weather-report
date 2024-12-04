"use strict";


const syncCityName =  () => {
    const cityNameHeader = document.getElementById('headerCityName');
    const cityNameTextBox = document.getElementById('cityNameInput');
    cityNameTextBox.addEventListener("input", (event) => {
        cityNameHeader.textContent = event.target.value;
    });
}



syncCityName();

// temperature control section
document.addEventListener("DOMContentLoaded", () => {
    const tempValue = document.getElementById("tempValue");
    const increaseTempControl = document.getElementById("increaseTempControl");
    const decreaseTempControl = document.getElementById("decreaseTempControl");
    const landscape = document.getElementById("landscape");

    let temp = 80;
    tempValue.textContent = `${temp}°F`;

    // updates temperature text color and weather garden landscape
    const updateWeatherDisplay = () => {
        if (temp >= 80) {
            tempValue.style.color = "red";
            landscape.textContent = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
        } else if (temp >= 70) {
            tempValue.style.color = "orange";
            landscape.textContent = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";
        } else if (temp >= 60) {
            tempValue.style.color = "yellow";
            landscape.textContent = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
        } else if (temp >= 50) {
            tempValue.style.color = "green";
            landscape.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
        } else {
            tempValue.style.color = "teal";
            landscape.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
        }
    };

    updateWeatherDisplay();

    // controls temperature increase
    increaseTempControl.addEventListener("click", () => {
        temp += 1;
        tempValue.textContent = `${temp}°F`;
        updateWeatherDisplay();
    });

    // controls temperature decrease
    decreaseTempControl.addEventListener("click", () => {
        temp -= 1;
        tempValue.textContent = `${temp}°F`;
        updateWeatherDisplay();
    });
});


// weather album section
document.addEventListener("DOMContentLoaded", () => {
    const landscapeImg = document.getElementById("landscapeImg");
    const images = [
        './assets/weather-imgs/weather_1.png',
        './assets/weather-imgs/weather_2.jpg',
        './assets/weather-imgs/weather_3.png',
        './assets/weather-imgs/weather_4.jpg',
        './assets/weather-imgs/weather_5.jpg'
    ];
    let currentIndex = 0;

    function rotateImage() {
        currentIndex = (currentIndex + 1) % images.length;
        landscapeImg.style.backgroundImage = `url(${images[currentIndex]})`;
    }

    setInterval(rotateImage, 10000);
});

document.addEventListener("DOMContentLoaded", () => {
    const resetCityName = document.getElementById("cityNameReset");
    const headerCityName = document.getElementById("headerCityName");
    const tempValue = document.getElementById("tempValue");
    const cityNameInput = document.getElementById("cityNameInput");

    let defaultCityNameInput = "Los Angeles";

    resetCityName.addEventListener("click", () => {
        headerCityName.textContent = defaultCityNameInput;
        tempValue.textContent = "80°F";
        tempValue.style.color = "red";
        cityNameInput.value = "";
    });
});

const kelvinToF = (k) => {
    return Math.floor(1.8*(k-273) + 32)
}
document.getElementById("currentTempButton").addEventListener("click", async (e) => {
    const cityName = document.getElementById('headerCityName').textContent;

    const locationResponse = await axios.get('http://localhost:5000/location', {
        params: { q: cityName }
    });
    const { lat, lon } = locationResponse.data[0];

    const weatherResponse = await axios.get('http://localhost:5000/weather', {
        params: { lat, lon }
    });

    const temp = kelvinToF(weatherResponse.data.main.temp);
    document.getElementById("tempValue").textContent = "" + temp +" " + "F";

});