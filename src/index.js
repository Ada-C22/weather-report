const state = {
    temperature: 69,
    cityName: "Seattle",
    skyName: "Sunny",
};

//Wave 2: Increase and Decrease Temperature

// Function when clicking on up button
const increaseTemp = () => {
    state.temperature += 1;
    changeTemp()
};

// Function when clicking on down button
const decreaseTemp = () => {
    state.temperature -= 1;
    changeTemp()
};

const changeTemp = () => {
    const currentTemp = document.getElementById("tempValue");
    currentTemp.textContent = state.temperature;
    changeStyleToTemp(currentTemp)
};


// helper function to change text color and landscape
const changeStyleToTemp = (currentTemp) => {
    const currentLandscape = document.getElementById("landscape")
    if (state.temperature >= 80) {
        currentTemp.style.color = "red";
        currentLandscape.textContent = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
    } else if (state.temperature >= 70) {
        currentTemp.style.color = "orange";
        currentLandscape.textContent = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";
    } else if (state.temperature >= 60) {
        currentTemp.style.color = "yellow";
        currentLandscape.textContent = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
    } else if (state.temperature >= 50) {
        currentTemp.style.color = "green";
        currentLandscape.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
    } else if (state.temperature <= 49) {
        currentTemp.style.color = "teal";
        currentLandscape.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
    }
};



// Wave 3: Function that runs when user inputs in search bar
const updateCityName = () => {
    const searchBar = document.getElementById("cityNameInput");
    const cityNameDisplay = document.getElementById("headerCityName");
    state.cityName = searchBar.value;
    cityNameDisplay.textContent = state.cityName;
};

// Wave 4: Function to call location and weather APIs 
const getCityWeather = () => {

    axios.get('http://127.0.0.1:5000/location', {
        params: {
            q: state.cityName, 
        },
    })
    .then((locationResponse) => {
        const lat = locationResponse.data[0].lat;
        const lon = locationResponse.data[0].lon;

        return axios.get('http://127.0.0.1:5000/weather', {
            params: {
                lat: lat,
                lon: lon,
            },
        });
    })
    .then((weatherResponse) => {
        let tempK = weatherResponse.data.main.temp;
        let tempF = Math.round((tempK - 273.15) * 1.8 + 32);
        const currentTemp = document.getElementById("tempValue");
        currentTemp.textContent = tempF;
    })
    .catch((error) => {
        console.error(error);
    });
};

//Wave 5: Function to update the sky
const updateSky = () => {
    const skySelect = document.getElementById("skySelect");
    state.skyName = skySelect.value; 
    changeSkyStyle(); 
};

// helper function to change the sky
const changeSkyStyle = () => {
    const skyDiv = document.getElementById("sky"); 

    if (state.skyName == 'Sunny') {
        skyDiv.textContent = "☁️ ☁️ ☁️ ☀️ ☁️ ☁️";
    } else if (state.skyName == 'Cloudy') {
        skyDiv.textContent = "☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️";
    } else if (state.skyName == 'Rainy') {
        skyDiv.textContent = "🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧";
    } else if (state.skyName == 'Snowy') {
        skyDiv.textContent = "🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨";
    }
};


// Wave 6: Function to reset city name
const resetCityName = () => {
    const cityDefault = "Seattle";
    state.cityName = cityDefault;

    const searchBar = document.getElementById("cityNameInput");
    const cityNameDisplay = document.getElementById("headerCityName");
    searchBar.value = cityDefault; 
    cityNameDisplay.textContent = cityDefault;
};


// register the buttons and their respective listener + function
const registerEventHandlers = () => {
    // when DOM loads, the default temp text should also change colors. The default sky should be displayed.
    changeTemp();
    changeSkyStyle();
    resetCityName();
    
    const upButton = document.querySelector("#increaseTempControl");
    upButton.addEventListener("click", increaseTemp);

    const downButton = document.querySelector("#decreaseTempControl");
    downButton.addEventListener("click", decreaseTemp);

    const searchBar = document.getElementById("cityNameInput")
    searchBar.addEventListener("input", updateCityName);

    const currentTempButton = document.querySelector("#currentTempButton");
    currentTempButton.addEventListener("click", getCityWeather);

    const skyButton = document.querySelector("#skySelect");
    skyButton.addEventListener("change", updateSky);

    const resetButton = document.querySelector("#cityNameReset");
    resetButton.addEventListener("click", resetCityName);
};

document.addEventListener("DOMContentLoaded", registerEventHandlers)