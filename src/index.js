
const state = {
    temperature: 69,
    cityName: "",
};

// Function when clicking on up button
const increaseTemp = () => {
    state.temperature += 1;
    changeTemp()
};

// Function when clicking on down button
const decreaseTemp = () => {
    state.temperature -= 1;
    changeTemp()
};

const changeTemp = () => {
    const currentTemp = document.getElementById("tempValue");
    currentTemp.textContent = state.temperature;
    changeStyleToTemp(currentTemp)
};

// helper function to change text color and landscape
const changeStyleToTemp = (currentTemp) => {
    const currentLandscape = document.getElementById("landscape")
    if (state.temperature >= 80) {
        currentTemp.style.color = "red";
        currentLandscape.textContent = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
    } else if (state.temperature >= 70) {
        currentTemp.style.color = "orange";
        currentLandscape.textContent = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";
    } else if (state.temperature >= 60) {
        currentTemp.style.color = "yellow";
        currentLandscape.textContent = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
    } else if (state.temperature >= 50) {
        currentTemp.style.color = "green";
        currentLandscape.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
    } else if (state.temperature <= 49) {
        currentTemp.style.color = "teal";
        currentLandscape.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
    }
};


// function that runs when user inputs in search bar
const updateCityName = () => {
    const searchBar = document.getElementById("cityNameInput")
    const cityNameDisplay = document.getElementById("headerCityName");
    state.cityName = searchBar.value;
    cityNameDisplay.textContent = state.cityName;
};

// fnc that runs when user clicks get realtime temp button
const getCurrentTemp = () => {

    // axios
    // .get("/location", {
    //     params : {
    //         q: state.cityName,
    //         format: "json",
    //     }, 
    // })
    // .then((response) => {
    //     console.log("success!", response.data)
    // })
    // .catch((error) => {
    //     console.log('failed!', error.response.data)
    // })
};

// register the buttons and their respective listener + function
const registerEventHandlers = () => {
    // when DOM loads, the default temp text should also change colors
    changeTemp()
    
    const upButton = document.querySelector("#increaseTempControl");
    upButton.addEventListener("click", increaseTemp);

    const downButton = document.querySelector("#decreaseTempControl");
    downButton.addEventListener("click", decreaseTemp);

    const searchBar = document.getElementById("cityNameInput")
    searchBar.addEventListener("input", updateCityName);

    const currentTempButton = document.querySelector("#currentTempButton");
    currentTempButton.addEventListener("click", getCurrentTemp)
};

document.addEventListener("DOMContentLoaded", registerEventHandlers)