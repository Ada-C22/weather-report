const axios = require('axios');

const state ={
  name: 'Seattle'
}

const getDisplayCityCoords = () =>{
  const city = state.name;
  return axios
          .get(`http://127.0.0.1:5000/location?q=${state.name}`) 
          .then((response=>{
            const lat = response[0]['lat'];
            const lon = response[0]['lon'];
            return [lat, lon]
          }))
}

const getDisplayCityTemp = (coordList) =>{
  return axios
    .get (`http://127.0.0.1:5000/weather?lat=${coordList[0]}&lon=-${coordList[1]}`)
    .then((response)=>{
      return response.ma
      in.temp
    })
}

const updateDisplayCityTemp = () =>{
  return getDisplayCityCoords()
    .then((coordList) => {
      currentTemp = getDisplayCityTemp(coordList);
      console.log(currentTemp);
      return currentTemp;
    })
}

updateDisplayCityTemp()