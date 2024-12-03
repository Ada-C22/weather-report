"use strict";

// Constants




// Wave 2
const state = {
  tempValue: 70,
  tempValueColor: 'orange',
  landscape: '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷',
  name: 'Seattle'
}

const increaseTemp = () =>{
  state.tempValue += 1;
  const temp = document.getElementById('tempValue');
  temp.textContent = state.tempValue;
  manageTempValueColor();
  changeLandscape();
};

const decreaseTemp = () =>{
  state.tempValue -= 1;
  const temp = document.getElementById('tempValue');
  temp.textContent = state.tempValue;
  manageTempValueColor();
  changeLandscape();
};

const manageTempValueColor = () =>{
  const temp = document.getElementById('tempValue').textContent;
  if (temp >= 80){
    state.tempValueColor = 'red';
  }else if (temp <=79 && temp >=70){
    state.tempValueColor = 'orange';
  }else if (temp <=69 && temp>=60){
    state.tempValueColor = 'yellow';
  }else if (temp <=59 && temp>=50){
    state.tempValueColor = 'green';
  }else if (temp <=49){
    state.tempValueColor = 'teal';
  }

  document.getElementById('tempValue').style.color = state.tempValueColor;
}


const changeLandscape =()=>{
  if (state.tempValue >= 80){
    state.landscape = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  }else if (state.tempValue <=79 && state.tempValue >=70){
    state.landscape = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  }else if (state.tempValue <=69 && state.tempValue>=60){
    state.landscape = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  }else {
    state.landscape = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
  
  const currentLandscape = document.getElementById('landscape');
  currentLandscape.textContent= state.landscape;
  
}

const registerEventHandlers = () => {
  const increaseTempButton = document.getElementById("increaseTempControl");
  increaseTempButton.addEventListener("click", increaseTemp);
  
  const decreaseTempButton = document.getElementById("decreaseTempControl");
  decreaseTempButton.addEventListener("click", decreaseTemp);

  const getCurrentTempButton = document.getElementById('currentTempButton');
  getCurrentTempButton.addEventListener('click', updateDisplayCityTemp);

  const resetCityNameButton = document.getElementById('cityNameReset')
  resetCityNameButton.addEventListener('click', resetCityName)
};

document.addEventListener("DOMContentLoaded", ()=>{
  registerEventHandlers();
  manageTempValueColor();
  changeLandscape();

});

// Wave 3
document.addEventListener("DOMContentLoaded", () => {
    const headerCityName = document.getElementById("headerCityName");
    const cityNameInput = document.getElementById("cityNameInput");

    // Update city name when user types city in the input field
    cityNameInput.addEventListener("input", () => {
      state.name = cityNameInput.value
      headerCityName.textContent = cityNameInput.value;
    });

});

// Wave 4
const getDisplayCityCoords = () =>{
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
    .catch((error) => console.log('getDisplayCityCoords error: ', error.status));
}

const getDisplayCityTemp = (coordObject) =>{
  return axios
    .get ('http://127.0.0.1:5000/weather?', {params:{lat: coordObject.cityLat, lon: coordObject.cityLon}})
    .then((response)=>{
      const tempK = response.data.main.temp;
      const tempF = (tempK - 273.15) * 1.8 + 32;
      return tempF.toFixed(0);
    })
    .catch((error) => console.log('getDisplayCityTemp error: ', error.status));
    ;
};


const updateDisplayCityTemp =  () => {
  getDisplayCityCoords()
    .then( (coordList) => {
      return getDisplayCityTemp(coordList);
    })
    .then((currentTemp) =>{
      state.tempValue = currentTemp
      const temp = document.getElementById('tempValue');
      temp.textContent = state.tempValue;
      manageTempValueColor();
      changeLandscape();
    });
};



// Wave 5 

// Wave 6
const resetCityName = () =>{
  state.name = 'Seattle';
  const headerCityName = document.getElementById('header-city-name')
  headerCityName.textContent = state.name;
  cityNameInput.value = "";
};