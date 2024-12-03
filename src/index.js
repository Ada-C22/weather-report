const currentTemp = document.getElementById("tempValue");
const currentLandscape = document.getElementById("landscape")

const state = {
    temperature: 69,
};

// Function when clicking on up button
const increaseTemp = () => {
    state.temperature += 1;
    currentTemp.textContent = state.temperature;
    changeTextColor(currentTemp)
    changeLandscape()
};

// Function when clicking on down button
const decreaseTemp = () => {
    state.temperature -= 1;
    currentTemp.textContent = state.temperature;
    changeTextColor(currentTemp)
    changeLandscape()
};

const changeTextColor = (currentTemp) => {
    if (state.temperature > 80) {
        currentTemp.style.color = "red";
    } else if (state.temperature >= 70) {
        currentTemp.style.color = "orange";
    } else if (state.temperature >= 60) {
        currentTemp.style.color = "yellow";
    } else if (state.temperature >= 50) {
        currentTemp.style.color = "green";
    } else if (state.temperature <= 49) {
        currentTemp.style.color = "teal";
    }
};

const changeLandscape = () => {
    if (state.temperature >= 80) {
        currentLandscape.textContent = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
    } else if (state.temperature >= 70) {
        currentLandscape.textContent = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";
    } else if (state.temperature >= 60) {
        currentLandscape.textContent = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
    } else if (state.temperature <= 59) {
        currentLandscape.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
    }
}


// register the buttons and their respective listener + function
const registerEventHandlers = () => {
    // when DOM loads, the default temp text should also change colors
    changeTextColor(currentTemp)
    changeLandscape()
    
    const upButton = document.querySelector("#increaseTempControl");
    upButton.addEventListener("click", increaseTemp);

    const downButton = document.querySelector("#decreaseTempControl")
    downButton.addEventListener("click", decreaseTemp)
};

document.addEventListener("DOMContentLoaded", registerEventHandlers)