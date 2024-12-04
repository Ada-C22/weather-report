
const COLORS = ["green","red","orange","yellow","teal"]
const changeColor = (temperature) =>{
    const element = document.getElementById("temperatureSection");
    if(temperature >= 80){
        element.classList.forEach((className) => COLORS.includes(className) ? element.classList.remove(className) : className )
        element.classList.add('red');
        landscape.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
    }
    else if(temperature >= 70 && temperature <=79){
        element.classList.forEach((className) => COLORS.includes(className) ? element.classList.remove(className) : className )
        element.classList.add('orange');
        landscape.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
    }
    else if(temperature >= 60 && temperature <=69){
        element.classList.forEach((className) => COLORS.includes(className) ? element.classList.remove(className) : className )
        element.classList.add('yellow');
        landscape.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
    }
    else if(temperature >= 50 && temperature <=59){
        element.classList.forEach((className) => COLORS.includes(className) ? element.classList.remove(className) : className )
        element.classList.add('green');
        landscape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
    }
    else {
        element.classList.forEach((className) => COLORS.includes(className) ? element.classList.remove(className) : className )
        element.classList.add('teal');
        landscape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
    }
}


const increaseTemp = () =>{
    value = parseInt(temp.textContent) || 0;
    changeColor(value)
    temp.innerText = (value + 1);
    
}

const decreaseTemp = () => {
    value = parseInt(temp.textContent) || 0;
    changeColor(value)
    temp.innerText = (value - 1);
}

const changeSky = () => {
    const sky = document.getElementById("sky");
    gardenContent.classList.remove('sunny', 'cloudy', 'rainy', 'snowy');
    switch (skySelect.value) {
        case "sunny":
            sky.textContent = "☁️ ☁️ ☁️ ☀️ ☁️ ☁️";
            gardenContent.classList.add('sunny');
            break;
        case "cloudy":
            sky.textContent = "☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️";
            gardenContent.classList.add('cloudy');
            break;
        case "rainy":
            sky.textContent = "🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧";
            gardenContent.classList.add('rainy');
            break;
        case "snowy":
            sky.textContent = "🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨";
            gardenContent.classList.add('snowy');
            break;
    }
}

const resetCityName = () => {
    document.getElementById("cityNameInput").value = '';
    headerCityName.textContent = defaultCity;
}

const getTemp = () => {
    const cityName = cityTitle.textContent.trim() || defaultCity;
    axios
    .get('http://127.0.0.1:5000/location', {params: {q: cityName}})
    .then((response) => {
        console.log(
            'The data given back by the API response is:',
            response.data);
        axios.get('http://127.0.0.1:5000/weather',
            {params:{
                lat: response.data[0].lat,
                lon: response.data[0].lon
            }}
        )
        .then((result) => {
            const tempK = result.data.main.temp
            const tempF = Math.round((tempK - 273.15) * 9/5 + 32);
            console.log('Result #2: ', tempF)
            changeColor(tempF)
            temp.innerText = tempF;
        })
        .catch((error) => {
            console.log(
                'The error for #2 is:',
                error.response || error.message
            );
        })
    })
    .catch((error) => {
        console.log(
            'The error given back by the API response is:',
            error.response || error.message
        );
    });    
};

const changeCityName = (event) =>{
    const inputValue = event.currentTarget.value;
    const cityTitle = document.getElementById("headerCityName");
    cityTitle.textContent = inputValue;

}

const temp = document.getElementById("tempValue");
const increment = document.getElementById("increaseTempControl");
const decrement = document.getElementById("decreaseTempControl");
const landscape = document.getElementById('landscape');
const skySelect = document.getElementById("skySelect");
const resetBtn = document.getElementById("cityNameReset");
const currentTempButton = document.getElementById("currentTempButton");
const cityTitle = document.getElementById("headerCityName");
const cityInput= document.getElementById("cityNameInput");

increment.addEventListener("click", increaseTemp);
decrement.addEventListener("click",decreaseTemp);
skySelect.addEventListener("change", changeSky);
resetBtn.addEventListener("click", resetCityName);
currentTempButton.addEventListener("click",getTemp);
cityInput.addEventListener("input", changeCityName);

const defaultCity = "Seattle";
cityTitle.textContent = defaultCity;


