//Change of city...
let weather = {
  apiKey: "b9ba0314a93083136d968577c718e31d",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=imperial&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp } = data.main;
    console.log(name, icon, description, temp);
    document.querySelector(".city").innerHTML = name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector(".description").innerHTML = description;
    document.querySelector("#temperature").innerHTML = temp;
  },
};
// Location
function showPosition(position) {
  let apiKey = "b9ba0314a93083136d968577c718e31d";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}`;
  axios.get(apiUrl).then(weather);
}
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

let fehLink = document.getElementById("#Feh");
fehLink.addEventListener("click", converTf);
let celLink = document.getElementById("#Cel");
celLink.addEventListener("click", convertTc);
