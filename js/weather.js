var weatherMenuBtn = document.querySelector(".mobWeatherBtn");
var weatherMenuCross = document.querySelector(".crossBtn");

var weatherMenu = document.querySelector(".allDetailsBlock");
var weatherMenuBG = document.querySelector(".bg_allDetailsBlock");

var weatherMenuState = false;

weatherMenuBtn.addEventListener("click", function () {

    if (weatherMenuState == false) {
        weatherMenu.style.right = "0%";
        weatherMenuBG.style.right = "0%";

        weatherMenu.style.transition = ".3s";
        weatherMenuBG.style.transition = ".3s";

        weatherMenuState = true;
    } else {
        weatherMenu.style.right = "-100%";
        weatherMenuBG.style.right = "-100%";

        weatherMenu.style.transition = ".4s";
        weatherMenuBG.style.transition = ".4s";
        weatherMenuState = false;
    }

});

// weather by search

var mainSearchBtn = document.querySelector(".searchBtn");
var mainInputSearch = document.querySelector("#locationInput");

mainSearchBtn.addEventListener("click", function () {
    clickedCityName = mainInputSearch.value;

    localStorage.clear();
    localStorage.setItem("cityName", clickedCityName);
});



weatherMenuCross.addEventListener("click", function () {

    weatherMenu.style.right = "-100%";
    weatherMenuBG.style.right = "-100%";

    weatherMenu.style.transition = ".4s";
    weatherMenuBG.style.transition = ".4s";
    weatherMenuState = false;

});

var noneCurrentDay = false;

var currentDate = new Date().getDate(); // 4

var currentDay = new Date().toLocaleString('uk', {
    weekday: 'long'
}); // Monday 
currentDay = currentDay.charAt(0).toUpperCase() + currentDay.slice(1);

var currentMonth = new Date().toLocaleString('uk', {
    month: 'short'
}); // Jul
currentMonth = currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);

var currentYear = String(new Date().getFullYear()).replace("20", ""); // 22

var dataDetailsDOM = document.querySelector(".currentDate");

var curerntTime = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
}); // 23:01
var curerntMinutes = new Date().toLocaleTimeString([], {
    minute: '2-digit'
}); // 1

dataDetailsDOM.innerHTML = `${curerntTime} - ${currentDay} ${currentDate} ${currentMonth} ‘${currentYear}`;

function curerntTimeFunc() {
    curerntTime = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });
    curerntMinutes = new Date().toLocaleTimeString([], {
        minute: '2-digit'
    });
    if (noneCurrentDay == false) {
        dataDetailsDOM.innerHTML = `${curerntTime} - ${currentDay} ${currentDate} ${currentMonth} '${currentYear}`;
    }
}

setInterval(curerntTimeFunc, (60 - curerntMinutes) * 1000);




var currentCityName = localStorage.getItem("cityName"); // clicked city name - from index.html

console.log(currentCityName);

var cityNameDOM = document.querySelector(".currentCityName"); // city name DOM element - from weather.html
var cityTempDOM = document.querySelector(".tempText"); // city temp DOM element - from weather.html

var wind_speedDOM = document.querySelector("#currentWind");
var cloudsDOM = document.querySelector("#currentCloudy");
var humidityDOM = document.querySelector("#currentHumidity");

var weatherIconDOM = document.querySelector("#pc_iconBlock > img");
var weatherIconDOM2 = document.querySelector("#mob_iconBlock > img");

var allIconsCode = [];

var cityNameData = "";
var cityTempData = 0;
var wind_speedData = 0;
var cloudsData = 0;
var humidityData = 0;

var mainBG = document.querySelector(".mainWrapper");

var iconCodeData = "";
var iconCode = "";

var weatherDecriptionDOM = document.querySelector("#pc_iconBlock > div");
var weatherDecriptionDOM2 = document.querySelector("#mob_iconBlock > div");

var iconsArray_Thunder = ["t01d", "t01n", "t02d", "t02n", "t03d", "t03n"];
var iconsArray_Thunder2 = ["t04d", "t04n", "t05d", "t05n"];
var iconsArray_lightRain = ["d01d", "d01n", "d02d", "d02n", "d03d", "d03n", "r05d", "r05n", "r01d", "r01n"];
var iconsArray_mediumRain = ["r02d", "r02n", "s05d", "s05n", "s06d", "s06n"];
var iconsArray_hardRain = ["r03d", "r03n", "f01d", "f01n", "r06d", "r06n", "r04d", "r04n"];
var iconsArray_lightSnow = ["s01d", "s01n", "s02d", "s02n"];
var iconsArray_cloudy = ["c04d", "c04n"];
var iconsArray_lightCloudy = ["a01d", "a01n", "a02d", "a02n", "a03d", "a03n", "a04d", "a04n", "a05d", "a05n", "a06d", "a06n", "c02d", "c02n", "c03d", "c03n"];
var iconsArray_clearSky = ["c01d", "c01n"];

const options1 = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'aef6ecdfcfmsh2f0b4176d3ccfc7p14ba1bjsn14dbb0de5139',
        'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
    }
};
const options2 = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '7810e1e63emsha56a2ae966633c9p1caaadjsnfc4c01d1bc80',
        'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
    }
};
const options3 = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'cd3815d473mshd2b2781aa568a79p1995ebjsn76e623ce9af4',
        'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
    }
};

const options = [options1, options2, options3];

var errorAlert = true;
var optionsItteration = 0;


function fetchReloadFunc() {

    fetch(`https://weatherbit-v1-mashape.p.rapidapi.com/current?city=${currentCityName}
&lang=uk`, options[optionsItteration])
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {

            if (errorAlert == false && optionsItteration < 3) {
                optionsItteration++;
                errorAlert = true;

                fetchReloadFunc();
            }

            cityNameData = response.data[0]["city_name"];
            cityTempData = Math.round(response.data[0]["temp"]);

            wind_speedData = Math.round(response.data[0]["wind_spd"]);
            wind_speedDOM.innerHTML = `${wind_speedData} м/с`;

            cloudsData = response.data[0]["clouds"];
            cloudsDOM.innerHTML = `${cloudsData}%`;

            humidityData = response.data[0]["rh"];
            humidityDOM.innerHTML = `${humidityData}%`;

            if (cityNameData.length > 8 && window.matchMedia("(max-width: 1130px)")) {
                cityNameDOM.style.fontSize = "50px";
                currentCityName = currentCityName.slice(0, cityNameData.length - 3);
                cityNameDOM.innerHTML = `${currentCityName}...`;
            } else {
                cityNameDOM.innerHTML = currentCityName;
            }
            cityTempDOM.innerHTML = `${cityTempData}°`;

            iconCodeData = response.data[0]["weather"]["icon"];

            for (let i = 0; i < iconsArray_Thunder.length; i++) {
                if (iconsArray_Thunder[i] == iconCodeData) {
                    iconCode = "t01d";

                    weatherDecriptionDOM.innerHTML = "Гроза, злива";
                    weatherDecriptionDOM2.innerHTML = "Гроза, злива";
                    mainBG.style.background = "url(images/weatherBg/thunder&rainbg.jpg)";
                }
            }
            for (let i = 0; i < iconsArray_Thunder2.length; i++) {
                if (iconsArray_Thunder2[i] == iconCodeData) {
                    iconCode = "t04d";

                    weatherDecriptionDOM.innerHTML = "Гроза";
                    weatherDecriptionDOM2.innerHTML = "Гроза";
                    mainBG.style.background = "url(images/weatherBg/thunderbg.jpg)";
                }
            }
            for (let i = 0; i < iconsArray_lightRain.length; i++) {
                if (iconsArray_lightRain[i] == iconCodeData) {
                    iconCode = "r01d";

                    weatherDecriptionDOM.innerHTML = "Легкий дощ";
                    weatherDecriptionDOM2.innerHTML = "Легкий дощ";
                    mainBG.style.background = "url(images/weatherBg/lightRain.jpg)";
                }
            }
            for (let i = 0; i < iconsArray_mediumRain.length; i++) {
                if (iconsArray_mediumRain[i] == iconCodeData) {
                    iconCode = "r02d";

                    weatherDecriptionDOM.innerHTML = "Помірний дощ";
                    weatherDecriptionDOM2.innerHTML = "Помірний дощ";
                    mainBG.style.background = "url(images/weatherBg/midRain.jpg)";
                }
            }
            for (let i = 0; i < iconsArray_hardRain.length; i++) {
                if (iconsArray_hardRain[i] == iconCodeData) {
                    iconCode = "r03d";

                    weatherDecriptionDOM.innerHTML = "Сильний дощ";
                    weatherDecriptionDOM2.innerHTML = "Сильний дощ";
                    mainBG.style.background = "url(images/weatherBg/strongRain.jpg)";
                }
            }
            for (let i = 0; i < iconsArray_lightSnow.length; i++) {
                if (iconsArray_lightSnow[i] == iconCodeData) {
                    iconCode = "s01d";

                    weatherDecriptionDOM.innerHTML = "Легкий сніг";
                    weatherDecriptionDOM2.innerHTML = "Легкий сніг";
                    mainBG.style.background = "url(images/weatherBg/snowbg.jpg)";
                }
            }
            for (let i = 0; i < iconsArray_lightCloudy.length; i++) {
                if (iconsArray_lightCloudy[i] == iconCodeData) {
                    iconCode = "c02d";

                    weatherDecriptionDOM.innerHTML = "Мінлива хмарність";
                    weatherDecriptionDOM2.innerHTML = "Мінлива хмарність";
                    mainBG.style.background = "url(images/weatherBg/lightCloud.jpg)";
                }
            }
            for (let i = 0; i < iconsArray_cloudy.length; i++) {
                if (iconsArray_cloudy[i] == iconCodeData) {
                    iconCode = "c04d";

                    weatherDecriptionDOM.innerHTML = "Хмарність";
                    weatherDecriptionDOM2.innerHTML = "Хмарність";
                    mainBG.style.background = "url(images/weatherBg/cloudybg.jpg)";
                }
            }
            for (let i = 0; i < iconsArray_clearSky.length; i++) {
                if (iconsArray_clearSky[i] == iconCodeData) {
                    iconCode = "c01d";

                    weatherDecriptionDOM.innerHTML = "Ясне небо";
                    weatherDecriptionDOM2.innerHTML = "Ясне небо";
                    mainBG.style.background = "url(images/weatherBg/sunnybg.jpg)";
                }
            }

            mainBG.style.backgroundPosition = "center";
            mainBG.style.backgroundSize = "cover";

            weatherIconDOM.src = `images/icons/${iconCode}.png`;
            weatherIconDOM2.src = `images/icons/${iconCode}.png`;


            console.log(response);
        })
        .catch(function (err) {
            if (err != "" && errorAlert == true) {
                errorAlert = false;
                fetchReloadFunc();
            }
            console.error(err);
        });

    // Set date to week days

    var numCurrentDay = new Date().getDate(); // 12
    var numCurrentYear = new Date().getFullYear(); // 2022
    var numCurrentMonth = new Date().getMonth() + 1; // 07

    function DaysInMonthFunc(year, month) {
        return new Date(year, month, 0).getDate();
    }
    var daysInMounth = DaysInMonthFunc(numCurrentYear, numCurrentMonth);


    var arrayWeekByDate = ["Понеділок", "Вівторок", "Середа", "Четвер", "Пʼятниця", "Субота", "Неділя"];
    var otherDays = false;
    var timesOfLoop = 0;
    var numOfDayIteration = numCurrentDay;

    for (let y = 0; y < 2; y++) {
        for (let i = 0; i < 7; i++) {
            var dayofWeekDOM = document.querySelector(`.weatherNav_item_nav:nth-child(${i+1})`);
            if (numOfDayIteration >= daysInMounth) {
                numOfDayIteration = 0;
            }

            if (otherDays == true && dayofWeekDOM.getAttribute("data-date") == "") {
                numOfDayIteration += 1;
                dayofWeekDOM.dataset.date = numOfDayIteration;
            }
            if (arrayWeekByDate[i] == currentDay && timesOfLoop == 0) {
                dayofWeekDOM.dataset.date = numCurrentDay;
                otherDays = true;
                timesOfLoop = 1;

                // Changing bg of current day
                dayofWeekDOM.style.background = "#007CC7";
            }
        }
    }

    var timeOfWeather_Morning = 9;
    var timeOfWeather_Day = 15;
    var timeOfWeather_Evening = 21;
    var timeOfWeather_Night = 3;

    var timeOfWeather_MorningDOM = document.querySelector("#morningTemp");
    var timeOfWeather_DayDOM = document.querySelector("#dayTemp");
    var timeOfWeather_EveningDOM = document.querySelector("#eveningTemp");
    var timeOfWeather_NightDOM = document.querySelector("#nightTemp");

    var currentDayTemp = 0;
    var dayData = 0;
    var dayTime = 0;

    var changeMorning = false;
    var changeDay = false;
    var changeEvening = false;
    var changeNight = false;

    var morningIcon = document.querySelector("#morningIcon");
    var dayIcon = document.querySelector("#dayIcon");
    var eveningIcon = document.querySelector("#eveningIcon");
    var nightIcon = document.querySelector("#nightIcon");

    fetch(`https://weatherbit-v1-mashape.p.rapidapi.com/forecast/hourly?city=${currentCityName}&lang=uk&hours=168`, options[optionsItteration])
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {

            if (errorAlert == false && optionsItteration < 3) {
                optionsItteration++;
                errorAlert = true;

                fetchReloadFunc();
            }

            for (let i = 0; i < 25; i++) {

                dayData = response.data[i]["timestamp_utc"]; // current day from fetch 08, 12, 24 and etc
                dayData = dayData.substr(8, 2);
                if (dayData.charAt(0) == 0) {
                    dayData = dayData.slice(1);
                }

                dayTime = response.data[i]["timestamp_utc"]; // current time from fetch 12, 06, 21 and etc
                dayTime = dayTime.substr(11, 2);
                if (dayTime.charAt(0) == 0) {
                    dayTime = dayTime.slice(1);
                }

                if (dayData == numCurrentDay) {
                    if (dayTime == timeOfWeather_Morning) {
                        currentDayTemp = Math.round(response.data[i]["temp"]);
                        timeOfWeather_MorningDOM.innerHTML = `${currentDayTemp}°`;

                        changeMorning = true;

                        iconCodeData = response.data[i]["weather"]["icon"];

                        for (let i = 0; i < iconsArray_Thunder.length; i++) {
                            if (iconsArray_Thunder[i] == iconCodeData) {
                                iconCode = "t01d";
                            }
                        }
                        for (let i = 0; i < iconsArray_Thunder2.length; i++) {
                            if (iconsArray_Thunder2[i] == iconCodeData) {
                                iconCode = "t04d";
                            }
                        }
                        for (let i = 0; i < iconsArray_lightRain.length; i++) {
                            if (iconsArray_lightRain[i] == iconCodeData) {
                                iconCode = "r01d";
                            }
                        }
                        for (let i = 0; i < iconsArray_mediumRain.length; i++) {
                            if (iconsArray_mediumRain[i] == iconCodeData) {
                                iconCode = "r02d";
                            }
                        }
                        for (let i = 0; i < iconsArray_hardRain.length; i++) {
                            if (iconsArray_hardRain[i] == iconCodeData) {
                                iconCode = "r03d";
                            }
                        }
                        for (let i = 0; i < iconsArray_lightSnow.length; i++) {
                            if (iconsArray_lightSnow[i] == iconCodeData) {
                                iconCode = "s01d";
                            }
                        }
                        for (let i = 0; i < iconsArray_lightCloudy.length; i++) {
                            if (iconsArray_lightCloudy[i] == iconCodeData) {
                                iconCode = "c02d";
                            }
                        }
                        for (let i = 0; i < iconsArray_cloudy.length; i++) {
                            if (iconsArray_cloudy[i] == iconCodeData) {
                                iconCode = "c04d";
                            }
                        }
                        for (let i = 0; i < iconsArray_clearSky.length; i++) {
                            if (iconsArray_clearSky[i] == iconCodeData) {
                                iconCode = "c01d";
                            }
                        }
                        morningIcon.src = `images/icons/${iconCode}.png`;


                    }
                    if (dayTime == timeOfWeather_Day) {
                        currentDayTemp = Math.round(response.data[i]["temp"]);
                        timeOfWeather_DayDOM.innerHTML = `${currentDayTemp}°`;

                        changeDay = true;

                        iconCodeData = response.data[i]["weather"]["icon"];

                        for (let i = 0; i < iconsArray_Thunder.length; i++) {
                            if (iconsArray_Thunder[i] == iconCodeData) {
                                iconCode = "t01d";
                            }
                        }
                        for (let i = 0; i < iconsArray_Thunder2.length; i++) {
                            if (iconsArray_Thunder2[i] == iconCodeData) {
                                iconCode = "t04d";
                            }
                        }
                        for (let i = 0; i < iconsArray_lightRain.length; i++) {
                            if (iconsArray_lightRain[i] == iconCodeData) {
                                iconCode = "r01d";
                            }
                        }
                        for (let i = 0; i < iconsArray_mediumRain.length; i++) {
                            if (iconsArray_mediumRain[i] == iconCodeData) {
                                iconCode = "r02d";
                            }
                        }
                        for (let i = 0; i < iconsArray_hardRain.length; i++) {
                            if (iconsArray_hardRain[i] == iconCodeData) {
                                iconCode = "r03d";
                            }
                        }
                        for (let i = 0; i < iconsArray_lightSnow.length; i++) {
                            if (iconsArray_lightSnow[i] == iconCodeData) {
                                iconCode = "s01d";
                            }
                        }
                        for (let i = 0; i < iconsArray_lightCloudy.length; i++) {
                            if (iconsArray_lightCloudy[i] == iconCodeData) {
                                iconCode = "c02d";
                            }
                        }
                        for (let i = 0; i < iconsArray_cloudy.length; i++) {
                            if (iconsArray_cloudy[i] == iconCodeData) {
                                iconCode = "c04d";
                            }
                        }
                        for (let i = 0; i < iconsArray_clearSky.length; i++) {
                            if (iconsArray_clearSky[i] == iconCodeData) {
                                iconCode = "c01d";
                            }
                        }
                        dayIcon.src = `images/icons/${iconCode}.png`;
                    }
                    if (dayTime == timeOfWeather_Evening) {
                        currentDayTemp = Math.round(response.data[i]["temp"]);
                        timeOfWeather_EveningDOM.innerHTML = `${currentDayTemp}°`;

                        changeEvening = true;

                        iconCodeData = response.data[i]["weather"]["icon"];

                        for (let i = 0; i < iconsArray_Thunder.length; i++) {
                            if (iconsArray_Thunder[i] == iconCodeData) {
                                iconCode = "t01d";
                            }
                        }
                        for (let i = 0; i < iconsArray_Thunder2.length; i++) {
                            if (iconsArray_Thunder2[i] == iconCodeData) {
                                iconCode = "t04d";
                            }
                        }
                        for (let i = 0; i < iconsArray_lightRain.length; i++) {
                            if (iconsArray_lightRain[i] == iconCodeData) {
                                iconCode = "r01d";
                            }
                        }
                        for (let i = 0; i < iconsArray_mediumRain.length; i++) {
                            if (iconsArray_mediumRain[i] == iconCodeData) {
                                iconCode = "r02d";
                            }
                        }
                        for (let i = 0; i < iconsArray_hardRain.length; i++) {
                            if (iconsArray_hardRain[i] == iconCodeData) {
                                iconCode = "r03d";
                            }
                        }
                        for (let i = 0; i < iconsArray_lightSnow.length; i++) {
                            if (iconsArray_lightSnow[i] == iconCodeData) {
                                iconCode = "s01d";
                            }
                        }
                        for (let i = 0; i < iconsArray_lightCloudy.length; i++) {
                            if (iconsArray_lightCloudy[i] == iconCodeData) {
                                iconCode = "c02d";
                            }
                        }
                        for (let i = 0; i < iconsArray_cloudy.length; i++) {
                            if (iconsArray_cloudy[i] == iconCodeData) {
                                iconCode = "c04d";
                            }
                        }
                        for (let i = 0; i < iconsArray_clearSky.length; i++) {
                            if (iconsArray_clearSky[i] == iconCodeData) {
                                iconCode = "c01d";
                            }
                        }
                        eveningIcon.src = `images/icons/${iconCode}.png`;
                    }
                }

                if (dayData == numCurrentDay + 1) {
                    if (dayTime == timeOfWeather_Night) {
                        currentDayTemp = Math.round(response.data[i]["temp"]);
                        timeOfWeather_NightDOM.innerHTML = `${currentDayTemp}°`;

                        changeNight = true;

                        iconCodeData = response.data[i]["weather"]["icon"];

                        for (let i = 0; i < iconsArray_Thunder.length; i++) {
                            if (iconsArray_Thunder[i] == iconCodeData) {
                                iconCode = "t01d";
                            }
                            for (let i = 0; i < iconsArray_Thunder2.length; i++) {
                                if (iconsArray_Thunder2[i] == iconCodeData) {
                                    iconCode = "t04d";
                                }
                            }
                            for (let i = 0; i < iconsArray_lightRain.length; i++) {
                                if (iconsArray_lightRain[i] == iconCodeData) {
                                    iconCode = "r01d";
                                }
                            }
                            for (let i = 0; i < iconsArray_mediumRain.length; i++) {
                                if (iconsArray_mediumRain[i] == iconCodeData) {
                                    iconCode = "r02d";
                                }
                            }
                            for (let i = 0; i < iconsArray_hardRain.length; i++) {
                                if (iconsArray_hardRain[i] == iconCodeData) {
                                    iconCode = "r03d";
                                }
                            }
                            for (let i = 0; i < iconsArray_lightSnow.length; i++) {
                                if (iconsArray_lightSnow[i] == iconCodeData) {
                                    iconCode = "s01d";
                                }
                            }
                            for (let i = 0; i < iconsArray_lightCloudy.length; i++) {
                                if (iconsArray_lightCloudy[i] == iconCodeData) {
                                    iconCode = "c02d";
                                }
                            }
                            for (let i = 0; i < iconsArray_cloudy.length; i++) {
                                if (iconsArray_cloudy[i] == iconCodeData) {
                                    iconCode = "c04d";
                                }
                            }
                            for (let i = 0; i < iconsArray_clearSky.length; i++) {
                                if (iconsArray_clearSky[i] == iconCodeData) {
                                    iconCode = "c01d";
                                }
                            }
                            nightIcon.src = `images/icons/${iconCode}.png`;
                        }

                    }

                    if (i == 24 && changeMorning == false) {
                        timeOfWeather_MorningDOM.innerHTML = "‒";
                    }
                    if (i == 24 && changeDay == false) {
                        timeOfWeather_DayDOM.innerHTML = "‒";
                    }
                    if (i == 24 && changeEvening == false) {
                        timeOfWeather_EveningDOM.innerHTML = "‒";
                    }
                    if (i == 24 && changeNight == false) {
                        timeOfWeather_NightDOM.innerHTML = "‒";
                    }



                }

                navDayAll.forEach(elem => {
                    elem.addEventListener('click', function () {

                        if (errorAlert == false && optionsItteration < 3) {
                            optionsItteration++;
                            errorAlert = true;

                            fetchReloadFunc();
                        }

                        var clickedDayDate = elem.getAttribute("data-date");

                        for (let i = 0; i < 168; i++) {

                            dayData = response.data[i]["timestamp_utc"]; // current day from fetch 08, 12, 24 and etc
                            dayData = dayData.substr(8, 2);
                            if (dayData.charAt(0) == 0) {
                                dayData = dayData.slice(1);
                            }

                            dayTime = response.data[i]["timestamp_utc"]; // current time from fetch 12, 06, 21 and etc
                            dayTime = dayTime.substr(11, 2);
                            if (dayTime.charAt(0) == 0) {
                                dayTime = dayTime.slice(1);
                            }

                            if (dayData == clickedDayDate) {
                                if (dayTime == timeOfWeather_Morning) {
                                    currentDayTemp = Math.round(response.data[i]["temp"]);
                                    timeOfWeather_MorningDOM.innerHTML = `${currentDayTemp}°`;
                                    changeMorning = true;

                                    iconCodeData = response.data[i]["weather"]["icon"];

                                    for (let i = 0; i < iconsArray_Thunder.length; i++) {
                                        if (iconsArray_Thunder[i] == iconCodeData) {
                                            iconCode = "t01d";
                                        }
                                    }
                                    for (let i = 0; i < iconsArray_Thunder2.length; i++) {
                                        if (iconsArray_Thunder2[i] == iconCodeData) {
                                            iconCode = "t04d";
                                        }
                                    }
                                    for (let i = 0; i < iconsArray_lightRain.length; i++) {
                                        if (iconsArray_lightRain[i] == iconCodeData) {
                                            iconCode = "r01d";
                                        }
                                    }
                                    for (let i = 0; i < iconsArray_mediumRain.length; i++) {
                                        if (iconsArray_mediumRain[i] == iconCodeData) {
                                            iconCode = "r02d";
                                        }
                                    }
                                    for (let i = 0; i < iconsArray_hardRain.length; i++) {
                                        if (iconsArray_hardRain[i] == iconCodeData) {
                                            iconCode = "r03d";
                                        }
                                    }
                                    for (let i = 0; i < iconsArray_lightSnow.length; i++) {
                                        if (iconsArray_lightSnow[i] == iconCodeData) {
                                            iconCode = "s01d";
                                        }
                                    }
                                    for (let i = 0; i < iconsArray_lightCloudy.length; i++) {
                                        if (iconsArray_lightCloudy[i] == iconCodeData) {
                                            iconCode = "c02d";
                                        }
                                    }
                                    for (let i = 0; i < iconsArray_cloudy.length; i++) {
                                        if (iconsArray_cloudy[i] == iconCodeData) {
                                            iconCode = "c04d";
                                        }
                                    }
                                    for (let i = 0; i < iconsArray_clearSky.length; i++) {
                                        if (iconsArray_clearSky[i] == iconCodeData) {
                                            iconCode = "c01d";
                                        }
                                    }
                                    morningIcon.src = `images/icons/${iconCode}.png`;
                                }
                                if (dayTime == timeOfWeather_Day) {
                                    currentDayTemp = Math.round(response.data[i]["temp"]);
                                    timeOfWeather_DayDOM.innerHTML = `${currentDayTemp}°`;
                                    changeDay = true;

                                    iconCodeData = response.data[i]["weather"]["icon"];

                                    for (let i = 0; i < iconsArray_Thunder.length; i++) {
                                        if (iconsArray_Thunder[i] == iconCodeData) {
                                            iconCode = "t01d";
                                        }
                                    }
                                    for (let i = 0; i < iconsArray_Thunder2.length; i++) {
                                        if (iconsArray_Thunder2[i] == iconCodeData) {
                                            iconCode = "t04d";
                                        }
                                    }
                                    for (let i = 0; i < iconsArray_lightRain.length; i++) {
                                        if (iconsArray_lightRain[i] == iconCodeData) {
                                            iconCode = "r01d";
                                        }
                                    }
                                    for (let i = 0; i < iconsArray_mediumRain.length; i++) {
                                        if (iconsArray_mediumRain[i] == iconCodeData) {
                                            iconCode = "r02d";
                                        }
                                    }
                                    for (let i = 0; i < iconsArray_hardRain.length; i++) {
                                        if (iconsArray_hardRain[i] == iconCodeData) {
                                            iconCode = "r03d";
                                        }
                                    }
                                    for (let i = 0; i < iconsArray_lightSnow.length; i++) {
                                        if (iconsArray_lightSnow[i] == iconCodeData) {
                                            iconCode = "s01d";
                                        }
                                    }
                                    for (let i = 0; i < iconsArray_lightCloudy.length; i++) {
                                        if (iconsArray_lightCloudy[i] == iconCodeData) {
                                            iconCode = "c02d";
                                        }
                                    }
                                    for (let i = 0; i < iconsArray_cloudy.length; i++) {
                                        if (iconsArray_cloudy[i] == iconCodeData) {
                                            iconCode = "c04d";
                                        }
                                    }
                                    for (let i = 0; i < iconsArray_clearSky.length; i++) {
                                        if (iconsArray_clearSky[i] == iconCodeData) {
                                            iconCode = "c01d";
                                        }
                                    }
                                    dayIcon.src = `images/icons/${iconCode}.png`;
                                }
                                if (dayTime == timeOfWeather_Evening) {
                                    currentDayTemp = Math.round(response.data[i]["temp"]);
                                    timeOfWeather_EveningDOM.innerHTML = `${currentDayTemp}°`;
                                    changeEvening = true;

                                    iconCodeData = response.data[i]["weather"]["icon"];

                                    for (let i = 0; i < iconsArray_Thunder.length; i++) {
                                        if (iconsArray_Thunder[i] == iconCodeData) {
                                            iconCode = "t01d";
                                        }
                                    }
                                    for (let i = 0; i < iconsArray_Thunder2.length; i++) {
                                        if (iconsArray_Thunder2[i] == iconCodeData) {
                                            iconCode = "t04d";
                                        }
                                    }
                                    for (let i = 0; i < iconsArray_lightRain.length; i++) {
                                        if (iconsArray_lightRain[i] == iconCodeData) {
                                            iconCode = "r01d";
                                        }
                                    }
                                    for (let i = 0; i < iconsArray_mediumRain.length; i++) {
                                        if (iconsArray_mediumRain[i] == iconCodeData) {
                                            iconCode = "r02d";
                                        }
                                    }
                                    for (let i = 0; i < iconsArray_hardRain.length; i++) {
                                        if (iconsArray_hardRain[i] == iconCodeData) {
                                            iconCode = "r03d";
                                        }
                                    }
                                    for (let i = 0; i < iconsArray_lightSnow.length; i++) {
                                        if (iconsArray_lightSnow[i] == iconCodeData) {
                                            iconCode = "s01d";
                                        }
                                    }
                                    for (let i = 0; i < iconsArray_lightCloudy.length; i++) {
                                        if (iconsArray_lightCloudy[i] == iconCodeData) {
                                            iconCode = "c02d";
                                        }
                                    }
                                    for (let i = 0; i < iconsArray_cloudy.length; i++) {
                                        if (iconsArray_cloudy[i] == iconCodeData) {
                                            iconCode = "c04d";
                                        }
                                    }
                                    for (let i = 0; i < iconsArray_clearSky.length; i++) {
                                        if (iconsArray_clearSky[i] == iconCodeData) {
                                            iconCode = "c01d";
                                        }
                                    }
                                    eveningIcon.src = `images/icons/${iconCode}.png`;
                                }

                            }

                            clickedDayDate = parseInt(clickedDayDate, 10);

                            if (dayData == clickedDayDate + 1) {
                                if (dayTime == timeOfWeather_Night) {
                                    currentDayTemp = Math.round(response.data[i]["temp"]);
                                    timeOfWeather_NightDOM.innerHTML = `${currentDayTemp}°`;
                                    changeNight = true;

                                    iconCodeData = response.data[i]["weather"]["icon"];

                                    for (let i = 0; i < iconsArray_Thunder.length; i++) {
                                        if (iconsArray_Thunder[i] == iconCodeData) {
                                            iconCode = "t01d";
                                        }
                                    }
                                    for (let i = 0; i < iconsArray_Thunder2.length; i++) {
                                        if (iconsArray_Thunder2[i] == iconCodeData) {
                                            iconCode = "t04d";
                                        }
                                    }
                                    for (let i = 0; i < iconsArray_lightRain.length; i++) {
                                        if (iconsArray_lightRain[i] == iconCodeData) {
                                            iconCode = "r01d";
                                        }
                                    }
                                    for (let i = 0; i < iconsArray_mediumRain.length; i++) {
                                        if (iconsArray_mediumRain[i] == iconCodeData) {
                                            iconCode = "r02d";
                                        }
                                    }
                                    for (let i = 0; i < iconsArray_hardRain.length; i++) {
                                        if (iconsArray_hardRain[i] == iconCodeData) {
                                            iconCode = "r03d";
                                        }
                                    }
                                    for (let i = 0; i < iconsArray_lightSnow.length; i++) {
                                        if (iconsArray_lightSnow[i] == iconCodeData) {
                                            iconCode = "s01d";
                                        }
                                    }
                                    for (let i = 0; i < iconsArray_lightCloudy.length; i++) {
                                        if (iconsArray_lightCloudy[i] == iconCodeData) {
                                            iconCode = "c02d";
                                        }
                                    }
                                    for (let i = 0; i < iconsArray_cloudy.length; i++) {
                                        if (iconsArray_cloudy[i] == iconCodeData) {
                                            iconCode = "c04d";
                                        }
                                    }
                                    for (let i = 0; i < iconsArray_clearSky.length; i++) {
                                        if (iconsArray_clearSky[i] == iconCodeData) {
                                            iconCode = "c01d";
                                        }
                                    }
                                    nightIcon.src = `images/icons/${iconCode}.png`;
                                }

                            }

                            if (i == 167 && changeMorning == false) {
                                timeOfWeather_MorningDOM.innerHTML = "‒";
                            }
                            if (i == 167 && changeDay == false) {
                                timeOfWeather_DayDOM.innerHTML = "‒";
                            }
                            if (i == 167 && changeEvening == false) {
                                timeOfWeather_EveningDOM.innerHTML = "‒";
                            }
                            if (i == 167 && changeNight == false) {
                                timeOfWeather_NightDOM.innerHTML = "‒";
                            }
                        }

                        changeMorning = false;
                        changeDay = false;
                        changeEvening = false;
                        changeNight = false;
                    });

                });
            }

            console.log(response);
        })
        .catch(function (err) {
            if (err != "" && errorAlert == true) {
                errorAlert = false;
                fetchReloadFunc();
            }
            console.error(err);
        });

    var min_maxTempDOM = document.querySelector("#min_maxTemp");

    var minTempData = 0;
    var maxTempData = 0;

    fetch(`https://weatherbit-v1-mashape.p.rapidapi.com/forecast/daily?city=${currentCityName}&lang=uk&hours=168`, options[optionsItteration])
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {

            if (errorAlert == false && optionsItteration < 3) {
                optionsItteration++;
                errorAlert = true;

                alert("12312");
                fetchReloadFunc();
            }

            minTempData = Math.round(response.data[0]["min_temp"]);
            maxTempData = Math.round(response.data[0]["max_temp"]);

            min_maxTempDOM.innerHTML = `${minTempData}° / ${maxTempData}°`;

            navDayAll.forEach(elem => {
                elem.addEventListener('click', function () {

                    if (errorAlert == false && optionsItteration < 3) {
                        optionsItteration++;
                        errorAlert = true;

                        fetchReloadFunc();
                    }

                    var clickedDayDate = elem.getAttribute("data-date");
                    var clickedDayWeek = elem.getAttribute("data-week");

                    for (let i = 0; i < 16; i++) {

                        dayData = response.data[i]["datetime"]; // current day from fetch 08, 12, 24 and etc
                        dayData = dayData.substr(8, 2);
                        if (dayData.charAt(0) == 0) {
                            dayData = dayData.slice(1);
                        }

                        if (clickedDayDate == dayData) {

                            minTempData = Math.round(response.data[i]["min_temp"]);
                            maxTempData = Math.round(response.data[i]["max_temp"]);

                            min_maxTempDOM.innerHTML = `${minTempData}° / ${maxTempData}°`;

                            cityTempData = Math.round(response.data[i]["temp"]);
                            cityTempDOM.innerHTML = `${cityTempData}°`;

                            wind_speedData = Math.round(response.data[i]["wind_spd"]);
                            wind_speedDOM.innerHTML = `${wind_speedData} м/с`;

                            cloudsData = response.data[i]["clouds"];
                            cloudsDOM.innerHTML = `${cloudsData}%`;

                            humidityData = response.data[i]["rh"];
                            humidityDOM.innerHTML = `${humidityData}%`;



                            if (clickedDayDate != numCurrentDay) {
                                dataDetailsDOM.innerHTML = `${clickedDayWeek} ${clickedDayDate} ${currentMonth} ‘${currentYear}`;
                                noneCurrentDay = true;
                            }

                            if (clickedDayDate == numCurrentDay) {
                                dataDetailsDOM.innerHTML = `${curerntTime} - ${clickedDayWeek} ${clickedDayDate} ${currentMonth} ‘${currentYear}`;
                                noneCurrentDay = false;
                            }

                            iconCodeData = response.data[i]["weather"]["icon"];

                            for (let i = 0; i < iconsArray_Thunder.length; i++) {
                                if (iconsArray_Thunder[i] == iconCodeData) {
                                    iconCode = "t01d";

                                    weatherDecriptionDOM.innerHTML = "Гроза, злива";
                                    weatherDecriptionDOM2.innerHTML = "Гроза, злива";
                                    mainBG.style.background = "url(images/weatherBg/thunder&rainbg.jpg)";
                                }
                            }
                            for (let i = 0; i < iconsArray_Thunder2.length; i++) {
                                if (iconsArray_Thunder2[i] == iconCodeData) {
                                    iconCode = "t04d";

                                    weatherDecriptionDOM.innerHTML = "Гроза";
                                    weatherDecriptionDOM2.innerHTML = "Гроза";
                                    mainBG.style.background = "url(images/weatherBg/thunderbg.jpg)";
                                }
                            }
                            for (let i = 0; i < iconsArray_lightRain.length; i++) {
                                if (iconsArray_lightRain[i] == iconCodeData) {
                                    iconCode = "r01d";

                                    weatherDecriptionDOM.innerHTML = "Легкий дощ";
                                    weatherDecriptionDOM2.innerHTML = "Легкий дощ";
                                    mainBG.style.background = "url(images/weatherBg/lightRain.jpg)";
                                }
                            }
                            for (let i = 0; i < iconsArray_mediumRain.length; i++) {
                                if (iconsArray_mediumRain[i] == iconCodeData) {
                                    iconCode = "r02d";

                                    weatherDecriptionDOM.innerHTML = "Помірний дощ";
                                    weatherDecriptionDOM2.innerHTML = "Помірний дощ";
                                    mainBG.style.background = "url(images/weatherBg/midRain.jpg)";
                                }
                            }
                            for (let i = 0; i < iconsArray_hardRain.length; i++) {
                                if (iconsArray_hardRain[i] == iconCodeData) {
                                    iconCode = "r03d";

                                    weatherDecriptionDOM.innerHTML = "Сильний дощ";
                                    weatherDecriptionDOM2.innerHTML = "Сильний дощ";
                                    mainBG.style.background = "url(images/weatherBg/strongRain.jpg)";
                                }
                            }
                            for (let i = 0; i < iconsArray_lightSnow.length; i++) {
                                if (iconsArray_lightSnow[i] == iconCodeData) {
                                    iconCode = "s01d";

                                    weatherDecriptionDOM.innerHTML = "Легкий сніг";
                                    weatherDecriptionDOM2.innerHTML = "Легкий сніг";
                                    mainBG.style.background = "url(images/weatherBg/snowbg.jpg)";
                                }
                            }
                            for (let i = 0; i < iconsArray_lightCloudy.length; i++) {
                                if (iconsArray_lightCloudy[i] == iconCodeData) {
                                    iconCode = "c02d";

                                    weatherDecriptionDOM.innerHTML = "Мінлива хмарність";
                                    weatherDecriptionDOM2.innerHTML = "Мінлива хмарність";
                                    mainBG.style.background = "url(images/weatherBg/lightCloud.jpg)";
                                }
                            }
                            for (let i = 0; i < iconsArray_cloudy.length; i++) {
                                if (iconsArray_cloudy[i] == iconCodeData) {
                                    iconCode = "c04d";

                                    weatherDecriptionDOM.innerHTML = "Хмарність";
                                    weatherDecriptionDOM2.innerHTML = "Хмарність";
                                    mainBG.style.background = "url(images/weatherBg/cloudybg.jpg)";
                                }
                            }
                            for (let i = 0; i < iconsArray_clearSky.length; i++) {
                                if (iconsArray_clearSky[i] == iconCodeData) {
                                    iconCode = "c01d";

                                    weatherDecriptionDOM.innerHTML = "Ясне небо";
                                    weatherDecriptionDOM2.innerHTML = "Ясне небо";
                                    mainBG.style.background = "url(images/weatherBg/sunnybg.jpg)";
                                }

                            }

                            mainBG.style.backgroundPosition = "center";
                            mainBG.style.backgroundSize = "cover";

                            weatherIconDOM.src = `images/icons/${iconCode}.png`;
                            weatherIconDOM2.src = `images/icons/${iconCode}.png`;

                        }

                    }

                });

            });

            console.log(response);
        })
        .catch(function (err) {
            if (err != "" && errorAlert == true) {
                errorAlert = false;
                fetchReloadFunc();
            }
            console.error(err);
        });


    var navDayAll = document.querySelectorAll(".weatherNav_item_nav");

    navDayAll.forEach(elem => {
        elem.addEventListener('click', function () {
            navDayAll.forEach(elem => {
                elem.style.background = "#203647";
            });
            elem.style.background = "#007CC7";

        });

    });
}

fetchReloadFunc();
