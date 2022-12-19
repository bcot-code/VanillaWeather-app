// Location
function weather(response) {
  console.log();
  let temperature = Math.round(response.data.main.temp);

  let location = document.querySelector("#city");
  location.innerHTML = `${temperature}.`;
}
function showPosition(position) {
  let apiKey = "b9ba0314a93083136d968577c718e31d";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}`;
  axios.get(apiUrl).then(weather);
}
navigator.geolocation.getCurrentPosition(showPosition);

function showTemperature(response) {
  const { name } = response.data;
  const { icon, description } = response.data.weather[0];
  const { temp } = response.data.main;
  console.log(name, icon, description, temp);
  document.querySelector("#city").innerHTML = name;
  document.querySelector("#icon").src =
    "https://openweathermap.org/img/wn/" + icon + "@2x.png";
  document.querySelector("#description").innerHTML = description;
  document.querySelector("#temperature").innerHTML = temp;
  document.querySelector(".wind").innerHTML = response.data.wind.speed;
  document.body.style.backgroundImage =
    "url('https://source.unsplash.com/1600x900/?" + name + "')";
}

document
  .querySelector("#search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

function search(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-input");
  search(cityInputElement.value);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

// Change of F to C
function convertTf(event) {
  event.preventDefault();
  celLink.classList.remove("active");
  fehLink.classList.add("active");
  let temperaElment = document.querySelector("#temperature");
  let tempF = (displayWeather * 9) / 5 + 32;
  temperaElment.innerHTML = Math.round(tempF);
}
function convertTc(event) {
  event.preventDefault();
  fehLink.classList.remove("active");
  celLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(displayWeather);
}

let fahrenheitLink = document.querySelector("#Feh");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#Cel");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

// Time
function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}
let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);
