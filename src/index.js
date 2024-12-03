document.addEventListener('DOMContentLoaded', () => {
    const increaseTempButton = document.getElementById('increaseTempControl');
    const decreaseTempButton = document.getElementById('decreaseTempControl');
    const landscape = document.getElementById('landscape');
    const cityDisplay = document.getElementById('headerCityName');
    const cityInput = document.getElementById('cityNameInput');
    const getTempButton = document.getElementById('currentTempButton');

    cityDisplay.textContent = "Miami";
    cityInput.addEventListener('input', () => {
      cityDisplay.textContent = cityInput.value.trim();
    });

    landscape.style.fontFamily = "monospace";
    landscape.style.whiteSpace = "pre";

    let temperature = 70;
    const PROXY_URL = "http://localhost:5000";

    const getRealTimeTemperature = async () => {
      const city = cityDisplay.textContent.trim();
  
      if (!city) {
        alert("Please enter a valid city name.");
        return;
      }

      try {
        // Step 1: Get latitude and longitude from the proxy server
        const locationResponse = await axios.get(`${PROXY_URL}/location`, {
          params: { q: city }
        });

        console.log("Location Response:", locationResponse.data);

        if (!locationResponse.data || locationResponse.data.length === 0) {
          alert('Unable to find location.');
          return;
        }

        const { lat, lon } = locationResponse.data[0];

        // Step 2: Get weather data from the proxy server using latitude and longitude
        const weatherResponse = await axios.get(`${PROXY_URL}/weather`, {
          params: { lat: lat, lon: lon }
        });

        console.log("Weather Response:", weatherResponse.data);

        if (weatherResponse.data && weatherResponse.data.main) {
          // Convert temperature from Kelvin to Fahrenheit
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
  });  