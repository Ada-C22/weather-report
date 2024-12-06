// import getCityCoordAndWeatherData from apiCalls.js 
const state = {
  currentTemp : 70,
  currentCity : "Seattle",
  currentSky: "Sunny"
};
const DEFAULT_CITY = "Default City";

/// starting up page view: 
const tempValue = document.getElementById("tempValue");
tempValue.innerText = state.currentTemp;
const cityValue = document.getElementById("cityNameInput");
cityValue.value = state.currentCity;
const skySelectElement = document.getElementById("skySelect");
const skyDisplayElement = document.getElementById("sky");
const cityNameElement = document.getElementById('cityName');
const cityInputElement = document.getElementById('cityNameInput');
const resetButton = document.getElementById('cityNameReset');




const updateCityValue = () => {
  const input = document.getElementById("cityNameInput");
  state.currentCity = input;
  getCityCoordAndWeatherData(input);
  // const newTemp = newWeatherData.currentTemp;
  // state.currentTemp = newTemp;
}

const increaseTemp = () => {
  state.currentTemp += 1;
  const tempValueContainer = document.getElementById("tempValue")
  tempValueContainer.innerText = state.currentTemp;
  changeLandscape(state.currentTemp)
  changeTempColor(state.currentTemp);
};

const decreaseTemp = () => {
  state.currentTemp -= 1;
  const tempValueContainer = document.getElementById("tempValue")
  tempValueContainer.innerText = state.currentTemp
  changeLandscape(state.currentTemp);
  changeTempColor(state.currentTemp);
};

const registerEventHandlers = () => {
  const increaseTempButton = document.querySelector("#increaseTempButton");
  increaseTempButton.addEventListener("click",increaseTemp);
  const decreaseTempButton = document.querySelector("#decreaseTempButton");
  decreaseTempButton.addEventListener("click", decreaseTemp);
  const cityInputUpdate = document.querySelector("cityNameInput");
  cityInputUpdate.addEventListener("input", updateCityValue)
};

document.addEventListener("DOMContentLoaded",registerEventHandlers)


const changeLandscape= (currentTemp) => {
  let landscapeString = findCustomStyle(currentTemp,landscapeDictionary)
  // let colorString = findCustomStyle(currentTemp,styleDictionary)
  const weatherGardenLandscapeContainer = document.getElementById("landscape")
  weatherGardenLandscapeContainer.innerText = landscapeString
}
const changeTempColor = (currentTemp) => {
  let tempColor = findCustomStyle(currentTemp, tempColorDictionary);
  const tempValue = document.getElementById('tempValue');
  tempValue.style.color=tempColor;

}



const findCustomStyle = (temp,styleDictionary) => {
if (temp <= 49) {
  return styleDictionary[49];
}
if (temp >= 50 & temp <= 59) {
  return styleDictionary[59]
}
if (temp >= 60 & temp <= 69) {
  return styleDictionary[69]
}
else if (temp >= 70 & temp <= 79) {
  return styleDictionary[79]
}
if (temp >= 80){
  return styleDictionary[80]
}
};

// findTempColorandLandscape(temp)

const landscapeDictionary = {
  80 : "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂",
  79 : "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷",
  69 : "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃",
  59 : "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲",
  49 : "🌲⛄️⛄️🌲⛄️⛄️🌲🍁🌲⛄️⛄️🍂🌲"
} 

const tempColorDictionary = {
  49 :"teal",
  59 :"green",
  69 :"yellow",
  79 :"orange",
  80 : "red"
};

const skiesDictionary = {
  Sunny: "☁️ 🕊   ☀️ ☁️  🦅 ☁️",
  Haze: "🌫🌫🌫🌫🌫🌫🌫🌫🌫🌫",
  Cloudy: "☁️ ☁️ ☁️ 🌤 ☁️ ☁️ ☁️",
  Rainy: "🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧",
  Snowy: "🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨"
};

const openWeatherConditions= {
  ThunderStorm: "⛈⛈⛈⛈⛈⛈⛈⛈⛈⛈⛈",
  Rain: "🌧🌈⛈🌧🌧💧💧🌧🌦🌧💧🌧🌧",
  Drizzle: "🌧🌈🌧🌧🌧🌦🌧🌧🌈🌧☁️☁️",
  Snow: "🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨",
  Mist: "🌫🌫🌫🌫🌫🌫🌫🌫🌫🌫",
  Smoke: "🌫🌫🌫🌫🌫🌫🌫🌫🌫🌫",
  Haze: "🌫🌫🌫🌫🌫🌫🌫🌫🌫🌫",
  Dust: "🌫🌫🌫🌫🌫🌫🌫🌫🌫🌫", 
  Fog: "🌫🌫🌫🌫🌫🌫🌫🌫🌫🌫", 
  Sand: "🌫🌫🌫🌫🌫🌫🌫🌫🌫🌫",
  Ash: "🌫🌫🌫🌫🌫🌫🌫🌫🌫🌫", 
  Squall: "🌨⛈🌧🌨⛈🌧🌨⛈🌧", 
  Tornado: "🌪⛈⛈🌪⛈⛈🌪⛈⛈", 
  Clear: "         ☀️   🕊       ", 
  Cloudy: "☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️☁️"
};


const changeSky = () => {
  skySelectElement.addEventListener('change', (event) => {
    const selectedSky = event.target.value;
  
    if (selectedSky in openWeatherConditions) {
        skyDisplayElement.innerText = openWeatherConditions[selectedSky];

    } else {
        skyDisplayElement.innerText = "";
    }
  });
};

const changeCity = () => {
  cityInputElement.addEventListener('input', (event) => {
    cityNameElement.textContent = event.target.value || DEFAULT_CITY;
    const cityNameInput = document.getElementById('cityNameInput')
    getCityCoordandWeatherData(cityNameInput)
  });
  
  // Reset the city name and input field when the button is clicked
  resetButton.addEventListener('click', () => {
    cityNameElement.textContent = DEFAULT_CITY; // Reset city name
    cityInputElement.value = ""; // Clear the input field
  });
};
changeLandscape(state.currentTemp);
changeTempColor(state.currentTemp);
changeSky();
changeCity();

const getCityCoordandWeatherData = (currentCity) => {
  axios
  .get(`http://127.0.0.1:5000/location?q=${currentCity}`)
  .then( (response) => {
    const coordinates = {}
    let lat= response.data[0].lat;
    let lon= response.data[0].lon;
    coordinates['lat'] = lat
    coordinates['lon'] = lon
    console.log('success in find latitude and longitude!', coordinates)
    return getWeatherData(coordinates)
    console.log(currentCity)
    console.log(coordinates)
  })
  .catch((error) => {
    console.log(error,'could not find location data')
  })
};


const getWeatherData = (coordinates) => {
  axios
  .get(`http://127.0.0.1:5000/weather?lat=${coordinates.lat}&lon=${coordinates.lon}`)
  .then( (response) => {
    const cityWeatherData = {}
    console.log(response.data['name'])
    let weatherData = response.data['weather'];
    let currentWeather = weatherData[0].main;
    let tempData = response.data['main']
    let tempK = tempData.temp
    let tempF = (convertTemp(tempK, "K", "F")).toFixed(1);
    cityWeatherData['currentWeather']= currentWeather
    cityWeatherData['currentTemp'] = tempF
    cityWeatherData['currentTempType'] = "F"
    state.currentTemp = tempF
    changeLandscape(state.currentTemp)
    changeTempColor(state.currentTemp)
    state.currentSky = currentWeather
    if (currentWeather in openWeatherConditions ) {
      skyDisplayElement.innerText = openWeatherConditions[selectedSky];
    } 
    else {
        skyDisplayElement.innerText = "";
    }
    console.log('success in finding weather data for city!',cityWeatherData
    )
    return cityWeatherData
  })
  .catch((error) => {
    console.log(error,'could not get weather data')
  });

  }

const convertTemp = (temp, inputType, outputType) => {
  //celcius to farenheit
  if (outputType === "C" & inputType === "F") {
    return temp*1.8+32;
  }
  //farenheit to celcius
  else if (inputType === "F" & outputType === "C") {
    return (temp-32)/1.8;
  }
  //kelvin to farenheit
  else if (inputType === "K" & outputType === "F") {
    return (temp*1.8)-459.67;
  }
  // kelvin to celcius
  else if (inputType === "K" & outputType === "C") {
    return temp - 273.15;
  }
  else {
    console.log("error");
  };
};

