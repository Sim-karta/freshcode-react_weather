import { useEffect, useState } from "react";
import { getWeather } from "../../../shared/api/weather.js";

export function useWeather(latitude, longitude) {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        getWeather(latitude, longitude)
            .then(({ current }) => {
                setWeather(current);
                setError(null);
            })
            .catch(setError);
    }, [latitude, longitude]);

    return { weather, setWeather, error };
}
