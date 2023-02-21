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
  theOldTimeHour.innerHTML = `${DigtalHourTime[theCurrentFullDate.getHours()]}`;
}
digitalConvert();

//the OG
/*let theNewTimeHour = theCurrentFullDate.getHours();
let theOldTimeHour = document.getElementById("theTimeHourDisplay");
theOldTimeHour.innerHTML = `${theNewTimeHour}`;*/

//the minuntes
function FullMin() {
  let updatetime = theCurrentFullDate.getMinutes();
  if (theCurrentFullDate.getMinutes() > 9) {
    document.getElementById("theTimeMinDisplay").innerHTML = updatetime;
  } else
    document.getElementById(
      "theTimeMinDisplay"
    ).innerHTML = `0${theCurrentFullDate.getMinutes()}`;
}
FullMin();

//the OG

//let theNewTimeMin = theCurrentFullDate.getMinutes();
/*function currentTime() {
  let date = new Date();
  let hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();
  let session = "AM";

  if (hh === 0) {
    hh = 12;
  }
  if (hh > 12) {
    hh = hh - 12;
    session = "PM";
  }

  hh = hh < 10 ? "0" + hh : hh;
  mm = mm < 10 ? "0" + mm : mm;
  ss = ss < 10 ? "0" + ss : ss;

  let time = hh + ":" + mm + ":" + ss + " " + session;

  document.getElementById("clock").innerText = time;
  let t = setTimeout(function () {
    currentTime();
  }, 1000);
}

currentTime();
/*console.log(display_ct);
function display_ct() {
  var x = new Date();
  var x1 = x.getMonth() + 1 + "/" + x.getDate() + "/" + x.getFullYear();
  x1 = x1 + " - " + x.getHours() + ":" + x.getMinutes() + ":" + x.getSeconds();
  document.getElementById("theTimeMinDisplay").innerHTML = x1;
  display_ct();
}*/

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
  //debugger;
  console.log(response);
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
  mainDisplayWeatherDescription.innerHTML = `${response.data.condition.description}`;
  mainTitleDisplay.innerHTML = `${response.data.city}`;
  theMainTemp.innerHTML = Math.floor(response.data.temperature.current);
  liveWindMainDisplay.innerHTML = Math.floor(response.data.wind.speed);
  livePrecipitionMsinDisplay.innerHTML = Math.floor(
    response.data.temperature.humidity
  );
  console.log(response.data.coordinates.latitude);
  console.log(response.data.coordinates.longitude);

  //the forcast upcoming
  axios
    .get(
      `https://api.shecodes.io/weather/v1/forecast?lon=${response.data.coordinates.longitude}&lat=${response.data.coordinates.latitude}&key=84docd86f0tb9793eacd34e7e56f1b9f&units=metric`
    )
    .then(forcastForCityLiveData);

  function forcastForCityLiveData(response) {
    let upcomingforcastElement = document.querySelector("#live-forecast-js");
    //console.log(response.data);
    function convertForcastDayDisplay(timestamp) {
      let dateForUpcomingForcast = new Date(timestamp * 1000);
      console.log(dateForUpcomingForcast);
      let simplfiedDay = dateForUpcomingForcast.getDay();
      let writtendays = ["Sun", "Mon", "Tue", "Wens", "Thur", "Fri", "Sat"];
      return writtendays[simplfiedDay];
    }

    let divRowBinder = `<div class="alt row align-items-start">`;
    let theForcastObject = response.data.daily;

    theForcastObject.forEach(repeatForecast);
    function repeatForecast(theForcastObject, index) {
      //debugger;
      let farinhite = document.querySelector("#Farinhite-link");
      let celeus = document.querySelector("#Celeus-link");
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
      upcomingforcastElement.innerHTML = divRowBinder;
    }
  }

  //console.log(response.data.daily.time);
  //console.log(response.data.daily());
  //let divRow = `<class="row align-items-start">`;

  /* function convertUpcomingForecastTemp(timestamp) {
    console.log(timestamp);
    let divRowBinder = `<div class="row align-items-start">`;
    let upcomingforcastElement = document.querySelector("#live-forecast-js");
    let farinhiteBottomTemp = document.querySelector("#Farinhite-link");
    //let H2ForcastBottomPanal = document.querySelectorAll("h2#theH2TempDisplay");
    let H2ForcastBottomPanal = document.querySelector("h2#theH2TempDisplay");
    let theSpecifyedTimestamp = timestamp.data.daily;

    theSpecifyedTimestamp.forEach(repeatUnitConvers);
    function repeatUnitConvers(theSpecifyedTimestamp, index) {
      if (farinhiteBottomTemp.classList.contains("plus")) {
        if (index < 5) {
          divRowBinder += `<div class="col-2">
              <h1 class="mini forecast-day">${convertForcastDayDisplay(
                theSpecifyedTimestamp.time
              )}</h1>
               <img src="${theSpecifyedTimestamp.condition.icon_url}">
          ${Math.floor((theSpecifyedTimestamp.temperature.day * 9) / 5 + 32)}°F
          </div>`;
        }
      } else {
        if (index < 5) {
          divRowBinder += `<div class="col-2">
              <h1 class="mini forecast-day">${convertForcastDayDisplay(
                theSpecifyedTimestamp.time
              )}</h1>
              <img src="${theSpecifyedTimestamp.condition.icon_url}">
          ${Math.floor(Math.floor(theSpecifyedTimestamp.temperature.day))}°C
          </div>`;
        }
      }
      //console.log(timestamp.data.daily.temperature.day);
      upcomingforcastElement.innerHTML = divRowBinder;
    }
  }*/

  //console.log(convertUpcomingForecastTemp);
  //console.log(H2ForcastBottomPanal);
  //console.log(convertUpcomingForecastTemp());
  //console.log(convertUpcomingForecastTemp);
  //console.log(convertUpcomingForecastTemp());
  //console.log(convertUpcomingForecastTemp);
  function convertCeleus() {
    celeus.classList.add("plus");
    farinhite.classList.remove("plus");

    let mainTempDisplayC = document.querySelector("#Main-display-temp");
    mainTempDisplayC.innerHTML = Math.floor(response.data.temperature.current);

    let inputSearchDisplayTitle = document.querySelector(
      "#main-title-display-search-city"
    );
    axios
      .get(
        `https://api.shecodes.io/weather/v1/forecast?query=${inputSearchDisplayTitle.innerHTML}&key=84docd86f0tb9793eacd34e7e56f1b9f&units=metric`
      )
      .then(forcastForCityLiveData);
  }

  function convertFarinhite() {
    celeus.classList.remove("plus");
    farinhite.classList.add("plus");

    let mainTempDisplayF = document.querySelector("#Main-display-temp");
    mainTempDisplayF.innerHTML = Math.floor(
      (response.data.temperature.current * 9) / 5 + 32
    );
    let inputSearchDisplayTitle = document.querySelector(
      "#main-title-display-search-city"
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

//weather display
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

navigator.geolocation.getCurrentPosition(findGeoWeatherLocation);
let apiWeather = "https://api.shecodes.io/weather/v1/current?";
let apiKey = "84docd86f0tb9793eacd34e7e56f1b9f";

// premade switch
function premadeswitch(timestamp) {
  //debugger;
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
premadesearchT.addEventListener("click", premadeswitch);

let premadesearchM = document.querySelector("#MelbSearch");
premadesearchM.addEventListener("click", premadeswitch);

let premadesearchH = document.querySelector("#HonoluluSearch");
premadesearchH.addEventListener("click", premadeswitch);

//Forcast bottom pannel

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
