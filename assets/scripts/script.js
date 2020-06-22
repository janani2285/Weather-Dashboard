$(function () {
   
    $("#search").on("click", function (event) {
        event.preventDefault();
      
        var cityName = $("#cityTextBox").val();
        var btn = $("<button>");
     
       btn.attr("data-city",cityName).attr("type","button");
       btn.text(cityName);
        btn.addClass("btn btn-light btn-outline-secondary rounded-0");
        $("#cityListBlock").append(btn);


          var currentTempqueryURL =
           "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=edc2a456f6f29d66592546fe8ebdbd2e" +"&units=imperial";
        
         $.ajax({
           url: currentTempqueryURL,
           method: "GET",
         }).then(function (response) {
           console.log(response);
           var currentDate = moment().format("MM/DD/YYYY");
           var h2 = $("<h2>");
          h2.text(response.name + " (" + currentDate +")");
          imageUrl = "http://openweathermap.org/img/w/"+response.weather[0].icon+".png";
          h2.append($("<img src="+imageUrl+"></img>"));
          $("#temp").text( $("#temp").text()+" "+response.main.temp);
          $("#temp").append("&#x2109;");
          $("#humidity").text( $("#humidity").text()+" "+response.main.humidity);
          $("#windSpeed").text( $("#windSpeed").text()+" "+response.wind.speed);



          //UV index needs a seperte ajax call
        //  $("#uvIndex").text( $("#uvIndex").text()+response.main.temp);

           $("#cityDate").append(h2);
          /* response.name;
           response.weather.icon;
          response.main.temp;
          response.main.humidity;
          response.wind.speed;
           var movieDiv = $("<div>").attr("id","movie-view");
           movieDiv.text(JSON.stringify(response, null, 4));
           $(".container").append(movieDiv);*/
         });

      //  displayWeather();

        //cityLocalStorage();
    });

    function displayWeather(){

    }

    function cityLocalStorage(){

    }
});