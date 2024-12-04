

// Notes: 
// Select all elements you'll need to change: 
// <span id="increaseTempControl">⬆️</span>
// <span id="tempValue"></span>
// <span id="decreaseTempControl">⬇️</span>

// 1. <span id="tempValue"></span> this element should be set equal to variable currentTemp
//  
// 2. Add Button & Behavior to <span id="tempValue"></span> & <span id="decreaseTempControl">⬇️</span>
// 3. 
// 
// 

const state = {
    currentTemp: 0,
};


const currentTempValue = () => {
    const currentTemp = document.getElementById('currentTempButton');
    currentTemp.textContent = `${state.currentTemp} °F`;
}

currentTempValue();

const loadControls = () => {

};

const registerEventHandlers = () => {
    const warmUp = document.querySelector('increaseTempControl');
    warmUp.addEventListener("click", increaseTemp);
};

const increaseTemp = () => {
    const warmUp = document.querySelector('increaseTempControl');

    // Currently this element <span id="tempValue"></span> is being treated as our container
    const tempChangeContainer = document.getElementById('tempValue');
    state.currentTemp += 1;

};

const decreaseTemp = () => {
    const coolDown = document.querySelector('decreaseTempControl');
    const tempChangeContainer = document.getElementById('tempValue');


    state.currentTemp -= 1;
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
