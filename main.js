import { getWeatherData, getWeatherByCity } from './weather.js';

document.querySelector('#getWeather').addEventListener('click', () => {
  const status = document.querySelector('.status');
  const weatherInfo = document.querySelector('#weatherInfo');

  // Check if the browser supports geolocation
  if (navigator.geolocation) {
    status.textContent = 'Getting your location...';
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      status.textContent = `Location found: Lat ${latitude}, Lon ${longitude}`;

      try {
        const weatherData = await getWeatherData(latitude, longitude);
        const tempCelsius = (weatherData.main.temp - 273.15).toFixed(1); // Convert Kelvin to Celsius

        weatherInfo.innerHTML = `
          <p>Current Temperature: ${tempCelsius}°C</p>
          <p>Weather: ${weatherData.weather[0].description}</p>
        `;
      } catch (error) {
        weatherInfo.textContent = 'Error fetching weather data.';
        console.error(error);
      }
    }, () => {
      status.textContent = 'Unable to retrieve your location';
    });
  } else {
    status.textContent = 'Geolocation is not supported by your browser.';
  }
});

// Adds city search functionality
document.querySelector('#searchCityWeather').addEventListener('click', async () => {
  const cityInput = document.querySelector('#cityInput').value;
  const cityWeatherInfo = document.querySelector('#cityWeatherInfo');

  if (cityInput) {
    try {
      const weatherData = await getWeatherByCity(cityInput);
      const tempCelsius = (weatherData.main.temp - 273.15).toFixed(1); // Convert Kelvin to Celsius

      cityWeatherInfo.innerHTML = `
        <p>Temperature in ${weatherData.name}: ${tempCelsius}°C</p>
        <p>Weather: ${weatherData.weather[0].description}</p>
      `;
    } catch (error) {
      cityWeatherInfo.textContent = 'Error fetching weather data for the city.';
      console.error(error);
    }
  } else {
    cityWeatherInfo.textContent = 'Please enter a city name.';
  }
});
