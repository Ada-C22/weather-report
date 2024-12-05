"use strict";

const defaultCityNameInput = "Seattle";
const defaultTempValue = 299.817; // 80 F
// Keeping one place where we change the temp and unit
const currentTemperature = {
    unit: "F",
    value: defaultTempValue,
    image: "default.png"
}

const kelvinToF = (k) => {
    return Math.floor(1.8*(k-273) + 32)
}

const kelvinToC = (k) => {
    return Math.floor(k - 273.15)
}
const getTemperatureInCurrentUnit = () => {
    if(currentTemperature.unit === "F"){
        return kelvinToF(currentTemperature.value)
    }
    return kelvinToC(currentTemperature.value)
}

const displayTemperature = () => {
    return `${getTemperatureInCurrentUnit()}°${currentTemperature.unit}`
}

// Syncs City name between the input box and the title
const syncCityName =  () => {
    const cityNameHeader = document.getElementById('headerCityName');
    const cityNameTextBox = document.getElementById('cityNameInput');
    if(cityNameTextBox.value !== "") {
        cityNameHeader.textContent = cityNameTextBox.value
    } else {
        cityNameHeader.textContent = defaultCityNameInput;
    }
    cityNameTextBox.addEventListener("input", (event) => {
        cityNameHeader.textContent = event.target.value;
    });
}

// temperature control section
const updateTemperatureControl = () => {
    const tempValue = document.getElementById("tempValue");
    const increaseTempControl = document.getElementById("increaseTempControl");
    const decreaseTempControl = document.getElementById("decreaseTempControl");
    const landscape = document.getElementById("landscape");

    let temp = getTemperatureInCurrentUnit();
    tempValue.textContent = displayTemperature();

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
    const increaseTemp = () => {
        currentTemperature.value += 1;
        tempValue.textContent = displayTemperature();
        updateWeatherDisplay();
    };

    // controls temperature decrease
    const decreaseTemp = () => {
        currentTemperature.value -= 1;
        tempValue.textContent = displayTemperature();
        updateWeatherDisplay();
    };

    increaseTempControl.addEventListener("click", increaseTemp);
    decreaseTempControl.addEventListener("click", decreaseTemp);
};

// weather album section
const updateWeatherAlbum = () => {
    const landscapeImg = document.getElementById("landscapeImg");
    const images = [
        './assets/weather-imgs/weather_1.png',
        './assets/weather-imgs/weather_2.jpg',
        './assets/weather-imgs/weather_3.png',
        './assets/weather-imgs/weather_4.jpg',
        './assets/weather-imgs/weather_5.jpg'
    ];
    let currentIndex = 0;

    // rotates weather album images
    const rotateImage = () => {
        currentIndex = (currentIndex + 1) % images.length;
        landscapeImg.style.backgroundImage = `url(${images[currentIndex]})`;
    };

    setInterval(rotateImage, 10000);
};

// reset city name section
const updateCityNameReset = () => {
    const resetCityName = document.getElementById("cityNameReset");
    const headerCityName = document.getElementById("headerCityName");
    const tempValue = document.getElementById("tempValue");
    const cityNameInput = document.getElementById("cityNameInput");

    // resets city name and temperature
    const resetCityInfo = () => {
        headerCityName.textContent = defaultCityNameInput;
        currentTemperature.value = defaultTempValue
        tempValue.textContent = displayTemperature();
        tempValue.style.color = "red";
        cityNameInput.value = "";
    };

    resetCityName.addEventListener("click", resetCityInfo);
};

// DOM initialization
document.addEventListener("DOMContentLoaded", () => {
    updateTemperatureControl();
    updateWeatherAlbum();
    updateCityNameReset();
    syncCityName();
    updateBackground();
});

const tempSearch = async (cityName) => {
    const locationResponse = await axios.get('http://localhost:5000/location', {
        params: {q: cityName}
    });
    const {lat, lon} = locationResponse.data[0];

    const weatherResponse = await axios.get('http://localhost:5000/weather', {
        params: {lat, lon}
    });
    currentTemperature.value = weatherResponse.data.main.temp;
    document.getElementById("tempValue").textContent = displayTemperature();
    updateBackground();
};

document.getElementById("currentTempButton").addEventListener("click", async () => {
    const cityName = document.getElementById('headerCityName').innerHTML;
    await tempSearch(cityName)
});
document.getElementById("citySearchButton").addEventListener("click", async () => {
    const cityName = document.getElementById('cityNameInput').value;
    syncCityName()
    tempSearch(cityName)
});

document.getElementById("skySelect").addEventListener("change", (event) => {
    const selectedSky = event.target.value;
    const skyDisplay = document.getElementById("sky");

    skyDisplay.innerHTML = "";
    const skies = {
        sunny: "☁️ ☁️ ☁️ ☀️ ☁️ ☁️",
        cloudy: "☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️",
        rainy: "🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧",
        snowy: "🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨",
    };

    skyDisplay.textContent = skies[selectedSky];
});


document.getElementById("convert-temp-btn").addEventListener("click", () => {
    const convertTempBtn = document.getElementById("convert-temp-btn");
    if (currentTemperature.unit === "C") {
        convertTempBtn.textContent = "Convert to °C";
        currentTemperature.unit = "F"
    } else {
        convertTempBtn.textContent = "Convert to °F";
        currentTemperature.unit = "C"
    }
    document.getElementById("tempValue").textContent = displayTemperature();
});

// - Changing the temperature should change the page's background.
const updateBackground = () => {
    const body = document.body;
    if (currentTemperature.value > 290) {
        currentTemperature.image = "hot.png"
    } else if (currentTemperature.value > 280 && currentTemperature.value <= 290) {
        currentTemperature.image = "good.png"
    } else {
        currentTemperature.image = "cold.png"
    }
     body.style.backgroundImage = `url(./assets/tempretures/${currentTemperature.image})`;
     body.style.backgroundSize = "cover";
};