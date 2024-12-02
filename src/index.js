const increaseTempButton = document.getElementById('increaseTempControl');

const decreaseTempButton = document.getElementById('decreaseTempControl');

let temperature = 70;

function updateDisplay() {
    const tempDisplay = document.getElementById('tempValue');
    tempDisplay.textContent = `${temperature}°F`;
};

increaseTempButton.addEventListener( 'click',() => { 
    temperature++;
    updateDisplay();
});
decreaseTempButton.addEventListener( 'click',() => { 
    temperature--;
    updateDisplay();
});

updateDisplay();


// document.addEventListener('DOMContentLoaded', registerEventHandlers);
