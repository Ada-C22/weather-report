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
  weather: 'clear sky',
  weatherIconCode: '01d',
  weatherConditionCode: 800,
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

const weatherConditionCodeDetails = {
  200: 'thunderstorm with light rain',
  201: 'thunderstorm with rain',
  202: 'thunderstorm with heavy rain',
  210: 'light thunderstorm',
  211: 'thunderstorm',
  212: 'heavy thunderstorm',
  221: 'ragged thunderstorm',
  230: 'thunderstorm with light drizzle',
  231: 'thunderstorm with drizzle',
  232: 'thunderstorm with heavy drizzle',
  300: 'light intensity drizzle',
  301: 'drizzle',
  302: 'heavy intensity drizzle',
  310: 'light intensity drizzle rain',
  311: 'drizzle rain',
  312: 'heavy intensity drizzle rain',
  313: 'shower rain and drizzle',
  314: 'heavy shower rain and drizzle',
  321: 'shower drizzle',
  500: 'light rain',
  501: 'moderate rain',
  502: 'heavy intensity rain',
  503: 'very heavy rain',
  504: 'extreme rain',
  511: 'freezing rain',
  520: 'light intensity shower rain',
  521: 'shower rain',
  522: 'heavy intensity shower rain',
  531: 'ragged shower rain',
  600: 'light snow',
  601: 'snow',
  602: 'heavy snow',
  611: 'sleet',
  612: 'light shower sleet',
  613: 'shower sleet',
  615: 'light rain and snow',
  616: 'rain and snow',
  620: 'light shower snow',
  621: 'shower snow',
  622: 'heavy shower snow',
  701: 'mist',
  711: 'smoke',
  721: 'haze',
  731: 'sand/dust whirls',
  741: 'fog',
  751: 'sand',
  761: 'dust',
  762: 'volcanic ash',
  771: 'squalls',
  781: 'tornado',
  800: 'clear sky',
  801: 'few clouds: 11-25%',
  802: 'scattered clouds: 25-50%',
  803: 'broken clouds: 51-84%',
  804: 'overcast clouds: 85-100%',
  }

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
  weatherDetails.textContent = weatherConditionCodeDetails[state.weatherConditionCode];
  // Change weather icon
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
      const tempK = response.data.main.temp;
      const tempF = (tempK - 273.15) * 1.8 + 32;
      const weatherData ={
        realTempValue: parseInt(tempF.toFixed(0)),
        weather: response.data.weather[0].main,
        weatherIconCode:  response.data.weather[0].icon,
        weatherConditionCode: response.data.weather[0].id,
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


