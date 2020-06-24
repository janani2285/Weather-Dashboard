$(function () {

  // code to retrieve local storage
  displaySearchHistoryLS();

  // code to retrieve local storage
  displayLastSearchWeather();


  //on click function for button search
  $("#search").on("click", function (event) {
    event.preventDefault();


    var cityName = $("#cityTextBox").val();

    if (cityName != null && cityName != "") {

      var searchArr = JSON.parse(localStorage.getItem("searchHistory"));
      if (jQuery.inArray(cityName, searchArr) === -1) {
        var btn = $("<button>");

        btn.attr("data-city", cityName).attr("type", "button");
        // btn.attr("data-city", cityName);
        btn.text(cityName);
        btn.addClass("btn btn-light btn-outline-secondary rounded-0 city");
        $("#cityListBlock").prepend(btn);


        //add code to store in local storage
        storeSearchHistory(cityName);

        displayCurrentWeather(cityName);

        display5DayForecast(cityName);
      } else {
        storeSearchHistory(cityName);

        displayCurrentWeather(cityName);

        display5DayForecast(cityName);
      }

    } else {
      alert("Please enter a city name");
    }

  });


  $(".city").on("click", function () {
   
    var cityName = $(this).attr("data-city");
    // var cityName = $(this).children("button").attr("data-city");
   
    displayCurrentWeather(cityName);
    display5DayForecast(cityName);
  });


  function display5DayForecast(cityName){
    
    var APIKey = "edc2a456f6f29d66592546fe8ebdbd2e&lat";

    // Here we are building the URL we need to query the database
    var queryURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      cityName +
      "&appid=" +
      APIKey +
      "&units=imperial";

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      var forecastDays = [];
      forecastDays.push(response.list[0]);
      forecastDays.push(response.list[8]);
      forecastDays.push(response.list[16]);
      forecastDays.push(response.list[24]);
      forecastDays.push(response.list[32]);

      $("#forecast").html("");

      for (var i = 0; i < forecastDays.length; i += 1) {
        var colDiv = $("<div>").addClass("col border border-primary rounded bg-primary text-white mr-2");

        var rowDiv = $("<div>").addClass("row p-2 bd-highlight");

      //  var forecastContainer = $("<div>").addClass("forecast-day");
      var date = forecastDays[i].dt_txt;
    // alert( moment(date).format("YYYY-MM-DD"));
       var dateEl = $("<div>").text(moment(date).format("YYYY-MM-DD"));
        var imageUrl = "http://openweathermap.org/img/w/" + forecastDays[i].weather[0].icon+ ".png";
       
        var iconEl = $("<img src=" + imageUrl + "></img>");
        var tempEl = $("<div>").text("Temp: " + forecastDays[i].main.temp + " °F");
        var humidityEl = $("<div>").text("Humidity: " + forecastDays[i].main.humidity + "%");
        rowDiv.append(dateEl, iconEl, tempEl, humidityEl);
        colDiv.append(rowDiv);
        $("#forecast").append(colDiv);
      }
    });
  }
  function storeSearchHistory(cityName) {
    var searchArr = [];
    if (localStorage.getItem("searchHistory") != null || localStorage.getItem("searchHistory") != undefined) {
      searchArr = JSON.parse(localStorage.getItem("searchHistory"));
      if (jQuery.inArray(cityName, searchArr) === -1) {
        searchArr.push(cityName);
      }

    } else {
      searchArr.push(cityName);
    }
    localStorage.setItem("searchHistory", JSON.stringify(searchArr));
  }

  function displaySearchHistoryLS() {
    var cityArr = JSON.parse(localStorage.getItem("searchHistory"));
    var lastSearchCity = localStorage.getItem("lastSearch");

    if (cityArr != null || cityArr != undefined) {

      for (var i = 0; i < cityArr.length; i++) {

        var btn = $("<button>");

        btn.attr("data-city", cityArr[i]).attr("type", "button");
        //btn.attr("data-city", cityArr[i]);
        btn.text(cityArr[i]);
        btn.addClass("btn btn-light btn-outline-secondary rounded-0 city");
        $("#cityListBlock").append(btn);
      }

    }

    if(lastSearchCity !=  null || lastSearchCity != undefined){
      displayCurrentWeather(lastSearchCity);
      display5DayForecast(lastSearchCity);
    }

  }

  function displayUVIndex(lon, lat) {

    var uvIndexqueryURL =
      "http://api.openweathermap.org/data/2.5/uvi?appid=edc2a456f6f29d66592546fe8ebdbd2e&lat=" + lat + "&lon=" + lon;

    $.ajax({
      url: uvIndexqueryURL,
      method: "GET",
    }).then(function (response) {
      var uvIndex = response.value;

      $("#uvIndex").text("UV Index: " + uvIndex);

    });

  }

  function displayCurrentWeather(cityName) {
    var lon = 0;
    var lat = 0;

    var currentTempqueryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=edc2a456f6f29d66592546fe8ebdbd2e" + "&units=imperial";

    $.ajax({
      url: currentTempqueryURL,
      method: "GET",
    }).then(function (response) {

      var currentDate = moment().format("MM/DD/YYYY");
      var h2 = $("<h2>");
      h2.text(response.name + " (" + currentDate + ")");
      imageUrl = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
      h2.append($("<img src=" + imageUrl + "></img>"));
      $("#cityDate").html(h2);

      $("#temp").text("Temperature: " + response.main.temp);
      $("#temp").append("&#x2109;");
      $("#humidity").text("Humidity: " + response.main.humidity + "%");
      $("#windSpeed").text("Wind Speed:" + response.wind.speed + " MPH");

      lon = response.coord.lon;
      lat = response.coord.lat;


      displayUVIndex(lon, lat);
      localStorage.setItem("lastSearch", cityName);
    });
  }

  function displayLastSearchWeather() {

  }

  function cityLocalStorage() {

  }
});