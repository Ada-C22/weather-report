"use strict";

let currentTempValue = 32 ;

const state = {
    increaseTempControl: null,
    decreaseTempControl: null,
    tempElement: null,
    gardenLandscape: null
};

const loadControls = () =>{
    state.tempElement = document.getElementById('tempValue');
    state.decreaseTempControl = document.getElementById('decreaseTempControl');
    state.increaseTempControl = document.getElementById('increaseTempControl');
    state.gardenLandscape = document.getElementById('landscape');
};

const updateTemperatureDisplay = () => {
    state.tempElement.textContent = `${currentTempValue}°F`;

    if (currentTempValue <= 49) {
        state.tempElement.style.color = 'blue';
        state.gardenLandscape.textContent = "A cold, snowy winter day with frost-covered trees and a blue-tinted sky, symbolizing freezing temperatures."
    } 
    
    else if (currentTempValue <= 59) {
        state.tempElement.style.color = 'green';
        state.gardenLandscape.textContent = "A mild spring day with vibrant green grass, blooming flowers, and a soft, refreshing breeze"
    } 
    
    else if (currentTempValue <= 69) {
        state.tempElement.style.color = 'yellow';
        state.gardenLandscape.textContent = "A warm summer afternoon, with golden sunlight casting a cheerful glow on the surroundings."
    } 
    
    else if (currentTempValue <= 79) {
        state.tempElement.style.color = 'orange';
        state.gardenLandscape.textContent = "An autumn landscape with leaves turning shades of orange and brown, and the air feeling crisp but comfortable."
    } 
    
    else {
        state.tempElement.style.color = 'red';
        state.gardenLandscape.textContent = "A scorching hot desert scene with blazing sunlight, sand dunes shimmering in heat, and a fiery red horizon."
    }
};


const increaseTemp = () =>{
    currentTempValue += 1;
    updateTemperatureDisplay();
};

const decreaseTemp = () =>{
    currentTempValue -= 1;
    updateTemperatureDisplay();
};

const registerEventHandlers = () => {
    loadControls();
    updateTemperatureDisplay();
    state.increaseTempControl.addEventListener('click',increaseTemp)
    state.decreaseTempControl.addEventListener('click',decreaseTemp)
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);


