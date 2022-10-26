var myAPIKey = "686e7d11188ff94eccae01a97924a5fc";

var searchArray = [];

//var is for the user input on which city to look up

var cityName = "";

//https://openweathermap.org/forecast5
//`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${myApiKey

var handleSubmit = function () {
  cityName = $("#searchCity").val();
  // console.log(cityName)

  fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${myAPIKey}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.length > 0) {
        var currentCity = $("#currentCity");
        currentCity.text(data[0].name);
        var latitude = data[0].lat;
        var longitude = data[0].lon;
        getFiveDayForecast(data[0].lat, data[0].lon);

        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${myAPIKey}`
        )
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            console.log(data);

            var currentDate = $("#currentCityDate");
            var currentTemp = $("#currentCityTemp");
            var currentWind = $("#currentCityWind");
            var currentHum = $("#currentCityHum");
            var currentIcon = $("#currentCityIcon");

            currentDate.text(moment().format("MM/DD/YYYY"));
            currentTemp.text("Temperature: " + data.list[0].main.temp + "°F");
            currentHum.text("Humidity: " + data.list[0].main.humidity + "%");
            currentWind.text("Wind: " + data.list[0].wind.speed + " MPH");
            currentIcon.html(
              `<img src="http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png">`
            );
          });
      }
    });

    var getFiveDayForecast = function (lat, lon) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=686e7d11188ff94eccae01a97924a5fc`;
    fetch(apiUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        var fiveDayLabel = $('#fiveDayHeader');
        fiveDayLabel.text('5-Day Forecast:');
        var fiveDayForecast = $('#fiveDayForecast');
        fiveDayForecast.empty();
        $('#searchCity').trigger('reset')
        for (var i = 0; i < data.list.length; i+=8) {
            var html = ` 
            <div class="card" style="width: 11rem; background-color: rgb(0, 157, 255); margin-bottom: 1em;">
            <div class="card-body">
            <h5 class="card-title" style="color:white;">${moment.unix(data.list[i].dt).format('MM/DD/YYYY')}</h5>
            <img src="http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png">
            <p class="card-text" style="color:white;">Temp: ${data.list[i].main.temp}°F</p>
            <p class="card-text" style="color:white;">Wind: ${data.list[i].wind.speed} MPH</p>
            <p class="card-text" style="color:white;">Humidity: ${data.list[i].main.humidity}%</p>
            </div>
            </div>
            `
            fiveDayForecast.append(html);
        }
        
    })
  
  
    }}