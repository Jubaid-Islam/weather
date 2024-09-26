document.getElementById('getWeatherBtn').addEventListener('click', function () {
    const city = document.getElementById('cityInput').value;
    const apiKey = '52656a746b702922b86f2861bfcf51ff' // Replace with your OpenWeatherMap API key
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    // Fetch current weather data
    fetch(weatherApiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                document.getElementById('cityName').textContent = `Weather in ${data.name}`;
                document.getElementById('temperature').textContent = `Temperature: ${data.main.temp} °C`;
                document.getElementById('weatherDescription').textContent = `Description: ${data.weather[0].description}`;
                document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
                document.getElementById('windSpeed').textContent = `Wind Speed: ${data.wind.speed} m/s`;

                // Display weather icon
                const iconCode = data.weather[0].icon;
                const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
                document.getElementById('weatherIcon').src = iconUrl;
                document.getElementById('weatherIcon').style.display = 'block';
            } else {
                alert('City not found. Please try again.');
            }
        })
        .catch(error => console.error('Error fetching current weather data:', error));

    // Fetch 5-day forecast data
    fetch(forecastApiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "200") {
                const forecastContainer = document.getElementById('forecastContainer');
                forecastContainer.innerHTML = ''; // Clear previous forecast data

                // Filter forecast for 12:00 PM each day
                const dailyForecasts = data.list.filter(forecast => forecast.dt_txt.includes('12:00:00'));

                dailyForecasts.forEach(forecast => {
                    const forecastElement = document.createElement('div');
                    forecastElement.className = 'forecast-item';

                    const date = new Date(forecast.dt_txt).toDateString();
                    const temp = `Temp: ${forecast.main.temp} °C`;
                    const desc = forecast.weather[0].description;
                    const iconCode = forecast.weather[0].icon;
                    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

                    forecastElement.innerHTML = `
                        <h4>${date}</h4>
                        <img src="${iconUrl}" alt="Weather Icon" />
                        <p>${temp}</p>
                        <p>${desc}</p>
                    `;

                    forecastContainer.appendChild(forecastElement);
                });
            } else {
                alert('Error fetching forecast data. Please try again.');
            }
        })
        .catch(error => console.error('Error fetching forecast data:', error));
});
