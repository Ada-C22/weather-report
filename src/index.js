"use strict";
// Common Selectors
// const sky = document.getElementById("sky");
const cityNameHeader = document.getElementById('headerCityName');
const cityNameTextBox = document.getElementById('cityNameInput');
const tempValue = document.getElementById("tempValue");
const landscape = document.getElementById("landscape");
const landscapeImg = document.getElementById("landscapeImg");

// selects
const skySelect = document.getElementById("skySelect");

// buttons
const resetCityName = document.getElementById("cityNameReset");
const convertTempBtn = document.getElementById("convert-temp-btn");
const increaseTempControl = document.getElementById("increaseTempControl");
const decreaseTempControl = document.getElementById("decreaseTempControl");
const currentTempButton = document.getElementById("currentTempButton");
const citySearchButton = document.getElementById("citySearchButton");

// default values
const defaultCityNameInput = "Seattle";
const defaultTempValue = 299.817; // 80 F
const skies = {
    chooseAForecast: "&nbsp;",
    sunny: "☁️☁️☁️☀️☁️☁️☁️",
    cloudy: "☁️☁️☁️☁️️☁️️☁️",
    rainy: "🌧🌈🌦🌧🌧💧⛈",
    snowy: "🌨❄️🌨🌨❄️❄️🌨",
};

// Keeping one place where we change the temp and unit
const currentTemperature = {
    unit: "F",
    value: defaultTempValue,
    image: "default.png"
}
// Api uses Kelvin convert to F
const kelvinToF = (k) => {
    return Math.floor(1.8*(k-273) + 32)
}
// Api uses Kelvin convert to C
const kelvinToC = (k) => {
    return Math.floor(k - 273.15)
}
// Get current temp in the selected unit
const getTemperatureInCurrentUnit = () => {
    if(currentTemperature.unit === "F"){
        return kelvinToF(currentTemperature.value)
    }
    return kelvinToC(currentTemperature.value)
}
// Get a formatted temp
const displayTemperature = () => {
    return `${getTemperatureInCurrentUnit()}°${currentTemperature.unit}`
}

// Syncs City name between the input box and the title
const syncCityName =  () => {
    if(cityNameTextBox.value !== "") {
        cityNameHeader.textContent = cityNameTextBox.value
    } else {
        cityNameHeader.textContent = defaultCityNameInput;
    }
    cityNameTextBox.addEventListener("input", (event) => {
        cityNameHeader.textContent = event.target.value;
    });
}

// updates temperature text color and weather garden landscape
const updateWeatherDisplay = () => {
    let temp = kelvinToF(currentTemperature.value);
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
    tempValue.textContent = displayTemperature();
    updateBackground();
};

// weather album section
const updateWeatherAlbum = () => {
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
    // resets city name and temperature
    const resetCityInfo = () => {
        cityNameHeader.textContent = defaultCityNameInput;
        currentTemperature.value = defaultTempValue
        tempValue.textContent = displayTemperature();
        tempValue.style.color = "red";
        cityNameTextBox.value = "";
        updateWeatherDisplay();
        updateBackground();
    };

    resetCityName.addEventListener("click", resetCityInfo);
};

// Get Temp of search terms
const tempSearch = async (cityName) => {
    const locationResponse = await axios.get('http://localhost:5000/location', {
        params: {q: cityName}
    });
    const {lat, lon} = locationResponse.data[0];

    const weatherResponse = await axios.get('http://localhost:5000/weather', {
        params: {lat, lon}
    });
    currentTemperature.value = weatherResponse.data.main.temp;
    tempValue.textContent = displayTemperature();
    updateWeatherDisplay();
};

// - Changing the temperature should change the page's background.
const updateBackground = () => {
    const body = document.body;
    let temp = kelvinToF(currentTemperature.value);
    if (temp > 80) {
        currentTemperature.image = "hot.png"
    } else if (temp > 65) {
        currentTemperature.image = "good.png"
    } else {
        currentTemperature.image = "cold.png"
    }
    body.style.backgroundImage = `url(./assets/tempretures/${currentTemperature.image})`;
    body.style.backgroundSize = "cover";
};

// sky display

const updateSkyDisplay = (selectedSky) => {
    const skyDisplay = document.getElementById("sky");
    skyDisplay.innerHTML = skies[selectedSky] || skies.chooseAForecast;
};

skySelect.addEventListener("change", (event) => {
    const selectedSky = event.target.value;
    const sky = document.getElementById("sky");
    sky.innerHTML = "";
    sky.textContent = skies[selectedSky];
    updateSkyDisplay(selectedSky);
});


// set temp control
increaseTempControl.addEventListener("click", () => {
    if(currentTemperature.unit === "F"){
        currentTemperature.value +=  0.555;
    } else {
        currentTemperature.value += 1;
    }
    tempValue.textContent = displayTemperature();
    updateWeatherDisplay();
});
decreaseTempControl.addEventListener("click", () => {
    if(currentTemperature.unit === "F") {
        currentTemperature.value -=  0.555;
    } else {
        currentTemperature.value -= 1;
    }
    tempValue.textContent = displayTemperature();
    updateWeatherDisplay();
});
// Get current temp
currentTempButton.addEventListener("click", async () => {
    const cityName = cityNameHeader.innerHTML;
    await tempSearch(cityName)
    updateWeatherDisplay();
});

citySearchButton.addEventListener("click", async () => {
    const cityName = cityNameTextBox.value;
    syncCityName()
    await tempSearch(cityName)
    updateWeatherDisplay();
});


convertTempBtn.addEventListener("click", () => {
    if (currentTemperature.unit === "C") {
        convertTempBtn.textContent = "Convert to °C";
        currentTemperature.unit = "F"
    } else {
        convertTempBtn.textContent = "Convert to °F";
        currentTemperature.unit = "C"
    }
    updateWeatherDisplay();
    tempValue.textContent = displayTemperature();
});

// DOM initialization
document.addEventListener("DOMContentLoaded", () => {
    updateWeatherDisplay();
    updateWeatherAlbum();
    updateCityNameReset();
    syncCityName();
});
