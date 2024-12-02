let currentTemperature = 60;

const tempValue = document.getElementById('tempValue');
const increaseTempControl = document.getElementById('increaseTempControl');
const decreaseTempControl = document.getElementById('decreaseTempControl');
const updateTemperature = () => {
    tempValue.textContent = `${currentTemperature}°F`;
}

increaseTempControl.addEventListener('click', () => {
    currentTemperature += 1;
    updateTemperature();
});

decreaseTempControl.addEventListener('click', () => {
    currentTemperature -= 1;
    updateTemperature();
});