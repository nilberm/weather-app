const apiKey = 'cd132c1b677d943709a9b61f7c929b9c'; // API key

// Function to get the weather by geolocation
export async function getWeatherData(lat, lon) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  return response.json();
}

// Function to get the weather around the city
export async function getWeatherByCity(cityName) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error('Failed to fetch weather data for the city');
  }
  return response.json();
}
