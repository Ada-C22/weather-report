'use strict';
// F = 1.8*(K-273) + 32.
//  F = 9/5(K - 273) + 32
// C = K - 273.15

const state = {
  tempCount: 70,
  cityName: "seattle",
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
};

const updateCityNameInput = () => {
  const cityNameInput = document.getElementById("cityNameInput");
  const headerCityName = document.getElementById("headerCityName");
  headerCityName.textContent = cityNameInput.value;
  state.cityName = cityNameInput.value;
  console.log(state.cityName);
};

const resetCityNameInput = () => {
  const cityNameReset = document.getElementById("cityNameReset");
  cityNameInput.value = "";
  headerCityName.textContent = "";
};

const findTemperature = (coord) => {
  return axios
    .get("http://127.0.0.1:5000/weather", {
      params: {
        lat: coord[latitude],
        lon: coord[longitude],
      },
    })
    .then((response) => {
      console.log("success in findTemperature!", response.data.main.temp);
      return response.data;
    })
    .catch((error) => {
      console.log("error in findTemperature!");
    });
};


const findLatitudeAndLongitude = () => {
  let latitude, longitude;
  return axios
    .get("http://127.0.0.1:5000/location", {
      params: {
        q: state.cityName,
        format: "json",
      },
    })
    .then((response) => {
      latitude = response.data[0].lat;
      longitude = response.data[0].lon;
      console.log("success in findLatitudeAndLongitude!", latitude, longitude);
      return {
        lat: latitude, 
        lon: longitude 
      }
    })
    .catch((error) => {
      console.log("error in findLatitudeAndLongitude!");
    });

  // return {
  //   seattleLat: latitude,
  //   seattleLon: longitude,
  // };
};

const getTemperature = () => {
  const tempValue = document.getElementById("tempValue");

  return findLatitudeAndLongitude()
  .then(coord => {
    state.tempCount = 40
    tempValue.textContent = state.tempCount;
    const tempData = findTemperature(coord);
    console.log(tempData)
    return tempData;
  });
};

  // getTemperature()
  //   .then(temp => {
  //     console.log(temp);
  //   });

const registerEventHandlers = () => {
  const decreaseTemp = document.getElementById('decreaseTempControl');
  const increaseTemp = document.getElementById('increaseTempControl');
  const currentTempButton = document.getElementById("currentTempButton");
  decreaseTemp.addEventListener('click', updateDecreaseTempCount);
  increaseTemp.addEventListener('click', updateIncreaseTempCount);
  cityNameInput.addEventListener("input", updateCityNameInput);
  cityNameReset.addEventListener("click", resetCityNameInput);
  currentTempButton.addEventListener("click", getTemperature);

  updateTempColor();
  updateLandscape();
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
