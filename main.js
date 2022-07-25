//Declaration
let formInput = document.querySelector("#formInput");
let formButton = document.querySelector("#formButton");
let date = document.querySelector(".date");
let mainCityName = document.querySelector(".city-name");



//Eventlistener
formButton.addEventListener('click', getInputValue)



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
    let dateDisplay = `${day} ${dateText}, ${hour}:${minute}${ampm}`
    return dateDisplay;
}

//Get api data
function getInputValue(event) {
    //declare variable
    let cityName

    //get form input
    let formInputValue = formInput.value;
    event.preventDefault();

    //form API
    let searchAPI = `https://api.openweathermap.org/data/2.5/weather?q=${formInputValue}&appid=7bc4f8eb412b1a1f14cd332743ee22de`
    
    //convert api JSON to data
    async function getData() {
        const response = await fetch(searchAPI);
        const data = await response.json();
        return data;
        // cityName = data.name;
        // cityTemp = data.main.temp;
        // cityWeatherMain = data.weather.main
        // cityWeatherDescription = data.weather.description
        
    }
    getData().then(data => {
        cityName = data.name;
        console.log(cityName);
    })
        
    
    console.log(cityName);

    
    

}

