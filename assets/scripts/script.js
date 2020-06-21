$(function () {
   
    $("#search").on("click", function (event) {
        event.preventDefault();
      
        var cityName = $("#cityTextBox").val();
        var btn = $("<button>");
     
       btn.attr("data-city",cityName).attr("type","button");
       btn.text(cityName);
        btn.addClass("btn btn-light btn-outline-secondary rounded-0");
        $("#cityListBlock").append(btn);
    })
});