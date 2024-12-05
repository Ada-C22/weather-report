"use strict";

// Constants
const state = {
  realTempValue: 70,
  realTempValueColor: 'orange',
  gardenTempValue: 70,
  gardenTempValueColor: 'orange',
  landscape: '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷',
  sky: 'sunny',
  name: 'Seattle',
  weather: 'clear',
  weatherIconCode: '01d',
  weatherDescription: 'clear sky',
};

const tempProperties = [ 
{   temp: 80, 
    color: 'red',
    landscape: '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂'
  },
{   temp: 70,
    color: 'orange',
    landscape: '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷'
  },
{   temp: 60,
    color: 'yellow',
    landscape: '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃'
  },
{   temp: 50,
    color: 'green',
    landscape: '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲' 
  },
{   temp: 49,
    color: 'teal',
    landscape: '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲'
  }
];

const skyOptions = {
  'sunny': '☁️ ☁️ ☁️ ☀️ ☁️ ☁️',
  'cloudy': '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️',
  'rainy': '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧',
  'snowy': '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨',
};

// Helper Functions

//Wave 2
const changeGardenTempValueColorAndLandscape = () =>{
  let data = {}
  for (const idx in tempProperties){
    let temp = tempProperties[idx].temp;
    if (temp === 49 && state.gardenTempValue<= temp){
      data.gardenTempValueColor = tempProperties[idx].color;
      data.landscape = tempProperties[idx].landscape;
      break;
    }else if (state.gardenTempValue >= temp){
      data.gardenTempValueColor = tempProperties[idx].color;
      data.landscape = tempProperties[idx].landscape;
      break;
    }
  }
  updateState(data);
  // document.getElementById('tempValue').style.color = state.gardenTempValueColor;
  
  let currentElement = document.getElementById('tempValue');
  let currentClassList = currentElement.classList;
  if (currentClassList.length != 0) {    
    currentElement.classList.remove(currentClassList[0]);
  }
  currentElement.classList.add(state.gardenTempValueColor);

  document.getElementById('landscape'). textContent = state.landscape;
};



const changeRealTempValueColor = () =>{
  let colorData ={}
  for (const idx in tempProperties){
    let temp = tempProperties[idx].temp;
    if (temp === 49 && state.realTempValue<= temp){
      colorData.realTempValueColor = tempProperties[idx].color;
      break;
    }else if (state.realTempValue >= temp){
      colorData.realTempValueColor = tempProperties[idx].color;
      break;
    }
  }
  updateState(colorData);
  // document.getElementById('realTempValue').style.color = state.realTempValueColor;
  let currentElement = document.getElementById('realTempValue');
  let currentClassList = currentElement.classList;
  if (currentClassList.length != 0) {    
    currentElement.classList.remove(currentClassList[0]);
  }
  currentElement.classList.add(state.realTempValueColor);
};

const changeRealWeatherDetails = () =>{
  // Change weather
  const weather = document.getElementById('weather');
  weather.textContent = state.weather.toUpperCase();
  //Change weather details
  const weatherDetails = document.getElementById('weather-details');
  weatherDetails.textContent = state.weatherDescription;
  const weatherIcon = document.getElementById('weather-icon');
  weatherIcon.src = `https://openweathermap.org/img/wn/${state.weatherIconCode}@2x.png`;


}





const increaseTemp = () =>{
  state.gardenTempValue += 1;
  const temp = document.getElementById('tempValue');
  temp.textContent = state.gardenTempValue;
  changeGardenTempValueColorAndLandscape();
};

const decreaseTemp = () =>{
  state.gardenTempValue -= 1;
  const temp = document.getElementById('tempValue');
  temp.textContent  = state.gardenTempValue;
  changeGardenTempValueColorAndLandscape();
};


// Wave 3
const updateCityName = () => {
  const cityNameInput = document.getElementById("cityNameInput");
  state.name = cityNameInput.value
  
  const headerCityName = document.getElementById("headerCityName");
  headerCityName.textContent = state.name;
};

// Wave 4
const getCityCoords = () =>{
  const city = state.name;
  return axios
    .get('http://127.0.0.1:5000/location', {params:{q: city}})
    .then((response)=>{
      const results = {
        cityLat:response.data[0].lat,
        cityLon: response.data[0].lon
      };
      return results;
    })
    .catch((error) => console.log('getCityCoords error: ', error.status));
}

const getCityWeatherData = (coordObject) =>{
  return axios
    .get ('http://127.0.0.1:5000/weather', {params:{lat: coordObject.cityLat, lon: coordObject.cityLon}})
    .then((response)=>{
      console.log(response.data)
      const tempK = response.data.main.temp;
      const tempF = (tempK - 273.15) * 1.8 + 32;
      const weatherData ={
        realTempValue: parseInt(tempF.toFixed(0)),
        weather: response.data.weather[0].main,
        weatherIconCode:  response.data.weather[0].icon,
        weatherDescription: response.data.weather[0].description,
      }
      return weatherData
    })
    .catch((error) => console.log('getCityWeatherData error: ', error.status));
    ;
  };
  
  
  const getCityData =  () => {
    return getCityCoords()
    .then( (coordList) => {
      return getCityWeatherData(coordList);
    })
  };
  

const updateState = (data) =>{
  // state.weather = data.weather
  // state.weatherConditionCode = data.weatherConditionCode
  // state.weatherIconCode = data.weatherIconCode
  // state.realTempValue = data.realTempValue

  for (let key of Object.keys(data)){
    state[key] = data[key]
  }

};

const updateCityTempDisplay = () =>{
  getCityData()
  .then((data) =>{
    updateState(data);
    let temp = data.realTempValue
    document.getElementById('realTempValue').textContent = temp;
    changeRealTempValueColor();
    changeRealWeatherDetails();
  });
};

// Wave 5
const changeSky = () => {
  const selectedSky = document.getElementById('skySelect').value;
  const skyDisplay = document.getElementById('skyDisplay');
  
  if (skyOptions[selectedSky]) {
    state.sky = selectedSky;
    skyDisplay.textContent = skyOptions[state.sky]; 
  } else {
      skyDisplay.textContent = ''; 
  }
};
// Wave 6
const resetCityName = () =>{
  state.name = 'Seattle';
  const headerCityName = document.getElementById('headerCityName');

  headerCityName.textContent = state.name;
  cityNameInput.value = "";
};


// Main code 
const registerEventHandlers = () => {
  const increaseTempButton = document.getElementById("increaseTempControl");
  increaseTempButton.addEventListener("click", increaseTemp);
  
  const decreaseTempButton = document.getElementById("decreaseTempControl");
  decreaseTempButton.addEventListener("click", decreaseTemp);
  
  const getCurrentTempButton = document.getElementById('currentTempButton');
  getCurrentTempButton.addEventListener("click", updateCityTempDisplay);
  
  const cityNameInput = document.getElementById("cityNameInput");
  cityNameInput.addEventListener("input", updateCityName);

  const skySelect = document.getElementById("skySelect");
  skySelect.addEventListener("change", changeSky);
  
  const resetCityNameButton = document.getElementById('cityNameReset')
  resetCityNameButton.addEventListener('click', resetCityName)
  
};

const initializeSite = () =>{
  document.getElementById('tempValue').textContent = state.gardenTempValue
  changeGardenTempValueColorAndLandscape();
  resetCityName();
  updateCityTempDisplay();
};

document.addEventListener("DOMContentLoaded", ()=>{
  registerEventHandlers();
  initializeSite();
});


