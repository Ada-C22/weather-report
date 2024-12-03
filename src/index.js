const state = {
    city: 'Seattle',
    temperature: 80
}

const temperatureIncrease= () => {
    state.temperature += 1
    const tempValue = document.getElementById('tempValue')
    tempValue.textContent = state.temperature
}

const temperatureDecrease = () => {
    state.temperature -= 1
    const tempValue = document.getElementById('tempValue')
    tempValue.textContent = state.temperature 
}

// document.getElementById(tempValue).className ""

const registerEventHandlers = () => {
    //whatever function is updating UI
    const increaseButton = document.getElementById('increaseButton');
    increaseButton.addEventListener("click",temperatureIncrease);

    const decreaseButton = document.getElementById('decreaseButton');
    decreaseButton.addEventListener("click",temperatureDecrease);
};
document.addEventListener("DOMContentLoaded", registerEventHandlers);



// function temperatureDecrease(){

// }
// const increaseButton = () => {
//     const newIncreaseButton = document.createElement("span")
// }

//increase and decrease button by 1 and should change color 

//background of .garden__section needs to change color 

// add number between buttons 

// id landscape add emojis 

//css span a class document.getelement.id temp value temperature.classname 