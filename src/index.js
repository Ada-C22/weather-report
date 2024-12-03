"use strict";

// Constants




// Wave 2
const state = {
  tempValue: 70,
  tempValueColor: 'orange',
  landscape: '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷',
  name: 'Seattle',
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
    const cityNameReset = document.getElementById("cityNameReset");

    // Update city name when user types city in the input field
    cityNameInput.addEventListener("input", () => {
        headerCityName.textContent = cityNameInput.value;
    });

    // When user clicks on reset the city name will default to Seattle
    cityNameReset.addEventListener("click", () => {
        headerCityName.textContent = "Seattle";
        cityNameInput.value = "";
    });
});

// Wave 4
const getDisplayCityTemp = async () =>{
  const city = state.name;
  return axios
          .get(`http://127.0.0.1:5000/location?q=${state.name}`) 
}

// Wave 5 
