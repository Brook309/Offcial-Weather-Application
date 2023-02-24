function premadeCitySearch(timestamp) {
  let farinhite = document.querySelector("#Farinhite-link");
  let celeus = document.querySelector("#Celeus-link");
  celeus.classList.add("plus");
  farinhite.classList.remove("plus");

  axios
    .get(
      `https://api.shecodes.io/weather/v1/current?query=${timestamp.target.innerHTML}&key=84docd86f0tb9793eacd34e7e56f1b9f&units=metric`
    )
    .then(liveDataInputDisplay);
}

let premadesearchT = document.querySelector("#TokyoSearch");
premadesearchT.addEventListener("click", premadeCitySearch);

let premadesearchM = document.querySelector("#MelbSearch");
premadesearchM.addEventListener("click", premadeCitySearch);

let premadesearchH = document.querySelector("#HonoluluSearch");
premadesearchH.addEventListener("click", premadeCitySearch);

//the Date
let theCurrentFullDate = new Date();

//the Current Days
let writtenDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let theCurrentWeekDay = writtenDays[theCurrentFullDate.getDay()];

let theDefaultWeekDay = document.getElementById("theWeekDayDisplay");
theDefaultWeekDay.innerHTML = `${theCurrentWeekDay}`;

//the hour
function analogToDigitalConvert() {
  let DigtalHourTime = [
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
  ];

  let theDefaultTimeHour = document.getElementById("theTimeHourDisplay");

  theDefaultTimeHour.innerHTML = `${
    DigtalHourTime[theCurrentFullDate.getHours()]
  }`;
}

//the minuntes
function fullMinutes() {
  let updatedTime = theCurrentFullDate.getMinutes();
  let theDefaultMinutes = document.getElementById("theTimeMinDisplay");
  if (theCurrentFullDate.getMinutes() > 9) {
    theDefaultMinutes.innerHTML = updatedTime;
  } else {
    theDefaultMinutes.innerHTML = `0${theCurrentFullDate.getMinutes()}`;
  }
}

function AmPmconvert() {
  if (theCurrentFullDate.getHours() < 12) {
    document.querySelector("#the-am-pm").innerHTML = "AM";
  } else {
    document.querySelector("#the-am-pm").innerHTML = "PM";
  }
}

analogToDigitalConvert();
fullMinutes();
AmPmconvert();

//weather display
navigator.geolocation.getCurrentPosition(findGeoWeatherLocation);
let apiWeather = "https://api.shecodes.io/weather/v1/current?";
let apiKey = "84docd86f0tb9793eacd34e7e56f1b9f";

function findGeoWeatherLocation(position) {
  let inputSearchDisplayTitle = document.querySelector("input#form1");

  if (inputSearchDisplayTitle.value) {
    let farinhite = document.querySelector("#Farinhite-link");
    let celeus = document.querySelector("#Celeus-link");
    celeus.classList.add("plus");
    farinhite.classList.remove("plus");

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

function liveDataInputDisplay(response) {
  //debugger;
  let mainTitleDisplay = document.querySelector(
    "h1#main-title-display-search-city"
  );
  let mainDisplayWeatherDescription = document.querySelector(
    "#main-display-weather-description"
  );
  let theMainDisplayTemp = document.querySelector("#Main-display-temp");
  let liveWindMainDisplay = document.querySelector("#the-main-wind-speed");
  let livePrecipitionMainDisplay = document.querySelector(
    "#the-main-precipition"
  );
  let changeWeatherIcon = document.querySelector("#icon-main-display");

  changeWeatherIcon.setAttribute("src", `${response.data.condition.icon_url}`);
  mainDisplayWeatherDescription.innerHTML = `${response.data.condition.description}`;
  mainTitleDisplay.innerHTML = `${response.data.city}`;
  theMainDisplayTemp.innerHTML = Math.floor(response.data.temperature.current);
  liveWindMainDisplay.innerHTML = Math.floor(response.data.wind.speed);
  livePrecipitionMainDisplay.innerHTML = Math.floor(
    response.data.temperature.humidity
  );

  //the forecast upcoming
  axios
    .get(
      `https://api.shecodes.io/weather/v1/forecast?lon=${response.data.coordinates.longitude}&lat=${response.data.coordinates.latitude}&key=${apiKey}&units=metric`
    )
    .then(forcastForCityLiveData);

  function forcastForCityLiveData(response) {
    function convertForcastDayDisplay(timestamp) {
      let dateForUpcomingForcast = new Date(timestamp * 1000);
      let simplfiedDay = dateForUpcomingForcast.getDay();
      let writtenDays = ["Sun", "Mon", "Tue", "Wens", "Thur", "Fri", "Sat"];
      return writtenDays[simplfiedDay];
    }

    let upcomingForcastElement = document.querySelector("#live-forecast-js");
    let divRowBinder = `<div class="alt row align-items-start">`;
    let theForcastObject = response.data.daily;

    theForcastObject.forEach(repeatForecast);
    function repeatForecast(theForcastObject, index) {
      let farinhite = document.querySelector("#Farinhite-link");
      if (farinhite.classList.contains("plus")) {
        if (index < 5) {
          divRowBinder += `
             <div class="col-2">
              <h1 class="mini forecast-day">${convertForcastDayDisplay(
                theForcastObject.time
              )}</h1>
                <img class="space-for-icon" src="${
                  theForcastObject.condition.icon_url
                }">
              <h2 class="mini temp-bottom-panel" id="theH2TempDisplay">${Math.floor(
                (theForcastObject.temperature.day * 9) / 5 + 32
              )}°F</h2>
              </div>`;
        }
      } else {
        if (index < 5) {
          divRowBinder += `
             <div class="col-2">
              <h1 class="mini forecast-day">${convertForcastDayDisplay(
                theForcastObject.time
              )}</h1>
                <img class="space-for-icon" src="${
                  theForcastObject.condition.icon_url
                }">
              <h2 class="mini temp-bottom-panel" id="theH2TempDisplay">${Math.floor(
                theForcastObject.temperature.day
              )}°C</h2>
              </div>`;
        }
      }
      upcomingForcastElement.innerHTML = divRowBinder;
    }
  }

  function convertCeleus() {
    celeus.classList.add("plus");
    farinhite.classList.remove("plus");

    let inputSearchDisplayTitle = document.querySelector(
      "#main-title-display-search-city"
    );
    let mainTempDisplayC = document.querySelector("#Main-display-temp");

    mainTempDisplayC.innerHTML = Math.floor(response.data.temperature.current);

    axios
      .get(
        `https://api.shecodes.io/weather/v1/forecast?query=${inputSearchDisplayTitle.innerHTML}&key=84docd86f0tb9793eacd34e7e56f1b9f&units=metric`
      )
      .then(forcastForCityLiveData);
  }

  function convertFarinhite() {
    celeus.classList.remove("plus");
    farinhite.classList.add("plus");

    let inputSearchDisplayTitle = document.querySelector(
      "#main-title-display-search-city"
    );
    let mainTempDisplayF = document.querySelector("#Main-display-temp");

    mainTempDisplayF.innerHTML = Math.floor(
      (response.data.temperature.current * 9) / 5 + 32
    );

    axios
      .get(
        `https://api.shecodes.io/weather/v1/forecast?query=${inputSearchDisplayTitle.innerHTML}&key=84docd86f0tb9793eacd34e7e56f1b9f&units=metric`
      )
      .then(forcastForCityLiveData);
  }

  let farinhite = document.querySelector("#Farinhite-link");
  farinhite.addEventListener("click", convertFarinhite);

  let celeus = document.querySelector("#Celeus-link");
  celeus.addEventListener("click", convertCeleus);
}
