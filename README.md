# Weather Forecast Pro

A responsive weather forecasting web application that lets users search for a city, view current weather conditions, and explore upcoming forecasts.

## Live Demo

**Live Website:** [Open Weather Forecast Pro](https://fahrahman.github.io/WEATHER_FORECASTpro/)

**Repository:** [GitHub](https://github.com/fahrahman/WEATHER_FORECASTpro)

## Features

- **City Search:** Search for weather information by city name.
- **Location-Based Weather:** Retrieve weather information using geographic coordinates when location access is available.
- **Weather Forecast:** View forecast information for a selected location.
- **Visual Forecast:** Explore forecast data through a chart.
- **Voice Search:** Search for a location using voice input where browser support permits.
- **Responsive Interface:** Use the application on desktop and mobile devices.
- **Secure API Integration:** The frontend communicates with a Cloudflare Worker backend, which handles requests to the weather API without exposing the API key in client-side code.

## Technology Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend / API Proxy:** Cloudflare Workers
- **Weather Data:** OpenWeatherMap API
- **Hosting:** GitHub Pages
- **Forecast Visualization:** JavaScript charting

## Architecture

The application separates the user interface from weather-data retrieval.

1. The user searches for a city or provides their location.
2. The frontend sends a request to the Cloudflare Worker.
3. The Worker securely accesses the weather API using a server-side secret.
4. Weather data is returned as JSON.
5. The frontend displays the results and forecast visualization.

## API Endpoints

The Cloudflare Worker supports the following request patterns:

| Endpoint | Purpose |
|---|---|
| `/weather?city=Kochi` | Retrieve weather by city |
| `/weather?lat=10.0159&lon=76.3419` | Retrieve weather by coordinates |
| `/forecast?city=Kochi` | Retrieve forecast data by city |

The examples use Kochi as a sample location. Replace the city or coordinates with your desired location.

## Run Locally

1. Clone or download this repository.
2. Open the project folder.
3. Start a local development server, or open `index.html` in a browser for basic frontend testing.
4. Ensure the frontend is configured to use the deployed Cloudflare Worker API.
5. Test city search, location access, forecast display, and error handling.

Some features, especially geolocation and browser APIs, may require a secure context or a local development server.

## Security

The weather API key is stored as a Cloudflare Worker secret rather than embedded in the public frontend.

If you deploy your own version, configure your own API key as a Worker secret and update the frontend API endpoint accordingly. Never commit API keys, passwords, or other credentials to a public repository.

## Future Improvements

- Improve loading, empty, and error states.
- Refine the responsive weather dashboard.
- Add better accessibility and keyboard navigation.
- Improve API request validation and rate limiting.
- Expand automated testing and documentation.

## Author

**Fahad Rahman**

- GitHub: [@fahrahman](https://github.com/fahrahman)

