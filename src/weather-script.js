//thedate
let theCurrentFullDate = new Date();

//the hour
function AmPmconvert() {
  if (theCurrentFullDate.getHours() < 12) {
    document.querySelector("#the-am-pm").innerHTML = "AM";
  } else {
    document.querySelector("#the-am-pm").innerHTML = "PM";
  }
}
AmPmconvert();

function digitalConvert() {
  let theOldTimeHour = document.getElementById("theTimeHourDisplay");
  let DigtalHourTime = [
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "12",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];
  if (theCurrentFullDate.getHours() > 11) {
    theOldTimeHour.innerHTML = `${
      DigtalHourTime[theCurrentFullDate.getHours()]
    }`;
  } else {
    theOldTimeHour.innerHTML = `${theCurrentFullDate.getHours()}`;
  }
}
digitalConvert();

//the OG
/*let theNewTimeHour = theCurrentFullDate.getHours();
let theOldTimeHour = document.getElementById("theTimeHourDisplay");
theOldTimeHour.innerHTML = `${theNewTimeHour}`;*/

//the minuntes
function FullMin() {
  if (theCurrentFullDate.getMinutes() > 9) {
    document.getElementById(
      "theTimeMinDisplay"
    ).innerHTML = `${theCurrentFullDate.getMinutes()}`;
  } else
    document.getElementById(
      "theTimeMinDisplay"
    ).innerHTML = `0${theCurrentFullDate.getMinutes()}`;
}

FullMin();

//the OG
//let theNewTimeMin = theCurrentFullDate.getMinutes();

//let theOldTimeMin = document.getElementById("theTimeMinDisplay");
//theOldTimeMin.innerHTML = `${theNewTimeMin}`;

//The weekDays Displays
let writtenDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let theNewWeekDay = writtenDays[theCurrentFullDate.getDay()];

let theOldWeekDay = document.getElementById("theWeekDayDisplay");
theOldWeekDay.innerHTML = `${theNewWeekDay}`;

//Search Form with Live Data input
function liveDataInputDisplay(response) {
  console.log(response.data);
  let mainTitleDisplay = document.querySelector(
    "h1#main-title-display-search-city"
  );
  let mainDisplayWeatherDescription = document.querySelector(
    "#main-display-weather-description"
  );
  let theMainTemp = document.querySelector("#Main-display-temp");
  let liveWindMainDisplay = document.querySelector("#the-main-wind-speed");
  let livePrecipitionMsinDisplay = document.querySelector(
    "#the-main-precipition"
  );
  let changeweathericon = document.querySelector("#icon-main-display");

  changeweathericon.setAttribute("src", `${response.data.condition.icon_url}`);
  mainDisplayWeatherDescription.innerHTML = `${response.data.condition.icon_url}`;
  mainTitleDisplay.innerHTML = `${response.data.condition.description}`;
  theMainTemp.innerHTML = Math.floor(response.data.temperature.current);
  liveWindMainDisplay.innerHTML = Math.floor(response.data.wind.speed);
  livePrecipitionMsinDisplay.innerHTML = Math.floor(
    response.data.temperature.humidity
  );

  function convertCeleus() {
    let mainTempDisplayC = document.querySelector("#Main-display-temp");
    mainTempDisplayC.innerHTML = Math.floor(response.data.temperature.current);
  }
  function convertFarinhite() {
    let mainTempDisplayF = document.querySelector("#Main-display-temp");
    mainTempDisplayF.innerHTML = Math.floor(
      (response.data.temperature.current * 9) / 5 + 32
    );
  }
  let farinhite = document.querySelector("#Farinhite-link");
  farinhite.addEventListener("click", convertFarinhite);

  let celeus = document.querySelector("#Celeus-link");
  celeus.addEventListener("click", convertCeleus);
}

//weather display
function findGeoWeatherLocation(position) {
  let inputSearchDisplayTitle = document.querySelector("input#form1");

  if (inputSearchDisplayTitle.value) {
    axios
      .get(
        `${apiWeather}query=${inputSearchDisplayTitle.value}&key=${apiKey}&units=metric`
      )
      .then(liveDataInputDisplay);
  } else {
    axios
      .get(
        `${apiWeather}lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}&units=metric`
      )
      .then(liveDataInputDisplay);
  }
}

let inputSearch = document.querySelector("button#submit-form-button");
inputSearch.addEventListener("click", findGeoWeatherLocation);

navigator.geolocation.getCurrentPosition(findGeoWeatherLocation);
let apiWeather = "https://api.shecodes.io/weather/v1/current?";
let apiKey = "84docd86f0tb9793eacd34e7e56f1b9f";

/* 
function tempGeo(position) {
  axios
    .get(
      `${apiWeather}lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`
    )
    .then(display);
    let apiWeather = "https://api.openweathermap.org/data/2.5/weather?q=Sydney";

navigator.geolocation.getCurrentPosition(tempGeo);*/
//function liveDataInput(response) {}
/*
let apiWeather = "https://api.openweathermap.org/data/2.5/weather?";
let apiKey = "2b6fdad0cbd018949c50c70f72250726";
let city = document.querySelector("input#form1");
console.log(city);*/
/*axios
  .get(`${apiWeather}q=${city}&appid=${apiKey}&units=metric`)
  .then(liveDataInput)*/

/*
function serchInputDisplay() {
  let inputSearchDisplayTitle = document.querySelector("input#form1");

  if (inputSearchDisplayTitle.value) {
    axios
      .get(
        `${apiWeather}q=${inputSearchDisplayTitle.value}&appid=${apiKey}&units=metric`
      )
      .then(liveDataInputDisplay);
  } else {
    alert("Please enter a city");
  }
}
*/

/*
function serchInputDisplay() {
  let inputSearchDisplayTitle = document.querySelector("input#form1");

  if (inputSearchDisplayTitle.value) {
    axios
      .get(
        `${apiWeather}q=${inputSearchDisplayTitle.value}&appid=${apiKey}&units=metric`
      )
      .then(liveDataInputDisplay);
  } else {
    alert("Please enter a city");
  }
}
*/
