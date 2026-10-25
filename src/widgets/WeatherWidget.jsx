import { useEffect } from "react";
import { getWeather } from "../shared/api/weather";
import { useWeather } from "../entities/weather/model/useWeather";
import { getWeatherViewData } from "../entities/weather/model/getWeatherViewData";
import { LATITUDE_ZP, LONGITUDE_ZP } from "../shared/configs/coordinates";
import WindDirectionIcon from "../entities/weather/ui/WindDirectionIcon";

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
        <div>
            <div>
                <img src="123" alt="" />
                <div>
                    <p>{weatherView?.dayAndTime}</p>
                    <p>{`${weatherView?.weatherInfo} ${weatherView?.temperature}`}</p>
                    <p>Zaporizhzhia, Ukraine</p>
                </div>
            </div>
            <div>
                <WindDirectionIcon degrees={weatherView?.windDirection} />
                {`Wind: ${weatherView?.windSpeed} km/h`}
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
