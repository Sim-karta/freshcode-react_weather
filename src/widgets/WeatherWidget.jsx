import { useEffect, useState } from "react";
import { getWeather } from "../shared/api/weather.js";
import {
    MdNorth,
    MdNorthEast,
    MdEast,
    MdSouthEast,
    MdSouth,
    MdSouthWest,
    MdWest,
    MdNorthWest,
} from "react-icons/md";

const LATITUDE_ZP = 47.84;
const LONGITUDE_ZP = 35.14;

const WEATHERS_CODE = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",
    71: "Slight snowfall",
    73: "Moderate snowfall",
    75: "Heavy snowfall",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    97: "Heavy thunderstorm",
    99: "Thunderstorm with heavy hail",
};

const WeatherWidget = () => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        getWeather(LATITUDE_ZP, LONGITUDE_ZP)
            .then(({ current }) => setWeather(current))
            .catch(console.error);
    }, []);

    const temperature = weather?.temperature_2m;
    const windSpeed = weather?.wind_speed_10m;
    const windDirection = weather?.wind_direction_10m;
    const weatherInfo = WEATHERS_CODE[weather?.weather_code];
    const time = weather?.time;
    const dayAndTime = time
        ? new Date(`${time}Z`).toLocaleString("en-GB", {
              weekday: "long",
              hour: "2-digit",
              minute: "2-digit",
              timeZone: "UTC",
          })
        : "";

    const directions = [
        <MdNorth />,
        <MdNorthEast />,
        <MdEast />,
        <MdSouthEast />,
        <MdSouth />,
        <MdSouthWest />,
        <MdWest />,
        <MdNorthWest />,
    ];

    const windDirectionArrow =
        windDirection == null
            ? null
            : directions[Math.round(windDirection / 45) % 8];

    return (
        <div>
            <div>
                <img src="123" alt="" />
                <div>
                    <p>{dayAndTime}</p>
                    <p>{`${weatherInfo} ${temperature}`}</p>
                    <p>Zaporizhzhia, Ukraine</p>
                </div>
            </div>
            <div>
                {windDirectionArrow}
                {`Wind: ${windSpeed}`}
            </div>
            <div>
                <ul>
                    <li>Today</li>
                    <li>Tomorrow</li>
                    <li>Tuesday</li>
                    <li>Wendsday</li>
                    <li>Thursday</li>
                    <li>Friday</li>
                    <li>Saturday</li>
                </ul>
            </div>
        </div>
    );
};

export default WeatherWidget;
