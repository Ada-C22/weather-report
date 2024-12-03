// temperature control section
document.addEventListener("DOMContentLoaded", () => {
    const tempValue = document.getElementById("tempValue");
    const increaseTempControl = document.getElementById("increaseTempControl");
    const decreaseTempControl = document.getElementById("decreaseTempControl");
    const landscape = document.getElementById("landscape");

    let temp = 80;
    tempValue.textContent = `${temp}°F`;

    // controls temperature text color
    const updateTemperatureColor = () => {
        if (temp >= 80) {
            tempValue.style.color = "red";
        } else if (temp >= 70) {
            tempValue.style.color = "orange";
        } else if (temp >= 60) {
            tempValue.style.color = "yellow";
        } else if (temp >= 50) {
            tempValue.style.color = "green";
        } else {
            tempValue.style.color = "teal";
        }
    };

    // controls weather garden landscape
    const updateLandscape = () => {
        if (temp >= 80) {
            landscape.textContent = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
        } else if (temp >= 70) {
            landscape.textContent = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";
        } else if (temp >= 60) {
            landscape.textContent = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
        } else {
            landscape.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
        }
    };

    updateTemperatureColor();
    updateLandscape();

    // controls temperature increase
    increaseTempControl.addEventListener("click", () => {
        temp += 1;
        tempValue.textContent = `${temp}°F`;
        updateTemperatureColor();
        updateLandscape();
    });

    // controls temperature decrease
    decreaseTempControl.addEventListener("click", () => {
        temp -= 1;
        tempValue.textContent = `${temp}°F`;
        updateTemperatureColor();
        updateLandscape();
    });
});


// weather album section
document.addEventListener("DOMContentLoaded", () => {
    const landscapeImg = document.getElementById("landscapeImg");
    const images = [
        './assets/weather-imgs/weather_1.png',
        './assets/weather-imgs/weather_2.jpg',
        './assets/weather-imgs/weather_3.png',
        './assets/weather-imgs/weather_4.jpg',
        './assets/weather-imgs/weather_5.jpg'
    ];
    let currentIndex = 0;

    function rotateImage() {
        currentIndex = (currentIndex + 1) % images.length;
        landscapeImg.style.backgroundImage = `url(${images[currentIndex]})`;
    }

    setInterval(rotateImage, 10000);
});
