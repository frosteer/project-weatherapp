//Declaration
let formInput = document.querySelector("#formInput");
let formButton = document.querySelector("#formButton");
let mainDate = document.querySelector(".date");
let mainCityName = document.querySelector(".city-name");
let mainCityWeatherText = document.querySelector(".weather-text");
let mainCityWeatherIMG = document.querySelector(".weatherIMG");
let mainCityTemp = document.querySelector(".temperature");
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
    
    let minute = currentDate.getMinutes();
    minute = minute <= 9 ? "0" + minute : minute;
    let ampm = hour >= 12 ? 'pm' : 'am';
    let dateDisplay = `${day} ${dateText}, ${hour-12}:${minute}${ampm}`
    return dateDisplay;
}

//Get api data
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
        // cityName = data.name;
        // cityTemp = data.main.temp;
        // cityWeatherMain = data.weather.main
        // cityWeatherDescription = data.weather.description
        
    }
    getData();

    async function displayData() {
        const fullData = await getData()
        
        let error = document.querySelector(".error");
        if (fullData.name == undefined) {
            error.innerText = "City Not Found";
            return;
        } else {
            error.innerText = "";
            mainCityName.innerText = fullData.name;
        }

        mainDate.innerText = displayDate();
        
        let weatherDescription = fullData.weather[0].description;
        mainCityWeatherText.innerText =  weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);

        mainCityWeatherMain = fullData.weather[0].main; //this decide weatherIMG
                
        mainCityTemp.innerText = (fullData.main.temp - 273.15).toFixed(1) + '°C' ;
              
        

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


         

    }

    displayData();
    
}




console.log("ok")
