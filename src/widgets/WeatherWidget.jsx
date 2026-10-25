import { useEffect } from "react";
import { getWeather } from "../shared/api/weather";
import { useWeather } from "../entities/weather/model/useWeather";
import { getWeatherViewData } from "../entities/weather/model/getWeatherViewData";
import { getWeatherIcon } from "../entities/weather/model/getWeatherIcon";
import { LATITUDE_ZP, LONGITUDE_ZP } from "../shared/configs/coordinates";
import WindDirectionIcon from "../entities/weather/ui/WindDirectionIcon";
import styles from "./WeatherWidget.module.scss";
import forecastDays from "../shared/data/forecastDays";

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

    const weatherView = getWeatherViewData(weather);

    return (
        <div className={styles.widget}>
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
                <p
                    className={styles.widgetWindSpeed}
                >{`Wind: ${weatherView?.windSpeed} km/h`}</p>
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
