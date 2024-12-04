"use strict";

// Constants
const state = {
  tempValue: 70,
  tempValueColor: 'orange',
  landscape: '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷',
  name: 'Seattle'
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

// Helper Functions

//Wave 2
const changeTempValueColorAndLandscape = () =>{
  for (const idx in tempProperties){
    let temp = tempProperties[idx].temp;
    if (temp === 49 && state.tempValue<= temp){
      state.tempValueColor = tempProperties[idx].color;
      state.landscape = tempProperties[idx].landscape;
      break;
    }else if (state.tempValue >= temp){
      state.tempValueColor = tempProperties[idx].color;
      state.landscape = tempProperties[idx].landscape;
      break;
    }
  }
  document.getElementById('tempValue').style.color = state.tempValueColor;
  document.getElementById('landscape'). textContent = state.landscape;
};


const increaseTemp = () =>{
  state.tempValue += 1;
  const temp = document.getElementById('tempValue');
  temp.textContent = state.tempValue;
  changeTempValueColorAndLandscape();
};

const decreaseTemp = () =>{
  state.tempValue -= 1;
  const temp = document.getElementById('tempValue');
  temp.textContent  = state.tempValue;
  changeTempValueColorAndLandscape();
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

const getCityTemp = (coordObject) =>{
  return axios
    .get ('http://127.0.0.1:5000/weather', {params:{lat: coordObject.cityLat, lon: coordObject.cityLon}})
    .then((response)=>{
      const tempK = response.data.main.temp;
      const tempF = (tempK - 273.15) * 1.8 + 32;
      return tempF.toFixed(0);
    })
    .catch((error) => console.log('getCityTemp error: ', error.status));
    ;
};


const updateCityTempDisplay =  () => {
  getCityCoords()
  .then( (coordList) => {
    return getCityTemp(coordList);
  })
  .then((currentTemp) =>{
    state.tempValue = parseInt(currentTemp)
    document.getElementById('tempValue').textContent = state.tempValue;
    changeTempValueColorAndLandscape();
  });
};

// Wave 5

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
  getCurrentTempButton.addEventListener('click', updateCityTempDisplay);
  
  const cityNameInput = document.getElementById("cityNameInput");
  cityNameInput.addEventListener("input", updateCityName);
  
  const resetCityNameButton = document.getElementById('cityNameReset')
  resetCityNameButton.addEventListener('click', resetCityName)
  
};


const initializeSite = () =>{
  resetCityName();
  updateCityTempDisplay();
};

document.addEventListener("DOMContentLoaded", ()=>{
  registerEventHandlers();
  initializeSite();
});


