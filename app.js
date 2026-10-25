
const API_BASE = "https://weather-forecast-api.fahadrahman4444.workers.dev";

const forecastCanvas = document.getElementById("forecast-chart");
const forecastChart = forecastCanvas
  ? forecastCanvas.getContext("2d")
  : null;

let chart;

displayLoadingMessage();

navigator.geolocation.getCurrentPosition(
  position => {
    getWeatherDataByCoords(
      position.coords.latitude,
      position.coords.longitude
    );
  },
  () => getWeatherData("Delhi")
);

async function fetchWeather(path, params = {}) {
  const query = new URLSearchParams(params);
  const response = await fetch(`${API_BASE}${path}?${query}`);

  const data = await response.json();

  if (!response.ok || data.cod === "404" || Number(data.cod) >= 400) {
    throw new Error(data.message || data.error || "Weather request failed");
  }

  return data;
}

async function getWeatherData(city = "Delhi") {
  const input = document.getElementById("search-input");
  const selectedCity = input.value.trim() || city;

  try {
    const data = await fetchWeather("/weather", { city: selectedCity });
    displayCurrentWeather(data);
    await getForecast(data.name || selectedCity);
  } catch (error) {
    console.error(error);
    alert("Could not fetch weather data. Check the city name and try again.");
  }
}

async function getWeatherDataByCoords(lat, lon) {
  try {
    const data = await fetchWeather("/weather", {
      lat: String(lat),
      lon: String(lon)
    });

    displayCurrentWeather(data);
    await getForecast(data.name);
  } catch (error) {
    console.error(error);
    alert("Could not fetch your location's weather. Please search for a city.");
  }
}

function displayLoadingMessage() {
  document.getElementById("condition").innerText = "Loading...";
  document.getElementById("temperature").innerText = "";
  document.getElementById("humidity").innerText = "";
  document.getElementById("wind-speed").innerText = "";
  document.getElementById("date-time").innerText = "";
}

function displayCurrentWeather(data) {
  if (!data.weather?.[0] || !data.main || !data.wind) {
    throw new Error("Invalid weather data received");
  }

  document.getElementById("condition").innerText =
    `Condition: ${data.weather[0].description}`;

  document.getElementById("temperature").innerText =
    `Temperature: ${data.main.temp}°C`;

  document.getElementById("humidity").innerText =
    `Humidity: ${data.main.humidity}%`;

  document.getElementById("wind-speed").innerText =
    `Wind Speed: ${data.wind.speed} m/s`;

  document.getElementById("date-time").innerText =
    `Date/Time: ${new Date(data.dt * 1000).toLocaleString()}`;
}

async function getForecast(city) {
  try {
    const data = await fetchWeather("/forecast", { city });

    if (!Array.isArray(data.list)) {
      throw new Error("Invalid forecast data received");
    }

    const temps = data.list.map(item => item.main.temp);
    const humidity = data.list.map(item => item.main.humidity);
    const labels = data.list.map(item =>
      new Date(item.dt * 1000).toLocaleString()
    );

    if (!forecastChart || typeof Chart === "undefined") {
      console.error("Chart.js or forecast canvas is unavailable");
      return;
    }

    if (chart) chart.destroy();

    chart = new Chart(forecastChart, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Temperature (°C)",
            data: temps,
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
            fill: false
          },
          {
            label: "Humidity (%)",
            data: humidity,
            borderColor: "rgba(153, 102, 255, 1)",
            borderWidth: 1,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            display: true,
            title: { display: true, text: "Date/Time" }
          },
          y: {
            display: true,
            title: { display: true, text: "Value" }
          }
        }
      }
    });
  } catch (error) {
    console.error(error);
    alert("Could not load the forecast. Please try again.");
  }
}

const voiceButton = document.getElementById("voice-btn");

if (voiceButton) {
  voiceButton.addEventListener("click", () => {
    const searchInput = document.getElementById("search-input");
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser doesn't support speech recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = event => {
      const transcript = event.results[0][0].transcript;
      searchInput.value = transcript;
      getWeatherData(transcript);
    };

    recognition.onerror = event => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.start();
  });
}
