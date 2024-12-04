document.addEventListener('DOMContentLoaded', () => {
    const increaseTempButton = document.getElementById('increaseTempControl');
    const decreaseTempButton = document.getElementById('decreaseTempControl');
    const landscape = document.getElementById('landscape');
    const cityDisplay = document.getElementById('headerCityName');
    const cityInput = document.getElementById('cityNameInput');
    const getTempButton = document.getElementById('currentTempButton');
    const skySelect = document.getElementById("skySelect");
    const sky = document.getElementById("sky");
    const resetButton = document.getElementById("cityNameReset");
    const DEFAULT_TEMP = 70;

    cityDisplay.textContent = "Miami";
    cityInput.addEventListener('input', () => {
      cityDisplay.textContent = cityInput.value.trim();
    });

    landscape.style.fontFamily = "monospace";
    landscape.style.whiteSpace = "pre";

    let temperature = DEFAULT_TEMP;
    const PROXY_URL = "http://localhost:5000";

    const getRealTimeTemperature = async () => {
      const city = cityDisplay.textContent.trim();
  
      if (!city) {
        alert("Please enter a valid city name.");
        return;
      }

      try {
        const locationResponse = await axios.get(`${PROXY_URL}/location`, {
          params: { q: city }
        });

        if (!locationResponse.data || locationResponse.data.length === 0) {
          alert('Unable to find location.');
          return;
        }

        const { lat, lon } = locationResponse.data[0];
        const weatherResponse = await axios.get(`${PROXY_URL}/weather`, {
          params: { lat: lat, lon: lon }
        });

        if (weatherResponse.data && weatherResponse.data.main) {
       
          const kelvinTemp = weatherResponse.data.main.temp;
          temperature = Math.round((kelvinTemp - 273.15) * 9/5 + 32);
          updateDisplay();
        } else {
          alert('Unable to fetch weather data.');
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
        alert('Unable to fetch temperature. Please try again.');
      }
    };

    function updateDisplay() {
      const tempDisplay = document.getElementById('tempValue');
      tempDisplay.textContent = `${temperature}°F`;
      if (temperature >= 80) {
        tempDisplay.style.backgroundColor = "red";
        landscape.textContent = "🌡️ BURNING HOT 🌡️\n" +
          "  ╭──────╮   \n" +
          " ░│ ☀️ ☀️ │░  \n" +
          "░░╰──────╯░░\n";
      } else if (temperature >= 70 && temperature < 80) {
        tempDisplay.style.backgroundColor = "orange";
        landscape.textContent = "⛵ SAILING DAY ⛵\n" +
          "   ⛵ ⛵      \n" +
          " ∿∿∿∿∿∿     \n" +
          "∿∿∿∿∿∿∿∿∿\n";
      } else if (temperature >= 60 && temperature < 70) {
        tempDisplay.style.backgroundColor = "yellow";
        landscape.textContent = "⛅ IDEAL DAY ⛅\n" +
          "   ╭∩∩∩╮    \n" +
          " ╭∩∩∩∩∩╮   \n" +
          "∽∽∽∽∽∽∽∽∽\n";
      } else if (temperature >= 50 && temperature < 60) {
        tempDisplay.style.backgroundColor = "green";
        landscape.textContent = "🍂 CRISP DAY 🍁\n" +
          "  ≈╮__╭≈    \n" +
          "  ⋯╭━━╮⋯   \n" +
          " ⋯⋯○⋯⋯⋯   \n" +
          "⋯⋯⋯⋯⋯⋯⋯\n";
      } else if (temperature <= 49) {
        tempDisplay.style.backgroundColor = "teal";
        landscape.textContent = "🌨️ SNOW DAY ⛄\n" +
          "  ╭❅╮╭❅╮   \n" +
          " ╭❅╮╭❅╮╭❅╮  \n" +
          "▓▓▓▓▓▓▓▓▓\n";
      }
    };

    function updateSky() {
      sky.textContent = "";
      const skyValue = skySelect.value;

      if (skyValue === "sunny") {
        sky.textContent = "☁️ ☁️ ☁️ ☀️ ☁️ ☁️" 
      } 
      else if (skyValue === "cloudy") {
        sky.textContent = "☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️"
      } 
      else if (skyValue === "rainy") {
        sky.textContent = "🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧" 
      } 
      else if (skyValue === "snowy") {
        sky.textContent = "🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨"
      } 
    };

    skySelect.addEventListener('change', updateSky);

    resetButton.addEventListener('click', () => {
      cityDisplay.textContent = 'Miami';
      cityInput.value = 'Miami';
      updateDisplay();
      updateSky();
      getRealTimeTemperature();
    });
    
    increaseTempButton.addEventListener('click', () => {
      temperature++;
      updateDisplay();
    });

    decreaseTempButton.addEventListener('click', () => {
      temperature--;
      updateDisplay();
    });

    getTempButton.addEventListener('click', getRealTimeTemperature);

    updateDisplay();
    updateSky();
  });  