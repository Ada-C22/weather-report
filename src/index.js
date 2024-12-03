const increaseTempControl = document.getElementById("increaseTempControl");
const tempValue = document.getElementById("tempValue");
const decreaseTempControl = document.getElementById("decreaseTempControl");

let temperatureF = 60;

function temperatureDisplay() {
    tempValue.textContent = `${temperatureF}`;
    temperatureColor();
}

function temperatureColor () {
    let color;

    if (temperatureF <= 49) {
        color = 'teal';
    } else if (temperatureF <= 59) {
        color = 'green';
    } else if (temperatureF <= 69) {
        color = 'yellow';
    } else if (temperatureF <= 79) {
        color = 'orange';
    } else if (temperatureF >= 80) {
        color = 'red';
    }
    
    tempValue.style.color = color;    
}

increaseTempControl.addEventListener('click', () =>{
    temperatureF++;
    temperatureDisplay();
});

decreaseTempControl.addEventListener('click', () => {
    temperatureF--;
    temperatureDisplay();
});