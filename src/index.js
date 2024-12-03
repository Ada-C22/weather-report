const state = {
    city: 'Seattle',
    temperature: 80
}
const tempValue = document.getElementById('tempValue')
const gardenSection = document.querySelector('.garden__section ');
const landscape = document.getElementById('landscape')

const temperatureIncrease= () => {
    state.temperature += 1
    // const tempValue = document.getElementById('tempValue')
    tempValue.textContent = state.temperature
    temperatureColor()
    weatherGardenDisplay()
}

const temperatureDecrease = () => {
    state.temperature -= 1
    // const tempValue = document.getElementById('tempValue')
    tempValue.textContent = state.temperature 
    temperatureColor()
    weatherGardenDisplay() 
}
const temperatureColor = () => {
    tempValue.classList.remove("red", "orange", "yellow", "green", "teal");

    if (state.temperature >= 80) {
        tempValue.classList.add("red");
    } else if (state.temperature >= 70) {
        tempValue.classList.add("orange");
    } else if (state.temperature >= 60) {
        tempValue.classList.add("yellow");
    } else if (state.temperature >= 50) {
        tempValue.classList.add("green");
    } else {
        tempValue.classList.add("teal");
    }
}

const weatherGardenDisplay = () => {
    // landscape.classList.remove()
    gardenSection.classList.remove("sunny", "cloudy", "rainy", "snowy");
    if (state.temperature >= 80) {
        gardenSection.classList.add("sunny")
        landscape.innerHTML = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂"
    } else if (state.temperature >= 70) {
        gardenSection.classList.add("cloudy")
        landscape.innerHTML = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷"
    } else if (state.temperature >= 60) {
        gardenSection.classList.add("rainy")
        landscape.innerHTML = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃"
    } else {
        gardenSection.classList.add("snowy")
        landscape.innerHTML = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲"
    }
}

const registerEventHandlers = () => {
    //whatever function is updating UI
    const increaseButton = document.getElementById('increaseButton');
    increaseButton.addEventListener("click",temperatureIncrease);

    const decreaseButton = document.getElementById('decreaseButton');
    decreaseButton.addEventListener("click",temperatureDecrease);
};
document.addEventListener("DOMContentLoaded", registerEventHandlers);



