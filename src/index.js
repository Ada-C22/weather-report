// "use strict";
let color = "";
let landscape = "" ;

const state = {
  currentTemp : 70
};

////// temp updates
////// figuring out how to update temperature in html/css styles needed 
const tempValue = document.getElementById("tempValue");
tempValue.innerText = state.currentTemp;
///// figuring out how to add up and down arrows next to the temperature gauge
///////figuring out how to create behaviors and events for up down arrows 
///declare color and lanscape functions: 
const increaseTemp = () => {
  state.currentTemp += 1;
  const tempValueContainer = document.getElementById("tempValue")
  tempValueContainer.innerText = state.currentTemp;
  // let tempColorandLandscape = findTempColorandLandscape(state.currentTemp);
  // // let tempColor = tempColorandLandscape.color;
  // // let tempLandscape = tempColorandLandscape.landscape;
  

};

const decreaseTemp = () => {
  state.currentTemp -= 1;
  const tempValueContainer = document.getElementById("tempValue")
  tempValueContainer.innerText = state.currentTemp
};

const registerEventHandlers = () => {
  const increaseTempButton = document.querySelector("#increaseTempButton");
  increaseTempButton.addEventListener("click",increaseTemp);
  const decreaseTempButton = document.querySelector("#decreaseTempButton");
  decreaseTempButton.addEventListener("click", decreaseTemp)
};

document.addEventListener("DOMContentLoaded",registerEventHandlers)

const findTempColorandLandscape = (temp) => {
if (temp <= 49) {
  color = 'teal';
  landscape = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
}
if (temp >= 50 & temp <= 59) {
  color = 'green';
  landscape = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
}
if (temp >= 60 & temp <= 69) {
  color = 'yellow';
  landscape = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
}
else if (temp >= 70 & temp <= 79) {
  color = 'orange';
  landscape = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";
}
if (temp >= 80){
  color = 'red';
  landscape = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
}

console.log(color, landscape);
return {
  'color':color, 
  'landscape': landscape
}
};

// findTempColorandLandscape(temp)

