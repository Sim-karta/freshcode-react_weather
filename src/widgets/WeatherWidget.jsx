import { useState } from "react";
import { useWeather } from "../entities/weather/model/useWeather";
import { getWeatherViewData } from "../entities/weather/model/getWeatherViewData";
import { getWeatherIcon } from "../entities/weather/model/getWeatherIcon";
import { LATITUDE_ZP, LONGITUDE_ZP } from "../shared/configs/coordinates";
import WindDirectionIcon from "../entities/weather/ui/WindDirectionIcon";
import styles from "./WeatherWidget.module.scss";
import forecastDays from "../shared/data/forecastDays";

const WeatherWidget = () => {
    const { weather } = useWeather(LATITUDE_ZP, LONGITUDE_ZP);

    const [temperatureUnit, setTemperatureUnit] = useState("celsius");
    const [windSpeedUnit, setWindSpeedUnit] = useState("kmh");

    const weatherView = getWeatherViewData(
        weather,
        temperatureUnit,
        windSpeedUnit,
    );

    return (
        <div className={styles.widget}>
            <div className={styles.widgetUnits}>
                <label className={styles.unitControl}>
                    <span>Temperature</span>
                    <select
                        aria-label="Temperature unit"
                        value={temperatureUnit}
                        onChange={(event) =>
                            setTemperatureUnit(event.target.value)
                        }
                    >
                        <option value="celsius">°C</option>
                        <option value="fahrenheit">°F</option>
                    </select>
                </label>
                <label className={styles.unitControl}>
                    <span>Wind speed</span>
                    <select
                        aria-label="Wind speed unit"
                        value={windSpeedUnit}
                        onChange={(event) =>
                            setWindSpeedUnit(event.target.value)
                        }
                    >
                        <option value="ms">M/s</option>
                        <option value="kmh">Km/h</option>
                    </select>
                </label>
            </div>
            <div className={styles.widgetHeader}>
                <img
                    className={styles.widgetConditionIcon}
                    src={getWeatherIcon(weatherView?.weatherCode)}
                    alt={weatherView?.weatherInfo ?? "Current weather"}
                />
                <div className={styles.widgetDetails}>
                    <p className={styles.widgetTime}>
                        {weatherView?.dayAndTime}
                    </p>
                    <p className={styles.widgetCondition}>
                        {`${weatherView?.weatherInfo} ${weatherView?.temperature}`}
                    </p>
                    <p className={styles.widgetLocation}>
                        Zaporizhzhia, Ukraine
                    </p>
                </div>
            </div>
            <div className={styles.widgetWind}>
                <p className={styles.widgetWindSpeed}>
                    {`Wind: ${weatherView?.windSpeed} ${windSpeedUnit === "ms" ? "M/s" : "Km/h"}`}
                </p>
                <WindDirectionIcon
                    className={styles.widgetWindDirection}
                    degrees={weatherView?.windDirection}
                />
            </div>
            <div className={styles.widgetForecast}>
                <ul className={styles.forecastList}>
                    {forecastDays.map(({ name, iconCode }, index) => (
                        <li
                            className={`${styles.forecastDay} ${
                                index === 0 ? styles.forecastToday : ""
                            }`}
                            key={name}
                        >
                            <span className={styles.forecastDayName}>
                                {name}
                            </span>
                            <img
                                className={styles.forecastIcon}
                                src={getWeatherIcon(iconCode)}
                                alt=""
                                aria-hidden="true"
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default WeatherWidget;
