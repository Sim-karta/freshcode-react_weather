const WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast";

export function getWeather(latitude, longitude, { signal } = {}) {
    const params = new URLSearchParams({
        latitude: String(latitude),
        longitude: String(longitude),
        current:
            "temperature_2m,wind_speed_10m,wind_direction_10m,weather_code",
        timezone: "auto",
    });

    return fetch(`${WEATHER_API_URL}?${params}`, { signal }).then(
        (response) => {
            if (!response.ok) {
                throw new Error(`Weather request failed: ${response.status}`);
            }

            return response.json();
        },
    );
}
