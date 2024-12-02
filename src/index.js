"use strict";

// Constants




// Wave 2
const state = {
  tempValue: 70,
  tempValueColor: 'orange'
}

const increaseTemp = () =>{
  state.tempValue += 1;
  const temp = document.getElementById('tempValue');
  temp.textContent = state.tempValue;
  manageTempValueColor();
};

const decreaseTemp = () =>{
  state.tempValue -= 1;
  const temp = document.getElementById('tempValue');
  temp.textContent = state.tempValue;
  manageTempValueColor();
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


const registerEventHandlers = () => {
  const increaseTempButton = document.getElementById("increaseTempControl");
  increaseTempButton.addEventListener("click", increaseTemp);
  
  const decreaseTempButton = document.getElementById("decreaseTempControl");
  decreaseTempButton.addEventListener("click", decreaseTemp);
};

document.addEventListener("DOMContentLoaded", ()=>{
  registerEventHandlers();
  manageTempValueColor();

});