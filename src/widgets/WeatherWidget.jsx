import { useEffect } from "react";
import { getWeather } from "../shared/api/weather";
import { useWeather } from "../entities/weather/model/useWeather";
import { getWeatherViewData } from "../entities/weather/model/getWeatherViewData";
import { LATITUDE_ZP, LONGITUDE_ZP } from "../shared/configs/coordinates";
import WindDirectionIcon from "../entities/weather/ui/WindDirectionIcon";
import styles from "./WeatherWidget.module.scss";

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
                    <li
                        className={`${styles.forecastDay} ${styles.forecastToday}`}
                    >
                        Today
                    </li>
                    <li className={styles.forecastDay}>Tomorrow</li>
                    <li className={styles.forecastDay}>Tuesday</li>
                    <li className={styles.forecastDay}>Wendsday</li>
                    <li className={styles.forecastDay}>Thursday</li>
                    <li className={styles.forecastDay}>Friday</li>
                    <li className={styles.forecastDay}>Saturday</li>
                </ul>
            </div>
        </div>
    );
};

export default WeatherWidget;
