import weathersCode from "../../../shared/configs/weathersCode";
import {
    convertTemperature,
    convertWindSpeed,
} from "./convertWeatherUnits";

export function getWeatherViewData(
    weather,
    temperatureUnit = "celsius",
    windSpeedUnit = "kmh",
) {
    if (!weather) return null;

    const time = weather.time;
    const temperature = convertTemperature(
        weather.temperature_2m,
        temperatureUnit,
    );
    const windSpeed = convertWindSpeed(
        weather.wind_speed_10m,
        windSpeedUnit,
    );

    return {
        temperature: `${Number(temperature.toFixed(1))}°${temperatureUnit === "fahrenheit" ? "F" : "C"}`,
        windSpeed: Number(windSpeed.toFixed(1)),
        windDirection: weather.wind_direction_10m,
        weatherCode: weather.weather_code,
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
