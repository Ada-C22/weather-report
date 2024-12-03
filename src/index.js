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
    if (temp >= 80) {
        document.getElementById("tempValue").style.color = "Red";
        document.getElementById("landscape").textContent = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
    } else if (temp >= 70) {
        document.getElementById("tempValue").style.color = "Orange";
        document.getElementById("landscape").textContent = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";
    } else if (temp >= 60) {
        document.getElementById("tempValue").style.color = "Yellow";
        document.getElementById("landscape").textContent = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
    } else if (temp >= 50) {
        document.getElementById("tempValue").style.color = "Green";
        document.getElementById("landscape").textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
    } else {
        document.getElementById("tempValue").style.color = "Teal";
        document.getElementById("landscape").textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
    }
};


const registerEventHandlers= () => {
    const increaseButton = document.getElementById("increaseTempControl");
    increaseButton.addEventListener("click", increaseTemp)

    const decreaseButton = document.getElementById("decreaseTempControl");
    decreaseButton.addEventListener("click", decreaseTemp)
};

document.addEventListener("DOMContentLoaded", registerEventHandlers);