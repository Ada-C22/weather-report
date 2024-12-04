const state = {
  temp: null,
  tempElement: null,
  landscapeContainer: null,
  increaseButton: null,
  decreaseButton: null,
  cityName: null,
  cityInput: null,
  realtimeTempButton: null,
  resetButton: null,
};

const clickIncreaseTemp = () => {
  state.temp++;
  updateTemp();
  refreshTempUI();
};

const clickDecreaseTemp = () => {
  state.temp--;
  updateTemp();
  setTimeout(refreshTempUI, 10);
};

const updateTemp = () => {
  state.tempElement.textContent = state.temp;
};

const refreshTempUI = () => {
  state.tempElement.classList.value = '';
  if (state.temp >= 80) {
    state.tempElement.classList.toggle('red');
    state.landscapeContainer.innerHTML = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (state.temp >= 70 && state.temp <= 79) {
    state.tempElement.classList.toggle('orange');
    state.landscapeContainer.innerHTML = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (state.temp >= 60 && state.temp <= 69) {
    state.tempElement.classList.toggle('yellow');
    state.landscapeContainer.innerHTML = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (state.temp >= 50 && state.temp <= 59) {
    state.tempElement.classList.toggle('green');
    state.landscapeContainer.innerHTML = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else if (state.temp <= 49) {
    state.tempElement.classList.toggle('teal');
    state.landscapeContainer.innerHTML = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
};

const updateCity = () => {
  state.cityName.textContent = state.cityInput.value;
};

const getLocation = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:5000/location', {
      params: {
        q: state.cityName.textContent
      }
    });
    let latitude = response.data[0].lat;
    let longitude = response.data[0].lon;
    console.log(`success! location coords of ${response.data[0].display_name}: ${latitude}, ${longitude}`);
    return {
      lat: latitude,
      lon: longitude
    };
  } catch (error) {
    console.log('error with location:', error);
    if (error instanceof TypeError || error.message === "Request failed with status code 400") alert('Error. Please input a valid city.');
    if (error.message === 'Network Error') alert('Error with server. Please try again.');
  }
};

const getTempBasedOnLocation = async (latitude, longitude) => {
  try {
    const response = await axios.get('http://127.0.0.1:5000/weather', {
      params: {
        lat: latitude,
        lon: longitude
      }
    });
    state.temp = convertKelvinToFahrenehit(response.data.main.temp);
    console.log('success! temp in F:', state.temp);
  } catch (error) {
    console.log('error with temp:', error);
  }
};

const convertKelvinToFahrenehit = (kelvinTemp) => {
  return Math.ceil((convertKelvinToCelsius(kelvinTemp)) * 9/5 + 32);
};

const convertKelvinToCelsius = (kelvinTemp) => {
  return Math.ceil(kelvinTemp - 273.15);
};

const getRealtimeTemp = async () => {
  const loc = await getLocation();
  const realtimeTemp = await getTempBasedOnLocation(loc.lat, loc.lon);
  updateTemp();
  refreshTempUI();
};

const resetCityName = () => {
  state.cityInput.value = 'Seattle';
  updateCity();  
  getRealtimeTemp();
}

const loadControls = () => {
  state.landscapeContainer = document.getElementById('landscape');
  state.tempElement = document.getElementById('tempValue');
  state.increaseButton = document.getElementById('increaseTemperatureControl');
  state.decreaseButton = document.getElementById('decreaseTemperatureControl');
  state.cityName = document.getElementById('headerCityName');
  state.cityInput = document.getElementById('cityInputName');
  state.realtimeTempButton = document.getElementById('realtimeTemp');
  state.resetButton = document.getElementById('cityNameReset');
  resetCityName();
};

const registerEventHandlers = () => {
  loadControls();
  refreshTempUI();
  state.increaseButton.addEventListener('click', clickIncreaseTemp);
  state.decreaseButton.addEventListener('click', clickDecreaseTemp);
  state.cityInput.addEventListener('input', updateCity);
  state.realtimeTempButton.addEventListener('click', getRealtimeTemp);
  state.resetButton.addEventListener('click', resetCityName);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);