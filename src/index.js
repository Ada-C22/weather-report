let temperature = 48;

const tempValue = document.getElementById('tempValue');
const increaseTempControl = document.getElementById('increaseTempControl');
const decreaseTempControl = document.getElementById('decreaseTempControl');
const landScape = document.getElementById('landscape');
const cityNameInput = document.getElementById('cityNameInput');
const cityNameReset = document.getElementById('cityNameReset');
const headerCityName = document.getElementById('headerCityName');
const getRealTimeTempButton = document.getElementById('getRealTimeTempButton');
const skyOptions = {
    'sunny': {
        'text': "☁️ ☁️ ☁️ ☀️ ☁️ ☁️",
        'backgroundColor': "#DFFFFF",
    },
    'cloudy': {
        'text': "☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️",
        'backgroundColor': "#D3D3D3",
    },
    'rainy': {
        'text': "🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧",
        'backgroundColor': "#B0C3DF",
    },
    'snowy': {
        'text': "🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨",
        'backgroundColor': "#ADD9E6",
    },
};
const skySelect = document.getElementById("skySelect");
const skyDisplay = document.getElementById("skyDisplay")
const gardenContent = document.getElementById("gardenContent")

skySelect.addEventListener("change", (event) => {
    const skySelected = event.target.value;
    console.log("Selected sky:", skySelected);
    updateSky(skySelected);
});

const updateSky = (sky) => {
    const skySelectOption = skyOptions[sky]
    console.log(skySelectOption)
    if (skySelectOption) {
        skyDisplay.textContent = skySelectOption.text;
        gardenContent.style.backgroundColor = skySelectOption.backgroundColor;
    }    
};

const updateTemperature = () => {
    tempValue.textContent = `${temperature}°F`;
    tempValue.style.color = getFontColor(temperature);
    landScape.textContent = getLandscape(temperature);
};

const getLandscape = (temp) => {
    if (temp <= 59) return '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
    if (temp <= 69) return '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
    if (temp <= 79) return '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
    return '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
};

const getFontColor = (temp) => {
    if (temp <= 49) return 'teal';
    if (temp <= 59) return 'green';
    if (temp <= 69) return 'yellow';
    if (temp <= 79) return 'orange';
    return 'red';
};

increaseTempControl.addEventListener('click', () => {
    temperature += 1;
    updateTemperature();
});

decreaseTempControl.addEventListener('click', () => {
    temperature -= 1;
    updateTemperature();
});

getRealTimeTempButton.addEventListener('click', () => {
    const city = headerCityName.textContent;

    getCityLocation (city)
    .then(({ lat, lon }) => {
        return getCityTemperature(lat,lon);
    })
    .catch((error) => {
        console.log('Error data:', error);
        tempValue.textContent = 'Unable to get temperature';
    })
});

const getCityLocation = (city) => {
    return axios
    .get('https://ada-weather-report-proxy-server.onrender.com/location', {params:{'q': city}})
    .then((locationResponse) => { 
        const lat = locationResponse.data[0].lat;
        const lon = locationResponse.data[0].lon;  
        return { lat, lon };     
    })   
    .catch((error) => {
        console.log('Error data:', error);
    });
};

const getCityTemperature = (lat, lon) => {
    return axios
    .get('https://ada-weather-report-proxy-server.onrender.com/weather', {params:{"lat": lat, "lon": lon}})
    .then((tempResponse) => {
        const kelvinTemp = tempResponse.data.main.temp;
        const fahrenheitTemp = Math.floor(((kelvinTemp - 273.15) * 9) / 5 + 32);
        tempValue.textContent = `${fahrenheitTemp}°F`;
    })
    .catch((error) => {
        console.log('Error data:', error);
    });
};

updateTemperature();

const updateCityName = (updateCity) => {
    headerCityName.textContent = updateCity;
};

cityNameInput.addEventListener('input', (event) => {
    updateCityName(event.target.value);
});

cityNameReset.addEventListener('click', () => {
    cityNameInput.value = '';
    updateCityName('Seattle');
});

skySelect.addEventListener("change", (event) => {
    console.log(event.target.value);
    updateSky(event.target.value);
});

