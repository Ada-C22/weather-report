const increaseTempButton = document.getElementById('increaseTempControl');

const decreaseTempButton = document.getElementById('decreaseTempControl');

const currentTemp = document.getElementById('tempValue');

let temperature = 70;

function updateDisplay() {
    const tempDisplay = document.getElementById('tempValue');
    tempDisplay.textContent = `${temperature}°F`;
};

increaseTempButton.addEventListener( 'click',() => { 
    currentTemp++;
    updateDisplay();
});
decreaseTempButton.addEventListener( 'click',() => { 
    currentTemp--;
    updateDisplay();
});

updateDisplay();


// document.addEventListener('DOMContentLoaded', registerEventHandlers);
