const state = {
  tempValue: 32,
  increaseTempControlButton: null,
  decreaseTempControlButton: null,
  currentTempButton: null,
  landscape: null,
  headerCityName: null,
  cityNameInput: null,
  skySelect: null,
  cityNameReset: null,
};

const loadControls = () => {
  state.increaseTempControlButton = document.getElementById(
    'increaseTempControl'
  );
  state.decreaseTempControlButton = document.getElementById(
    'decreaseTempControl'
  );
  state.currentTempButton = document.getElementById('currentTempButton');
  state.landscape = document.getElementById('landscape');
  state.headerCityName = document.getElementById('headerCityName');
  state.cityNameInput = document.getElementById('cityNameInput');
  state.skySelect = document.getElementById('skySelect');
  state.cityNameReset = document.getElementById('cityNameReset');
};

let temperature;

const changeCityName = () => {
  headerCityName.innerText = state.cityNameInput.value;
};
const resetCityName = () => {
  state.cityNameInput.value = '';
  state.headerCityName.innerText = '';
  state.tempValue = 32
  document.getElementById('tempValue').textContent = state.tempValue;
  tempValue.style.color = 'teal';
  landscape.textContent = '❄️🥶☃️❄️🥶☃️❄️🥶☃️❄️🥶☃️❄️🥶☃️';
};

const increaseTemp = () => {
  ++state.tempValue;
  document.getElementById('tempValue').textContent = state.tempValue;
  temperature = state.tempValue;
  changeColorByTemperature(temperature);
};

const decreaseTemp = () => {
  --state.tempValue;
  document.getElementById('tempValue').textContent = state.tempValue;
  temperature = state.tempValue;
  changeColorByTemperature(temperature);
};
const getLatAndLon = () => {
  const city = state.cityNameInput.value;
  let longitude, latitude;

  return axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        q: city,
      },
    })
    .then((response) => {
      latitude = response.data[0].lat;
      longitude = response.data[0].lon;
      return { latitude, longitude };
    })
    .catch((e) => {
      console.log('error in finding latitude/longitude!');
    });
};
const getWeather = (latitude, longitude) => {
  let cityTemp;

  return axios
    .get('http://127.0.0.1:5000/weather', {
      params: {
        lat: latitude,
        lon: longitude,
      },
    })
    .then((response) => {
      cityTemp = response.data.main.temp;
      tempToFar = (((cityTemp - 273.15) * 9) / 5 + 32).toFixed(0);
      return tempToFar;
    })
    .catch((error) => {
      console.log(error, 'error in weather');
    });
};

const getCurrentTemp = () => {
  getLatAndLon()
    .then(({ latitude, longitude }) => {
      return getWeather(latitude, longitude);
    })
    .then((weatherData) => {
      console.log('Temperature in °F :', weatherData);
      state.tempValue = weatherData;
      document.getElementById('tempValue').textContent = state.tempValue;
      changeColorByTemperature(weatherData);
    })
    .catch((error) => {
      console.error('Error in overall flow:', error);
    });
};

const changeColorByTemperature = (temperature) => {
  if (temperature >= 90) {
    tempValue.style.color = 'red';
    landscape.textContent = '🔥🥵💦🌶️🔥🥵💦🌶️🔥🥵💦🌶️🔥🥵💦🌶️🔥';
  } else if (temperature >= 80 && temperature <= 89) {
    tempValue.style.color = 'hotpink';
    landscape.textContent = '🥥🌴🌺🌅🌊🥥🌴🌺🌅🌊🥥🌴🌺🌅🌊🥥🌴🌺';
  } else if (temperature >= 70 && temperature <= 79) {
    tempValue.style.color = 'purple';
    landscape.textContent = '😎☀️🍉⛱️🍦😎☀️🍉⛱️🍦😎☀️🍉⛱️🍦😎☀️🍉⛱️🍦';
  } else if (temperature >= 60 && temperature <= 69) {
    tempValue.style.color = 'darkgreen';
    landscape.textContent = '🐣🌷🌬🌱🐣🌷🌬🌱🐣🌷🌬🌱🐣🌷🌬🌱';
  } else if (temperature >= 50 && temperature <= 59) {
    tempValue.style.color = 'darkorange';
    landscape.textContent = '☕🍂🧺🧸☕🍂🧺🧸☕🍂🧺🧸☕🍂🧺🧸☕🍂🧺🧸';
  } else if (temperature >= 40 && temperature <= 49) {
    tempValue.style.color = 'lightblue';
    landscape.textContent = '❄️⛸️🐧🎄🧣❄️⛸️🐧🎄🧣❄️⛸️🐧🎄🧣❄️⛸️🐧🎄🧣';
  } else {
    tempValue.style.color = 'teal';
    landscape.textContent = '❄️🥶☃️❄️🥶☃️❄️🥶☃️❄️🥶☃️❄️🥶☃️';
  }
};

const changeSky = () => {
  let skyOption = state.skySelect.value;
  if (skyOption === 'sunny') {
    document.body.style.backgroundImage = 'url(../assets/sunny_sky.jpg)';
    document.body.style.backgroundSize = 'cover';
  } else if (skyOption === 'cloudy') {
    document.body.style.backgroundImage = 'url(../assets/cloudy_sky.jpg)';
    document.body.style.backgroundSize = 'cover';
  } else if (skyOption === 'rainy') {
    document.body.style.backgroundImage = 'url(../assets/rainy.jpg)';
    document.body.style.backgroundSize = 'cover';
  } else if (skyOption === 'snowy') {
    document.body.style.backgroundImage = 'url(../assets/snowy.jpg)';
    document.body.style.backgroundSize = 'cover';
  } else if (skyOption == 'select') {
    document.body.style.background = 'url(../assets/weather.jpg)';
    document.body.style.backgroundSize = 'cover';
  }
};

const registerEventHandlers = () => {
  loadControls();
  state.increaseTempControlButton.addEventListener('click', increaseTemp);
  state.decreaseTempControlButton.addEventListener('click', decreaseTemp);
  state.cityNameInput.addEventListener('input', changeCityName);
  state.currentTempButton.addEventListener('click', getCurrentTemp);
  state.skySelect.addEventListener('change', changeSky);
  state.cityNameReset.addEventListener('click', resetCityName);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
