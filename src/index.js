'use strict';

const state = {
  tempCount: 70,
};

const updateDecreaseTempCount = () => {
  const tempValue = document.getElementById('tempValue');
  --state.tempCount;
  tempValue.textContent = state.tempCount;

  updateTempBackgroundColor();
  updateLandscape();
};

const updateIncreaseTempCount = () => {
  const tempValue = document.getElementById('tempValue');
  ++state.tempCount;
  tempValue.textContent = state.tempCount;
  const landscape = document.getElementById('landscape');

  updateTempBackgroundColor();
  updateLandscape();
};

const updateTempBackgroundColor = () => {
  const temperature__section = document.querySelector('.temperature__section');

  switch (true) {
    case state.tempCount >= 80:
      temperature__section.style.backgroundColor = 'red';
      break;
    case state.tempCount >= 70:
      temperature__section.style.backgroundColor = 'orange';
      break;
    case state.tempCount >= 60:
      temperature__section.style.backgroundColor = 'yellow';
      break;
    case state.tempCount >= 50:
      temperature__section.style.backgroundColor = 'green';
      break;
    case state.tempCount < 50:
      temperature__section.style.backgroundColor = 'teal';
      break;
  }
};

const updateLandscape = () => {
  const newLandscape = document.createElement('div');
  const landscapeContainer = document.getElementById('landscape');
  landscapeContainer.textContent =  ''
  
    switch (true) {
      case state.tempCount >= 80:
        newLandscape.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
        break;
      case state.tempCount >= 70:
        newLandscape.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
        break;
      case state.tempCount >= 60:
        newLandscape.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
        break;
      case state.tempCount < 60:
        newLandscape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
        break;
    }

    landscapeContainer.appendChild(newLandscape);

}

const registerEventHandlers = () => {
  // loadControls();
  const decreaseTemp = document.getElementById('decreaseTempControl');
  const increaseTemp = document.getElementById('increaseTempControl');
  decreaseTemp.addEventListener('click', updateDecreaseTempCount);
  increaseTemp.addEventListener('click', updateIncreaseTempCount);

  updateTempBackgroundColor();
  updateLandscape();
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
