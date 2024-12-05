let currentTemperature = 70;

const tempValue = document.getElementById('tempValue');
const increaseTempControl = document.getElementById('increaseTempControl');
const decreaseTempControl = document.getElementById('decreaseTempControl');
const landScrape = document.getElementById('landscape');

const updateTemperature = () => {
    tempValue.textContent = `${currentTemperature}°F`;

    if (currentTemperature >= 80) {
        tempValue.style.color = 'red';
        tempValue.style.backgroundColor = '#FFCCCC';
        landScrape.textContent = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
    } else if (currentTemperature >= 70) {
        tempValue.style.color = 'orange';
        tempValue.style.backgroundColor = '#FFE4B5';
        landScrape.textContent = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";
    } else if (currentTemperature >= 60) {
        tempValue.style.color = 'yellow';
        tempValue.style.backgroundColor = 'pink';
        landScrape.textContent = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
    } else if (currentTemperature >= 50) {
        tempValue.style.color = 'green';
        tempValue.style.backgroundColor = '#CCFFCC';
        landScrape.textContent = "🌲🌲🍂🌲🍁🍃🌲🌾🌲🌲🍂🍁🌲";
    } else if (currentTemperature >= 40) {
        tempValue.style.color = 'teal';
        tempValue.style.backgroundColor = '#CCFFFF';
        landScrape.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
    }
}

increaseTempControl.addEventListener('click', () => {
    currentTemperature += 1;
    updateTemperature();
});

decreaseTempControl.addEventListener('click', () => {
    currentTemperature -= 1;
    updateTemperature();
});
// Wave 3 
document.addEventListener("DOMContentLoaded", () => {
    const cityNameInput = document.getElementById('cityNameInput');
    const headerCityName = document.getElementById('headerCityName');
    const currentTempButton = document.getElementById("currentTempButton");

    cityNameInput.addEventListener("input", (event) => {
        const newCityName = event.target.value;
        headerCityName.textContent = newCityName;
    });

// Wave 4
    const getRealTimeTemperature = async () => {
      
        const cityName = headerCityName.textContent;
        
        try {
            const locationResponse = await axios.get(
                `http://127.0.0.1:5000/location?q=${cityName}`
            );
           
            const { lat, lon } = locationResponse.data[0];
           
            const weatherResponse = await axios.get(
                `http://127.0.0.1:5000/weather?lat=${lat}&lon=${lon}`
            );
            const tempKelvin = weatherResponse.data.main.temp;

            const tempFahrenheit = ((tempKelvin - 273.15) * 1.8) + 32;

            currentTemperature = Math.round(tempFahrenheit);
            updateTemperature();

            // Update the sky based on weather condition
            const weatherCondition = weatherResponse.data.weather.main;
            let skyType = "Sunny"; // Default sky

            if (weatherCondition.includes("Rain")) {
            skyType = "Rainy";
            } else if (weatherCondition.includes("Snow")) {
            skyType = "Snowy";
            } else if (weatherCondition.includes("Cloud")) {
            skyType = "Cloudy";
            }

            skySelect.value = skyType; // Sync dropdown
            updateSky(skyType);

        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    currentTempButton.addEventListener("click", getRealTimeTemperature);

// Wave 6
    const resetButton = document.getElementById('cityNameReset');
    resetButton.addEventListener("click", () => {
        cityNameInput.value = "";
        headerCityName.textContent = "Seattle";
        currentTemperature = 70;
        updateTemperature();
        updateSky("Sunny");
        skySelect.value = "Sunny";
    });

    updateTemperature();
});

// Wave 5
const updateSky = () => {
    const skySelect = document.getElementById('skySelect');
    const skyElement = document.getElementById('sky');

    const skyOptions = {
        Sunny: "☁️ ☁️ ☁️ ☀️ ☁️ ☁️",
        Cloudy: "☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️",
        Rainy: "🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧",
        Snowy: "🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨",
    };

    const selectedSky = skySelect.value;
    skyElement.textContent = skyOptions[selectedSky];
};

// Add an event listener to the select dropdown for changing the sky
document.getElementById('skySelect').addEventListener('change', updateSky);

document.addEventListener("DOMContentLoaded", () => {
    updateSky("Sunny");
    updateTemperature();
  });



