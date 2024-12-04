const state = {
  currentTemp: 72,
};

// Function to update the temperature display and apply color changes
const updateTemperatureDisplay = () => {
  const tempValueElement = document.getElementById("tempValue");
  const landscapeElement = document.getElementById("landscape");
  tempValueElement.textContent = `${state.currentTemp} °F`;

  if (state.currentTemp >= 80) {
    tempValueElement.style.color = "red";
    landscapeElement.textContent = "🌵  🐍 🦂 🌵🌵  🐍 🏜 🦂";
  } else if (state.currentTemp >= 70) {
    tempValueElement.style.color = "orange";
    landscapeElement.textContent = "🌸🌿🌼  🌷🌻🌿 ☘️🌱 🌻🌷";
  } else if (state.currentTemp >= 60) {
    tempValueElement.style.color = "salmon";
    landscapeElement.textContent = "🌾🌾 🍃 🪨  🛤 🌾🌾🌾 🍃";
  } else if (state.currentTemp >= 50) {
    tempValueElement.style.color = "green";
    landscapeElement.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
  } else if (state.currentTemp <= 49) {
    tempValueElement.style.color = "blue";
    landscapeElement.textContent = "⛄️ ⛄️ ⛄️";
  }
};

// Function to update the temperature Color and Landscape

// const designTemp = () => {
//   const tempValueElement = document.getElementById("tempValue");
//   const landscape = document.getElementById("landscape");
//   tempValueElement.textContent = `${state.currentTemp} °F`;

//   if (state.currentTemp >= 80) {
//     tempValueElement.style.color = "red";
//   } else if (state.currentTemp >= 70) {
//     tempValueElement.style.color = "orange";
//   } else if (state.currentTemp >= 70) {
//     tempValueElement.style.color = "orange";
//   }

// };

// Event handler to increase temperature
const increaseTemp = () => {
  state.currentTemp += 1;
  updateTemperatureDisplay();
};

// Event handler to decrease temperature
const decreaseTemp = () => {
  state.currentTemp -= 1;
  updateTemperatureDisplay();
};

// Register event handlers for temperature controls
const registerEventHandlers = () => {
  const warmUpButton = document.getElementById("increaseTempControl");
  const coolDownButton = document.getElementById("decreaseTempControl");

  warmUpButton.addEventListener("click", increaseTemp);
  coolDownButton.addEventListener("click", decreaseTemp);

  // Initialize the temperature display
  updateTemperatureDisplay();
};

// Initialize the application when DOM content is loaded
document.addEventListener("DOMContentLoaded", registerEventHandlers);
