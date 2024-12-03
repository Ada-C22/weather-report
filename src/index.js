let temperature = 48;

const tempValue = document.getElementById("tempValue");
const increaseTempControl = document.getElementById("increaseTempControl");
const decreaseTempControl = document.getElementById("decreaseTempControl");
const landScape = document.getElementById("landscape");
const cityNameInput = document.getElementById("cityNameInput");
const cityNameReset = document.getElementById("cityNameReset");
const headerCityName = document.getElementById("headerCityName");
const currentTempButton = document.getElementById("currentTempButton");


const updateTemperature = () => {
    tempValue.textContent = `${temperature}F`;
    tempValue.style.color = getFontColor(temperature);
    landScape.textContent = getLandscape(temperature);
};

const getLandscape = (temp) => {
    if (temp <= 59) return "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
    if (temp <= 69) return "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
    if (temp <= 79) return "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";
    return "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
}

const getFontColor = (temp) => {
    if (temp <= 49) return "teal";
    if (temp <= 59) return "green";
    if (temp <= 69) return "yellow";
    if (temp <= 79) return "orange";
    return "red";
}

increaseTempControl.addEventListener("click", () => {
    temperature += 1;
    updateTemperature();
});

decreaseTempControl.addEventListener("click", () => {
    temperature -= 1;
    updateTemperature();
});

currentTempButton.addEventListener("click", () => {
    const city = headerCityName.textContent;

    axios.get('http://127.0.0.1:5000/location', {params:{"q": city}})
    .then((locationResponse) => { 
        const { lat, lon } = locationResponse.data;

        return axios.get('http://127.0.0.1:5000/weather', {params:{"lat": lat, "lon": lon}})
    })
    
});

// @bp.get("/location")
// def get_lat_lon():
//     loc_query = request.args.get("q")
//     if not loc_query:
//         return {"message": "must provide q parameter (location)"}, 400

//     response = requests.get(
//         "https://us1.locationiq.com/v1/search.php",
//         params={"q": loc_query, "key": location_key, "format": "json"}

// def get_weather():
//     lat_query = request.args.get("lat")
//     lon_query = request.args.get("lon")

//     if not lat_query or not lon_query:
//         return {"message": "must provide lat and lon parameters"}, 400

//     response = requests.get(
//         "https://api.openweathermap.org/data/2.5/weather",
//         params={"lat": lat_query, "lon": lon_query, "appid": weather_key}
//     )
//     return response.json(), 200


updateTemperature();

const updateCityName = (updateCity) => {
    headerCityName.textContent = updateCity;
}

cityNameInput.addEventListener("input", (event) => {
    updateCityName(event.target.value);
})

cityNameReset.addEventListener("click", () => {
    cityNameInput.value = '';
    updateCityName('Seattle');
}
)

