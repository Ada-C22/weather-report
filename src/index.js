const increaseTempButton = document.getElementById('increaseTempControl');

const decreaseTempButton = document.getElementById('decreaseTempControl');

let temperature = 70;

function updateDisplay() {
    const tempDisplay = document.getElementById('tempValue');
    tempDisplay.textContent = `${temperature}°F`;
    if (temperature >= 80) {
        tempDisplay.style.backgroundColor = "red";
    }
    else if (temperature >= 70 && temperature < 80) {
        tempDisplay.style.backgroundColor = "orange";
    }
    else if (temperature >= 60 && temperature < 70) {
        tempDisplay.style.backgroundColor = "yellow";
    }
    else if (temperature >= 50 && temperature < 60) {
        tempDisplay.style.backgroundColor = "green";
    }
    else if (temperature <= 49) {
        tempDisplay.style.backgroundColor = "teal";
    }
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
