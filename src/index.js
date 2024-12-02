"use strict";

const state = {
    curTemp : 60,
}

const increaseTemp = () => {
    const temp = document.getElementById("tempValue");
    state.curTemp += 1;
    temp.textContent = state.curTemp;
};

const decreaseTemp = () => {
    const temp = document.getElementById("tempValue");
    state.curTemp -= 1;
    temp.textContent = state.curTemp;
};

const registerEventHandlers= () => {
    const increaseButton = document.getElementById("increaseTempControl");
    increaseButton.addEventListener("click", increaseTemp)

    const decreaseButton = document.getElementById("decreaseTempControl");
    decreaseButton.addEventListener("click", decreaseTemp)
};

document.addEventListener("DOMContentLoaded", registerEventHandlers);