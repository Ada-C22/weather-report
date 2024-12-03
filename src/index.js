"use strict";


const syncCityName =  () => {
    const cityNameHeader = document.getElementById('headerCityName');
    const cityNameTextBox = document.getElementById('cityNameInput');
    cityNameTextBox.addEventListener("input", (event) => {
        cityNameHeader.textContent = event.target.value;
    });
}



syncCityName();