export async function fetchWeather(city) {
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiUrl = import.meta.env.VITE_WEATHER_API_URL;
  const url = `${apiUrl}?key=${apiKey}&q=${city}&days=10&aqi=yes&alerts=no`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Network response was not ok ${response.statusText}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}

export async function fetchCityList(CityString) {
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiUrl = import.meta.env.VITE_SEARCH_API_URL;
  const url = `${apiUrl}?key=${apiKey}&q=${CityString}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Network response was not ok ${response.statusText}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}
