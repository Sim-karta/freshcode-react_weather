import weathersCode from "../../../shared/configs/weathersCode";

export function getWeatherViewData(weather) {
    if (!weather) return null;

    const time = weather.time;

    return {
        temperature: weather.temperature_2m,
        windSpeed: weather.wind_speed_10m,
        windDirection: weather.wind_direction_10m,
        weatherInfo: weathersCode[weather.weather_code] ?? "Unknown",
        dayAndTime: time
            ? new Date(`${time}Z`).toLocaleString("en-GB", {
                  weekday: "long",
                  hour: "2-digit",
                  minute: "2-digit",
                  timeZone: "UTC",
              })
            : "",
    };
}
