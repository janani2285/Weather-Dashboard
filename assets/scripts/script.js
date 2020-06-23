$(function () {

  $("#search").on("click", function (event) {
    event.preventDefault();


    var cityName = $("#cityTextBox").val();
    var btn = $("<button>");

    btn.attr("data-city", cityName).attr("type", "button");
    btn.text(cityName);
    btn.addClass("btn btn-light btn-outline-secondary rounded-0");
    $("#cityListBlock").append(btn);

    //add code to store in local storage

    displayCurrentWeather(cityName);



    /* response.name;
     response.weather.icon;
    response.main.temp;
    response.main.humidity;
    response.wind.speed;
     var movieDiv = $("<div>").attr("id","movie-view");
     movieDiv.text(JSON.stringify(response, null, 4));
     $(".container").append(movieDiv);*/


    //  displayWeather();

    //cityLocalStorage();
  });

  function displayUVIndex(lon, lat) {

    var uvIndexqueryURL =
      "http://api.openweathermap.org/data/2.5/uvi?appid=edc2a456f6f29d66592546fe8ebdbd2e&lat=" + lat + "&lon=" + lon;

    $.ajax({
      url: uvIndexqueryURL,
      method: "GET",
    }).then(function (response) {
      var uvIndex = response.value;

      $("#uvIndex").text($("#uvIndex").text() + " " + uvIndex);

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
      $("#cityDate").append(h2);

      $("#temp").text($("#temp").text() + " " + response.main.temp);
      $("#temp").append("&#x2109;");
      $("#humidity").text($("#humidity").text() + " " + response.main.humidity);
      $("#windSpeed").text($("#windSpeed").text() + " " + response.wind.speed);

      lon = response.coord.lon;
      lat = response.coord.lat;


      displayUVIndex(lon, lat);

    });
  }

  function cityLocalStorage() {

  }
});