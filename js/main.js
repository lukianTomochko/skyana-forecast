// ALL function with menu "All main cities"

var firstShowingMenu = true;
var changeRequestsAcc = 0;

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

var optionsItteration = 0;

var allCitiesArray = [];

for (var i = 1; i < 4; i++) {

    for (var y = 0; y < 4; y++) {
        var cityName_LeftSide_DOM = document.querySelector("#mainBlock_allCitiesId > .section_allCities:nth-child(" + i + ")").children[0].children[y].
        children[1].children[0].innerHTML;

        var cityName_RightSide_DOM = document.querySelector("#mainBlock_allCitiesId > .section_allCities:nth-child(" + i + ")").children[1].children[y].
        children[1].children[0].innerHTML;

        allCitiesArray.push(cityName_LeftSide_DOM);
        allCitiesArray.push(cityName_RightSide_DOM);
    }


    //    console.log(allCitiesArray);
}

var errorAlert = true;

var cityName_data = "";
var cityTemp_data = 0;

function showMenu() {

    if (firstShowingMenu == true) {

        firstShowingMenu = false;

        //                for (let i = 0; i < 24; i++) {
        //        
        //                    if (errorAlert == false) {
        //                        optionsItteration++;
        //                        errorAlert = true;
        //                    }
        //        
        //                    fetch(`https://weatherbit-v1-mashape.p.rapidapi.com/current?city=${allCitiesArray[i]}
        //                                &lang=uk`, options[optionsItteration])
        //                        .then(function (response) {
        //                            return response.json();
        //                        })
        //                        .then(function (response) {
        //        
        //                            console.log(response);
        //                            cityName_data = allCitiesArray[i];
        //                            cityTemp_data = Math.round(response.data[0]["temp"]);
        //        
        //        
        //                            for (let i = 1; i < 4; i++) {
        //        
        //                                for (let y = 0; y <= 3; y++) {
        //        
        //                                    var cityName_LeftSide_DOM = document.querySelector("#mainBlock_allCitiesId > .section_allCities:nth-child(" + i + ")").children[0].children[y].
        //                                    children[1].children[0].innerHTML;
        //        
        //                                    var cityName_RightSide_DOM = document.querySelector("#mainBlock_allCitiesId > .section_allCities:nth-child(" + i + ")").children[1].children[y].
        //                                    children[1].children[0].innerHTML;
        //        
        //                                    var cityTemp_LeftSide_DOM = document.querySelector("#mainBlock_allCitiesId > .section_allCities:nth-child(" + i + ")").children[0].children[y].
        //                                    children[1].children[1];
        //                                    var cityTemp_RightSide_DOM = document.querySelector("#mainBlock_allCitiesId > .section_allCities:nth-child(" + i + ")").children[1].children[y].
        //                                    children[1].children[1];
        //        
        //                                    if (cityName_LeftSide_DOM == cityName_data) {
        //                                        cityTemp_LeftSide_DOM.innerHTML = `${cityTemp_data}°`;
        //                                    }
        //                                    if (cityName_RightSide_DOM == cityName_data) {
        //                                        cityTemp_RightSide_DOM.innerHTML = `${cityTemp_data}°`;
        //                                    }
        //        
        //                                }
        //        
        //                            }
        //        
        //                        })
        //                        .catch(function (err) {
        //        
        //                            if (err != "" && errorAlert == true) {
        //                                errorAlert = false;
        //                                firstShowingMenu = true;
        //                            }
        //                            console.error(err);
        //                        });
        //                }

    }


    var menu = document.getElementById("menu_allCities");

    if (menu.classList.contains("menu_allCitiesActive")) {
        menu.classList.remove("menu_allCitiesActive");
    } else {
        menu.classList.add("menu_allCitiesActive");
    }

}

function hideMenu() {
    var menu = document.getElementById("menu_allCities");
    menu.classList.remove("menu_allCitiesActive");
}

// Slider off Cities Sections 1, 2, 3

function onClickCity(navNum) {

    var menuElemClicked = document.querySelector("#mainBlock_allCitiesId > .section_allCities:nth-child(" + navNum + ")");;
    var menuElemAll = document.querySelectorAll(".section_allCities");;

    var navElemClicked = document.querySelector(".nav_allCities > .item_nav:nth-child(" + navNum + ")")
    var navElemAll = document.querySelectorAll(".item_nav");

    menuElemAll.forEach(elem => {
        elem.classList.remove("section_allCitiesActive");
    });

    menuElemClicked.classList.add("section_allCitiesActive");

    navElemAll.forEach(nav_elem => {
        nav_elem.style.background = "#203647";
    });

    navElemClicked.style.background = "#007CC7";


}

// Getting clicked city from index.html and sending to weather.html

var cityBlock = document.querySelectorAll(".item_allCities");
var clickedCityName = "";

cityBlock.forEach(elem => {
    elem.addEventListener('click', function () {
        clickedCityName = elem.children[1].children[0].innerHTML;

        localStorage.clear();
        localStorage.setItem("cityName", clickedCityName);
    });
});



// weather by search

var mainSearchBtn = document.querySelector(".searchBtn");
var mainInputSearch = document.querySelector("#locationInput");

mainSearchBtn.addEventListener("click", function () {
    clickedCityName = mainInputSearch.value;

    localStorage.clear();
    localStorage.setItem("cityName", clickedCityName);
});

// weather by GPS

var latOfLocation = 0;
var lngOfLocation = 0;

navigator.geolocation.getCurrentPosition(function (location) {
    latOfLocation = location.coords.latitude;
    lngOfLocation = location.coords.longitude;

    reverseGeoCoding()
});

var btn_GPS = document.querySelector(".btn_GPS");
var cityNameGeocodingDOM = "";

function reverseGeoCoding() {
    fetch(`https://www.mapquestapi.com/geocoding/v1/reverse?key=uqBMqBMAChllRXuGNgyKMhWUHOZemQIE    &location=${latOfLocation},${lngOfLocation}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            cityNameGeocodingDOM = response.results[0]["locations"][0]["adminArea5"];
            console.log(cityNameGeocodingDOM);
            console.log(response);

            btn_GPS.addEventListener("click", function(){                
                localStorage.clear();
                localStorage.setItem("cityName", cityNameGeocodingDOM);
            });

        });
}

//
