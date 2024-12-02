let currentTemperature = 60;

const tempValue = document.getElementById('tempValue');
const increaseTempControl = document.getElementById('increaseTempControl');
const decreaseTempControl = document.getElementById('decreaseTempControl');
const landScrape = document.getElementById('landscape');
const updateTemperature = () => {
    tempValue.textContent = `${currentTemperature}°F`;

    if (currentTemperature >= 80) {
        tempValue.style.color = 'red';
        // tempValue.style.backgroundColor = 'light red';
        landScrape.textContent = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
    } else if (currentTemperature >= 70) {
        tempValue.style.color = 'orange';
        // tempValue.style.backgroundColor = 'light orange';
        landScrape.textContent = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";
    } else if (currentTemperature >= 60) {
        tempValue.style.color = 'yellow';
        // tempValue.style.backgroundColor = 'light pink';
        landScrape.textContent = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
    } else if (currentTemperature >= 50) {
        tempValue.style.color = 'green';
        // tempValue.style.backgroundColor = 'light green';
        landScrape.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
    } else if (currentTemperature >= 40) {
        tempValue.style.color = 'teal';
        // tempValue.style.backgroundColor = 'light teal';
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