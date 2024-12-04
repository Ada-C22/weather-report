'use strict';

const state = {
  tempCount: 70,
  cityName: null,
};

const findLatitudeAndLongitude = () => {
  let latitude, longitude;
  axios
    .get("http://127.0.0.1:5000/location", {
      params: {
        q: state.cityName,
        format: "json",
      },
    })
    .then((response) => {
      latitude = response.data[0].lat;
      longitude = response.data[0].lon;
      findLocation(latitude, longitude);
      console.log("success in findLatitudeAndLongitude!", latitude, longitude);
    })
    .catch((error) => {
      console.log("error in findLatitudeAndLongitude!");
    });

  // return {
  //   seattleLat: latitude,
  //   seattleLon: longitude,
  // };
};

const findLocation = (latitude, longitude) => {
  axios
    .get("http://127.0.0.1:5000/weather", {
      params: {
        format: "json",
        lat: latitude,
        lon: longitude,
      },
    })
    .then((response) => {
      console.log("success in findLocation!", response.data);
      return response.data;
    })
    .catch((error) => {
      console.log("error in findLocation!");
    });
};

const updateDecreaseTempCount = () => {
  const tempValue = document.getElementById('tempValue');
  --state.tempCount;
  tempValue.textContent = state.tempCount;

  updateTempColor();
  updateLandscape();
};

const updateIncreaseTempCount = () => {
  const tempValue = document.getElementById('tempValue');
  ++state.tempCount;
  tempValue.textContent = state.tempCount;

  updateTempColor();
  updateLandscape();
};

const updateTempColor = () => {
  const tempValue = document.getElementById("tempValue");

  switch (true) {
    case state.tempCount >= 80:
      tempValue.style.color = 'red';
      break;
    case state.tempCount >= 70:
      tempValue.style.color = 'orange';
      break;
    case state.tempCount >= 60:
      tempValue.style.color = 'yellow';
      break;
    case state.tempCount >= 50:
      tempValue.style.color = 'green';
      break;
    case state.tempCount < 50:
      tempValue.style.color = 'teal';
      break;
  }
};

const updateLandscape = () => {
  const newLandscape = document.createElement('div');
  const landscapeContainer = document.getElementById('landscape');
  landscapeContainer.textContent =  ''
  
    switch (true) {
      case state.tempCount >= 80:
        newLandscape.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
        break;
      case state.tempCount >= 70:
        newLandscape.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
        break;
      case state.tempCount >= 60:
        newLandscape.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
        break;
      case state.tempCount < 60:
        newLandscape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
        break;
    }

    landscapeContainer.appendChild(newLandscape);
}

const updateCityNameInput = () => {
  const cityNameInput = document.getElementById("cityNameInput");
  const headerCityName = document.getElementById("headerCityName");
  headerCityName.textContent = cityNameInput.value;
  state.cityName = cityNameInput.value;
};

const resetCityNameInput = () => {
  const cityNameReset = document.getElementById("cityNameReset");
  cityNameInput.value = "";
  headerCityName.textContent = "";
};

const registerEventHandlers = () => {
  const decreaseTemp = document.getElementById('decreaseTempControl');
  const increaseTemp = document.getElementById('increaseTempControl');
  decreaseTemp.addEventListener('click', updateDecreaseTempCount);
  increaseTemp.addEventListener('click', updateIncreaseTempCount);
  cityNameInput.addEventListener("input", updateCityNameInput);
  cityNameReset.addEventListener("click", resetCityNameInput);

  updateTempColor();
  updateLandscape();
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
