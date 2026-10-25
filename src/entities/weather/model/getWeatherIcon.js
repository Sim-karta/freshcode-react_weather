import sunnyIcon from "../assets/sunny.svg";
import partlyCloudyIcon from "../assets/partly-cloudy.svg";
import cloudyIcon from "../assets/cloudy.svg";
import rainIcon from "../assets/rain.svg";
import snowIcon from "../assets/snow.svg";
import stormIcon from "../assets/storm.svg";

export function getWeatherIcon(weatherCode) {
    if (weatherCode == null) return cloudyIcon;
    if (weatherCode === 0) return sunnyIcon;
    if (weatherCode <= 2) return partlyCloudyIcon;
    if (weatherCode === 3 || weatherCode === 45 || weatherCode === 48) {
        return cloudyIcon;
    }
    if (weatherCode >= 51 && weatherCode <= 67) return rainIcon;
    if (weatherCode >= 71 && weatherCode <= 86) return snowIcon;
    if (weatherCode >= 95) return stormIcon;
    return cloudyIcon;
}
