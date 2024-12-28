function getWeather() {
  var city = document.getElementById('cityInput').value;
  var apiKey = '41813ddcc32345ba93f145612230206'; // Replace with your own API key

  // Fetch weather data
  fetch('https://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=' + city + '&days=7')
    .then(response => response.json())
    .then(data => {
      // Display current weather
      var currentWeather = document.getElementById('currentWeather');
      currentWeather.innerHTML = `
        <h2>Current Weather in ${data.location.name}</h2>
        <p>Condition: ${data.current.condition.text}</p>
        <p>Temperature: ${data.current.temp_c}°C</p>
        <p>Humidity: ${data.current.humidity}%</p>
        <p>Wind Speed: ${data.current.wind_kph} km/h</p>
        <p>Date and Time: ${data.location.localtime}</p>
      `;

      // Format data for chart
      var labels = [];
      var temperatures = [];
      var humidities = [];
      var conditions = [];

      for (var i = 0; i < data.forecast.forecastday.length; i++) {
        var forecast = data.forecast.forecastday[i];
        labels.push(forecast.date);
        temperatures.push(forecast.day.avgtemp_c);
        humidities.push(forecast.day.avghumidity);
        conditions.push(forecast.day.condition.text);
      }

      // Display chart
      var weatherChart = document.getElementById('weatherChart');
      weatherChart.innerHTML = `
        <canvas id="chart"></canvas>
      `;

      var ctx = document.getElementById('chart').getContext('2d');
      var chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Temperature (°C)',
            data: temperatures,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }, {
            label: 'Humidity (%)',
            data: humidities,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    })
    .catch(error => {
      console.log('Error:', error);
    });
}
