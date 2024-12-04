const state = {
  tempValue: 32,
  increaseTempControlButton: null,
  decreaseTempControlButton: null,
  currentTempButton: null,
  landscape: null,
  headerCityName: null,
  cityNameInput: null,
  skySelect: null,
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
};

let temperature;

const changeCityName = () => {
  headerCityName.innerText = state.cityNameInput.value;
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
      tempToFar = ((cityTemp - 273.15) * 9/5 + 32).toFixed(0);
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
      state.tempValue = weatherData
      document.getElementById('tempValue').textContent = state.tempValue;
      changeColorByTemperature(weatherData);
    })
    .catch((error) => {
      console.error('Error in overall flow:', error);
    });

};

const changeColorByTemperature = (temperature) => {
  if (temperature >= 80) {
    tempValue.style.color = 'red';
    landscape.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (temperature >= 70 && temperature <= 79) {
    tempValue.style.color = 'purple';
    landscape.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (temperature >= 60 && temperature <= 69) {
    tempValue.style.color = 'blue';
    landscape.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (temperature >= 50 && temperature <= 59) {
    tempValue.style.color = 'orange';
    landscape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else {
    tempValue.style.color = 'teal';
    landscape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
};

const changeSky = () => {
  const skyOption =  state.skySelect.value
  console.log("Hello")
  console.log(skyOption)
    if (skyOption === 'sunny'){
    document.body.style.backgroundColor = 'orange'
  }
};

const registerEventHandlers = () => {
  loadControls();
  state.increaseTempControlButton.addEventListener('click', increaseTemp);
  state.decreaseTempControlButton.addEventListener('click', decreaseTemp);
  state.cityNameInput.addEventListener('input', changeCityName);
  state.currentTempButton.addEventListener('click', getCurrentTemp);
  state.skySelect.addEventListener('change', changeSky)
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
