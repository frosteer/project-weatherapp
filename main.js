//Declaration
let formInput = document.querySelector("#formInput");
let formButton = document.querySelector("#formButton");
let mainDate = document.querySelector(".date");
let mainCityName = document.querySelector(".city-name");
let mainCityWeatherText = document.querySelector(".weather-text");
let mainCityWeatherIMG = document.querySelector(".weatherIMG");
let mainCityTemp = document.querySelector(".temperature");
let humidity = document.querySelector(".humidity");
let minTemp = document.querySelector(".min-temp");
let maxTemp = document.querySelector(".max-temp");
let windSpeed = document.querySelector(".wind-speed");
let mainCityWeatherMain




//Eventlistener
formButton.addEventListener('click', getInputValue)
window.addEventListener("load", getInputValue)



//Functions
//Create Custom Date Format
function displayDate() {
    //display date
    const currentDate = new Date();
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day = weekday[currentDate.getDay()];
    let dateText = currentDate.toLocaleDateString();
    let hour = currentDate.getHours();
    let ampm = hour >= 12 ? 'pm' : 'am';
    hour = hour >= 12 ? hour - 12 : hour;
    let minute = currentDate.getMinutes();
    minute = minute <= 9 ? "0" + minute : minute;
    
    let dateDisplay = `${day} ${dateText}, ${hour}:${minute}${ampm}`
    return dateDisplay;
}

//Get api data
//Display api data
function getInputValue(event) {
    //declare variable
    let cityName
    
    //get form input
    let formInputValue = formInput.value;
    formInput.value = "";
    event.preventDefault();

    //form API
    let searchAPI = `https://api.openweathermap.org/data/2.5/weather?q=${formInputValue}&appid=7bc4f8eb412b1a1f14cd332743ee22de`
    
    //convert api JSON to data
    async function getData() {
        const response = await fetch(searchAPI);
        const data = await response.json();
        console.log(data)
        return data;
    }
    

    //display API data to browser
    async function displayData() {
        const fullData = await getData()
        
        //display city name
        //display city not found if api does not have the data
        let error = document.querySelector(".error");
        if (fullData.name == undefined) {
            error.innerText = "City Not Found";
            return;
        } else {
            error.innerText = "";
            mainCityName.innerText = fullData.name;
        }

        mainDate.innerText = displayDate();
        
        //display weather description
        let weatherDescription = fullData.weather[0].description;
        mainCityWeatherText.innerText =  weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);
        
        //display temperature
        mainCityTemp.innerText = (fullData.main.temp - 273.15).toFixed(1) + '°C' ;

        //This main weather string decide which icon to be displayed
        mainCityWeatherMain = fullData.weather[0].main;
                
        //Choose which weather icon to display according to the main weather
        switch(mainCityWeatherMain) {
            case "Thunderstorm":
                mainCityWeatherIMG.src = "http://openweathermap.org/img/wn/11d@2x.png"
                break;
            case "Drizzle":
                mainCityWeatherIMG.src = "http://openweathermap.org/img/wn/09d@2x.png"
                break;
            case "Rain":
                mainCityWeatherIMG.src = "http://openweathermap.org/img/wn/10d@2x.png"
                break;
            case "Snow":
                mainCityWeatherIMG.src = "http://openweathermap.org/img/wn/13d@2x.png"
                break;
            case "Clear":
                mainCityWeatherIMG.src = "http://openweathermap.org/img/wn/01d@2x.png"
                break;
            case "Clouds":
                mainCityWeatherIMG.src = "http://openweathermap.org/img/wn/02d@2x.png"
                break;
            default:
                mainCityWeatherIMG.src = "http://openweathermap.org/img/wn/50d@2x.png"
          }
        
        humidity.innerText = `Humidity: ${fullData.main.humidity}%`;
        minTemp.innerText = `Min Temperature: ${(fullData.main.temp_min - 273.15).toFixed(1)} °C`;
        maxTemp.innerText = `Max Temperature: ${(fullData.main.temp_max - 273.15).toFixed(1)} °C`;
        windSpeed.innerText = `Wind Speed: ${fullData.wind.speed} meter/sec`;

        
    }
    displayData();
}




console.log("ok")
