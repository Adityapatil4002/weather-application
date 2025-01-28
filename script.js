document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const humidityDisplay = document.getElementById("humidity");
  const windSpeedDisplay = document.getElementById("wind-speed");
  const errorMessage = document.getElementById("error-message");
  const loading = document.querySelector(".loading");

  const API_KEY = "0ca65696d7ae00f4978736cd2beb47ab";

  // Handle Enter key press
  cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      getWeatherBtn.click();
    }
  });

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;

    // Show loading animation
    loading.style.display = "flex";
    weatherInfo.classList.add("hidden");
    errorMessage.classList.add("hidden");

    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    } finally {
      loading.style.display = "none";
    }
  });

  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City not found");
    }
    return await response.json();
  }

  function displayWeatherData(data) {
    const { name, main, weather, wind } = data;

    cityNameDisplay.textContent = name;
    temperatureDisplay.textContent = `Temperature: ${Math.round(main.temp)}°C`;
    descriptionDisplay.textContent = `Weather: ${weather[0].description}`;
    humidityDisplay.textContent = `Humidity: ${main.humidity}%`;
    windSpeedDisplay.textContent = `Wind Speed: ${Math.round(
      wind.speed * 3.6
    )} km/h`;

    weatherInfo.classList.remove("hidden");
    setTimeout(() => {
      weatherInfo.classList.add("visible");
    }, 10);
  }

  function showError() {
    weatherInfo.classList.remove("visible");
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }
});
