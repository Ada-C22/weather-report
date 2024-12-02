"use strict";


// Wave 3
document.addEventListener("DOMContentLoaded", () => {
    const headerCityName = document.getElementById("headerCityName");
    const cityNameInput = document.getElementById("cityNameInput");
    const cityNameReset = document.getElementById("cityNameReset");

    // Update city name when user types city in the input field
    cityNameInput.addEventListener("input", () => {
        headerCityName.textContent = cityNameInput.value;
    });

    // When user clicks on reset the city name will default to Seattle
    cityNameReset.addEventListener("click", () => {
        headerCityName.textContent = "Seattle";
        cityNameInput.value = "";
    });
});