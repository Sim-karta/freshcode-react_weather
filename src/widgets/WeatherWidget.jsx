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
    const weatherСode = weather?.weather_code;
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
                    <p>{`Cloudy ${temperature}`}</p>
                    <p>Zaporizhzhia, Ukraine</p>
                </div>
            </div>
            <div>
                {windDirectionArrow}
                {`Wind: ${windSpeed} ${weatherСode}`}
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
