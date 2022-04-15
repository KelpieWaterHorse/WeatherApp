// home page

const itemName = document.getElementById("lbl-item-name");

const addItemButton = document.getElementById("btn-add");

const serchcity = document.getElementById("btn-find");
const currentWeatherText = document.getElementById("lbl-currentWeahter");
const currentAirQuailty = document.getElementById("lbl-currentAir");
const cityname = document.getElementById('lbl-head');


const shoppingList = document.getElementById("fav-output");

//current Weather using json, my key, = location,  
const currentWeather = "http://api.weatherapi.com/v1/current.json?key=d4d58df73132404ab6e190405220204&q=";
const longForecastlink ="http://api.weatherapi.com/v1/forecast.json?key=d4d58df73132404ab6e190405220204&q=";

//long forcast

const longCityName = document.getElementById("longForcasteTitle");
const longCurrentDay = document.getElementById("Forecast-current-day");
const longCurrentWeather = document.getElementById("Forecast-Current-Weather");
const longCurrentTemp = document.getElementById("Forecast-Current-Temp");


const longDay2 = document.getElementById("Forecast-day2");
const longWeather2 = document.getElementById("Forecast-Weather-day2");
const longTemp2 = document.getElementById("Forecast-Temp-day2");


const longDay3 = document.getElementById("Forecast-day3");
const longWeather3 = document.getElementById("Forecast-Weather-day3");
const longTemp3 = document.getElementById("Forecast-Temp-day3");


//-------------Current Weather------------------//


//temp_c for temperature in celsius 
//wind_mph for wind
//condition:text  current Weather
//condition:icon  current weather icon

//---City to find weather for
//an empty string to place the city
let city = "";

//if stament to determin which city to start with 
//if nothing in the localStorage use Aberdeen
if (localStorage.length === 0) {
  city = "Aberdeen";
  //else use the first item in the local Storage 
} else {
  city = localStorage.getItem("city0");
  //use function to find the first item
  //setFavourites();
}

getDetails(city)

    // Add current weather
    function getDetails(city){
      //buil url
      const cityWeather = currentWeather + city +"&aqi=yes"
        //API json object from Weather API
        fetch(cityWeather).then(getJson).then(updateDisplay).catch(reportError);
      }
      
      function updateDisplay(jsonObj){

        //serchcity.textContent = jsonObj.location.name;
        cityname.textContent = jsonObj.location.name;
        currentWeatherText.textContent = jsonObj.current.condition.text;
        currentAirQuailty.textContent = 'Defra Index: ' + jsonObj.current.air_qulity["gb-defra-index"];
     
        //makeCurrentWeather(currentWeatherObject);
      }

      function getJson(aResponse){
        return aResponse.json();
      }
      
      function reportError(anError){
        console.log(anError);
      }

      serchcity.addEventListener('click', findCityWeather);

      function findCityWeather() {
        //code to change what city is 
        city = serchcity.value;
        getDetails(city);
    }
    

//----Faviortes list----//

addItemButton.addEventListener('click', addItemToList
);



function addItemToList(){

    let output =`${itemName.value}`;

    console.log(output);

    const newItem = document.createElement('ion-item');

    newItem.textContent = output; 

    saveToLocalStorage
    
    

    shoppingList.appendChild(newItem);

    clearItem();
}

function clearItem(){
    itemName.value = "";
}

function saveToLocalStorage(){
    localStorage.setItem('localTextInput', itemName.textContent);
    console.log("saved to local storage", itemName.textContent);
}


//--------------Long Forecast-----------------//

function longForecast(){
  const cityWeather = longForecastlink + city + "&days=4&aqi=yes&alerts=no";
  fetch(cityWeather).then(getJson).then(updateLongDisplay).catch(reportError);
}

function updateLongForecast(jsonObj) {

// day 1
longCityName.textContent = jsonObj.location.name;
longCurrentDay.textContent = jsonObj.current["last_updated"];
longCurrentWeather.textContent = jsonObj.current.condition.text;
longCurrentTemp.textContent = jsonObj.current["temp_c"];
// day 2
longDay2.textContent = jsonObj.forecast.forecastday[1].hour[12].time;
longWeather2.textContent = jsonObj.forecast.forecastday[1].hour[12].condition.text;
longTemp2.textContent = jsonObj.forecast.forecastday[1].hour[12]["temp_c"];

// day 3
longDay3.textContent = jsonObj.forecast.forecastday[2].hour[12].time;
longWeather3.textContent = jsonObj.forecast.forecastday[2].hour[12].condition.text;
longTemp3.textContent = jsonObj.forecast.forecastday[2].hour[12]["temp_c"];
}