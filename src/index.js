

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
    warmUp: null,
    coolDown: null,
};


const currentTempValue = () => {
    const currentTemp = document.getElementById('currentTempButton');
    currentTemp.textContent = `${state.currentTemp} °F`;
}

// Calling the function above to display the temperature
// currentTempValue();

const loadControls = () => {
    state.warmUp = document.querySelector('increaseTempControl');
    state.coolDown = document.querySelector('decreaseTempControl');

    // Currently this element <span id="tempValue"></span> is being treated as our container
    const tempChangeContainer = document.getElementById('tempValue');
};

const registerEventHandlers = () => {
    loadControls();
    state.warmUp.addEventListener('click', increaseTemp);
    state.coolDown.addEventListener('click', decreaseTemp);
};

const increaseTemp = (event) => {
    state.currentTemp += 1;
    currentTempValue();
    
};

const decreaseTemp = (event) => {
    state.currentTemp -= 1;
    currentTempValue();
    
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
