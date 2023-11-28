function currentDate() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Sartuday",
  ];
  let day = days[now.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let month = months[now.getMonth()];

  let todayDay = document.querySelector("#today-day");
  todayDay.innerHTML = `${day}`;

  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  return `${now.getDate()} ${month} ${now.getFullYear()}, ${hour}:${minute}`;
}

function displayTemp(response) {
  celsiusTemp = response.data.temperature.current;

  document.querySelector("#country").innerHTML = `-${response.data.country}`;

  document.querySelector("#city").innerHTML = `${response.data.city}`;

  let tempElement = document.querySelector("#temp-today");
  tempElement.innerHTML = `${Math.round(celsiusTemp)}℃`;

  document.querySelector(
    "#today-description"
  ).innerHTML = `${response.data.condition.description}`;

 

  document.querySelector("#feelsLike").innerHTML = `${Math.round(
    response.data.temperature.feels_like
  )}℃`;

  document.querySelector("#humidity").innerHTML = `${Math.round(
    response.data.temperature.humidity
  )}%`;

  document.querySelector("#windy").innerHTML = `${Math.round(
    response.data.wind.speed
  )}km/h`;

  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
    );

    getForecast(response.data.coordinates);
}

function formatForecast(timeStamp){

  let date = new Date(timeStamp*1000);
  let day = date.getDay();
  let days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  return days[day];
}

function displayForecast(response){
  let forecast = response.data.daily;
  let forecastHTML = `<div class="row justify-content-around">`;
  
  
  forecast.forEach(function(forecastDay, index){
    
    if (index > 0 && index < 6){
    
    forecastHTML += `
  <div class="col-md next-day">
    <strong>${formatForecast(forecastDay.time)}</strong> <br />
      ${forecastDay.condition.description}
    <p>
      <span class="next-Temp">${Math.round(
        forecastDay.temperature.day
      )}℃</span><br />
      <span id="max-min">${Math.round(
        forecastDay.temperature.minimum
      )}℃ - ${Math.round(forecastDay.temperature.maximum)}℃</span> <br />
      <img
        src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
          forecastDay.condition.icon
        }.png"
        alt="weather-icon"
      />
    </p>
  </div>
  `;} 
  });
 
  forecastHTML += `</div>`;

  let forecastElement = document.querySelector("#forecast").innerHTML = forecastHTML;

}

function getForecast(coordinates){
 
   let apiKey = "83c650a9t1f4do3785ebe7dd298019a6";
   let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}`;
   
   console.log(apiUrl);
   axios.get(apiUrl).then(displayForecast);

}

function findCity(city) {

  let apiKey = "83c650a9t1f4do3785ebe7dd298019a6";
  let api_url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(api_url).then(displayTemp);

}

function changeCity(event) {
  event.preventDefault();

  let city = document.querySelector("#search").value;
  findCity(city);
}

function displayPosition(position) {
  let latitude = `${position.coords.latitude}`;
  let longitude = `${position.coords.longitude}`;
  let apiKey = "83c650a9t1f4do3785ebe7dd298019a6";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}`;
  axios.get(apiUrl).then(displayTemp);
}
function currentLoc(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(displayPosition);
}


function toCelsius(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#temp-today");
  temperatureElement.innerHTML = `${Math.round(celsiusTemp)}℃`;
}

function toFahrenheit(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#temp-today");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = `${Math.round(fahrenheitTemp)}℉`;
}

let todayDate = document.querySelector("#today-date");
todayDate.innerHTML = currentDate();

let city = document.querySelector(".search");
city.addEventListener("submit", changeCity);

let currentLocation = document.querySelector("#current-loc");
currentLocation.addEventListener("click", currentLoc);


findCity("Bedworth Park");

let celsiusTemp = null;

let celsius = document.querySelector("#to-celsius");
celsius.addEventListener("click", toCelsius);

let fahrenheit = document.querySelector("#to-fahrenheit");
fahrenheit.addEventListener("click", toFahrenheit);
