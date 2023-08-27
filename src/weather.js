function currentDate() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "THursday",
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
  celsiusTemp = response.data.main.temp;
  document.querySelector("#city").innerHTML = `${response.data.name}`;
  let tempElement = document.querySelector("#temp-today");
  tempElement.innerHTML = `${Math.round(celsiusTemp)}℃`;
  document.querySelector(
    "#description"
  ).innerHTML = `${response.data.weather[0].description}`;
  document.querySelector("#feelsLike").innerHTML = `${Math.round(
    response.data.main.feels_like
  )}℃`;
  document.querySelector("#humidity").innerHTML = `${Math.round(
    response.data.main.humidity
  )}%`;
  document.querySelector("#windy").innerHTML = `${Math.round(
    response.data.wind.speed
  )}m/s`;
}

function findCity(city) {
  let apiKey = "7d478f69e1b2f5d563653f13f5f91d76";
  let api_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
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
  let apiKey = "7d478f69e1b2f5d563653f13f5f91d76";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}
function currentLoc(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(displayPosition);
}

let todayDate = document.querySelector("#today-date");
todayDate.innerHTML = currentDate();

let city = document.querySelector(".search");
city.addEventListener("submit", changeCity);

let currentLocation = document.querySelector("#current-loc");
currentLocation.addEventListener("click", currentLoc);

findCity("Bedworth Park");

let celsiusTemp = null;

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

let celsius = document.querySelector("#to-celsius");
celsius.addEventListener("click", toCelsius);

let fahrenheit = document.querySelector("#to-fahrenheit");
fahrenheit.addEventListener("click", toFahrenheit);
