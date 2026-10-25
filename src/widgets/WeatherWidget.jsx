import { useEffect } from "react";
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
import { getWeather } from "../shared/api/weather";
import { useWeather } from "../entities/weather/model/useWeather";
import { LATITUDE_ZP, LONGITUDE_ZP } from "../shared/configs/coordinates";
import weathersCode from "../shared/configs/weathersCode";

const WeatherWidget = () => {
    const { weather, setWeather, error } = useWeather(
        LATITUDE_ZP,
        LONGITUDE_ZP,
    );

    useEffect(() => {
        getWeather(LATITUDE_ZP, LONGITUDE_ZP)
            .then(({ current }) => setWeather(current))
            .catch(console.error);
    }, []);

    const temperature = weather?.temperature_2m;
    const windSpeed = weather?.wind_speed_10m;
    const windDirection = weather?.wind_direction_10m;
    const weatherInfo = weathersCode[weather?.weather_code];
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
                {`Wind: ${windSpeed} km/h`}
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
