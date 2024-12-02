"use strict";


// Wave 2
const state = {
  tempValue: 70,
}

const increaseTemp = () =>{
  state.tempValue += 1;
  const temp = document.getElementById('tempValue');
  temp.textContent = state.tempValue;
}

const decreaseTemp = () =>{
  state.tempValue -= 1;
  const temp = document.getElementById('tempValue');
  temp.textContent = state.tempValue;
}

const registerEventHandlers = () => {
  const increaseTempButton = document.getElementById("increaseTempControl");
  increaseTempButton.addEventListener("click", increaseTemp);
  
  const decreaseTempButton = document.getElementById("decreaseTempControl");
  decreaseTempButton.addEventListener("click", decreaseTemp);
};

document.addEventListener("DOMContentLoaded", registerEventHandlers);