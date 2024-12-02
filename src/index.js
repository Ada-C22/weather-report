const state = {
  clickCount: 100,
    // downClickCount: 100,
    // upClickCount: 100,
  clicked: false
}



const updateDownClickCount = () => {
    const downClickContainer = document.getElementById('tempValue');
    // state.downClickCount -= 1;
    state.clickCount -= 1;
    downClickContainer.textContent = state.clickCount;
    // downClickContainer.textContent = state.downClickCount;
}

const updateUpClickCount = () => {
  const upClickContainer = document.getElementById("tempValue");
  // state.upClickCount += 1;
  state.clickCount += 1;
  upClickContainer.textContent = state.clickCount;
  // upClickContainer.textContent = state.upClickCount;
  const temperature__section = document.getElementById("temp__title");
  if (clickCount > 99) {
    temperature__section.style.backgroundColor = "red";
  }

};

const registerEventHandlers = () => {
  const decreaseTemp = document.getElementById('decreaseTempControl')
  decreaseTemp.addEventListener("click", updateDownClickCount);

  const increaseTemp = document.getElementById('increaseTempControl')
  increaseTemp.addEventListener("click", updateUpClickCount);
};

document.addEventListener("DOMContentLoaded", registerEventHandlers);