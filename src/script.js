// Time
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
// Day and Days
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Mon", "Tues", "Weds", "Thur", "Frid", "Sat", "Sun"];

  return days[day];
}

// Location
function searchLocation(position) {
  let apiKey = "c119ffef35b7245a5e03b6e5724ae961";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentLocationButton = document.querySelector("#location-dot1");
currentLocationButton.addEventListener("click", getCurrentLocation);

//Sunrise and Sunset
function sunTimes(response) {
  let sunrise = document.querySelector("#sunrise-time");
  let sunset = document.querySelector("#sunset-time");

  sunset.innerHTML = formatDate(response.data.sys.sunset * 1000);
  sunrise.innerHTML = formatDate(response.data.sys.sunrise * 1000);
}

//World Clock
setInterval(function () {
  //Seattle
  let maldivesElmt = document.querySelector("#maldives");
  let maldivesDateElement = maldivesElmt.querySelector(".date");
  let maldivesTimeElement = maldivesElmt.querySelector(".time");
  let maldivesTime = moment().tz("Indian/Maldives");

  maldivesDateElement.innerHTML = maldivesTime.format("ll");
  maldivesTimeElement.innerHTML = maldivesTime.format(
    "h:mm:ss [<small>]A[</small>]"
  );
}, 1000);
setInterval(function () {
  //New York
  let nYElement = document.querySelector("#new_york");
  let nYDateElement = nYElement.querySelector(".date");
  let nYTimeElement = nYElement.querySelector(".time");
  let nYTime = moment().tz("America/New_York");

  nYDateElement.innerHTML = nYTime.format("ll");
  nYTimeElement.innerHTML = nYTime.format("h:mm:ss [<small>]A[</small>]");
}, 1000);
setInterval(function () {
  //Madrid
  let madridElement = document.querySelector("#madrid");
  let madridDateElement = madridElement.querySelector(".date");
  let madridTimeElement = madridElement.querySelector(".time");
  let madridTime = moment().tz("Europe/Madrid");

  madridDateElement.innerHTML = madridTime.format("ll");
  madridTimeElement.innerHTML = madridTime.format(
    "h:mm:ss [<small>]A[</small>]"
  );
}, 1000);
setInterval(function () {
  //Sydney
  let sydneyElement = document.querySelector("#sydney");
  let sydneyDateElement = sydneyElement.querySelector(".date");
  let sydneyTimeElement = sydneyElement.querySelector(".time");
  let sydneyTime = moment().tz("Australia/Sydney");

  sydneyDateElement.innerHTML = sydneyTime.format("ll");
  sydneyTimeElement.innerHTML = sydneyTime.format(
    "h:mm:ss [<small>]A[</small>]"
  );
}, 1000);

//Multiple location's clocks
function updateZone(event) {
  let cityTimeZone = event.target.value;
  let cityTime = moment().tz(cityTimeZone);
  let citiesElement = document.querySelector("#cities");
  citiesElement.innerHTML = cityTimeZone;
  citiesElement = `
  <div class="city">
      <div>
        <h3>${cityTimeZone}</h3>
        <div class="date">${cityTime.format("ll")}</div>
      </div>
        <div class="time">${cityTime.format("h:mm:ss")}<small>${cityTime.format(
    "A"
  )}</small></div>
  `;
}
let citiesSelect = document.querySelector("#city-2");
citiesSelect.addEventListener("change", updateZone);

//forecast 10 days
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHtml = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHtml =
        forecastHtml +
        `
        <div class="col-2">
          <div class="forecast-time">
            <div class="weather-forecast-date">${formatDay(
              forecastDay.dt
            )}</div>
            <img src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
            alt=""
            width="42"
          />
          </div>
            
          <div class="forecast-temperature">
            <span class="forecast-temperature-max">
              ${Math.round(forecastDay.temp.max)}°
            </span>
              |
            <span class="forecast-temperature-min">
                ${Math.round(forecastDay.temp.min)}°
            </span>
          </div>
        </div>
  `;
    }
  });

  forecastHtml = forecastHtml + `</div>`;
  forecastElement.innerHTML = forecastHtml;
}

function specificForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "c119ffef35b7245a5e03b6e5724ae961";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

//Api
function displayWeatherCondition(response) {
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description");
  let cityElement = document.querySelector("#city");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date_time");
  let icon = response.data.weather[0].icon;

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  descriptionElement.innerHTML = response.data.weather[0].description;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  document.body.style.backgroundImage = `url(\`https://source.unsplash.com/1600x900/?${cityElement}\`)`;
  document.querySelector("#icon").src =
    "https://openweathermap.org/img/wn/" + icon + ".png";

  sunTimes(response);

  specificForecast(response.data.coord);
}

document
  .querySelector("#search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

// Search bar
function search(city) {
  let apiKey = "c119ffef35b7245a5e03b6e5724ae961";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-input");
  search(cityInputElement.value);
}

// Change of F to C

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemp = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemp);
}
function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
//form
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

//fah
let fahrenheitLink = document.querySelector("#Feh");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
//Cel
let celsiusLink = document.querySelector("#Cel");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let celsiusTemperature = null;
//City
search("San Francisco");
