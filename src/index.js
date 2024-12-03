"use strict";

const state = {
    curTemp : 60,
}

const increaseTemp = () => {
    const temp = document.getElementById("tempValue");
    state.curTemp += 1;
    temp.textContent = state.curTemp;
    changeColorAndLandscape(state.curTemp);
};

const decreaseTemp = () => {
    const temp = document.getElementById("tempValue");
    state.curTemp -= 1;
    temp.textContent = state.curTemp;
    changeColorAndLandscape(state.curTemp);
};

const changeColorAndLandscape = (temp) => {
    const tempValue = document.getElementById("tempValue");
    const landscape = document.getElementById("landscape");
    if (temp >= 80) {
        tempValue.style.color = "Red";
        landscape.textContent = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
    } else if (temp >= 70) {
        tempValue.style.color = "Orange";
        landscape.textContent = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";
    } else if (temp >= 60) {
        tempValue.style.color = "Yellow";
        landscape.textContent = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
    } else if (temp >= 50) {
        tempValue.style.color = "Green";
        landscape.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
    } else {
        tempValue.style.color = "Teal";
        landscape.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
    }
};

const changeCityName = () => {
    const cityName = document.getElementById("cityNameInput").value;
    document.getElementById("headerCityName").textContent = cityName;
};

const registerEventHandlers= () => {
    const increaseButton = document.getElementById("increaseTempControl");
    increaseButton.addEventListener("click", increaseTemp)

    const decreaseButton = document.getElementById("decreaseTempControl");
    decreaseButton.addEventListener("click", decreaseTemp)

    const cityResetButton = document.getElementById("cityNameReset");
    cityResetButton.addEventListener("click", changeCityName)
};

document.addEventListener("DOMContentLoaded", registerEventHandlers);