const increaseTempButton = document.getElementById('increaseTempControl');

const decreaseTempButton = document.getElementById('decreaseTempControl');

landscape.style.fontFamily = "monospace";
landscape.style.whiteSpace = "pre";

let temperature = 70;

function updateDisplay() {
    const tempDisplay = document.getElementById('tempValue');
    tempDisplay.textContent = `${temperature}°F`;
    if (temperature >= 80) {
        tempDisplay.style.backgroundColor = "red";
      
        landscape.textContent = "🌡️ BURNING HOT 🌡️\n" +
        "  ╭──────╮   \n" +
        " ░│ ☀️ ☀️ │░  \n" +
        "░░╰──────╯░░\n";
        }
    else if (temperature >= 70 && temperature < 80) {
        tempDisplay.style.backgroundColor = "orange";
        landscape.textContent = "⛵ SAILING DAY ⛵\n" +
        "   ⛵ ⛵      \n" +
        " ∿∿∿∿∿∿     \n" +
        "∿∿∿∿∿∿∿∿∿\n";
    }
    else if (temperature >= 60 && temperature < 70) {
        tempDisplay.style.backgroundColor = "yellow";
        landscape.textContent = "⛅ IDEAL DAY ⛅\n" +
        "   ╭∩∩∩╮    \n" +
        " ╭∩∩∩∩∩╮   \n" +
        "∽∽∽∽∽∽∽∽∽\n";
    }
    else if (temperature >= 50 && temperature < 60) {
        tempDisplay.style.backgroundColor = "green";
        landscape.textContent = "🍂 CRISP DAY 🍁\n" +
        "  ≈╮__╭≈    \n" +
        "  ⋯╭━━╮⋯   \n" +
        " ⋯⋯○⋯⋯⋯   \n" +
        "⋯⋯⋯⋯⋯⋯⋯\n";
    }
    else if (temperature <= 49) {
        tempDisplay.style.backgroundColor = "teal";
        landscape.textContent = "🌨️ SNOW DAY ⛄\n" +
        "  ╭❅╮╭❅╮   \n" +
        " ╭❅╮╭❅╮╭❅╮  \n" +
        "▓▓▓▓▓▓▓▓▓\n";
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
