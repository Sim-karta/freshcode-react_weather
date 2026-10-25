export function convertTemperature(celsius, unit) {
    if (unit === "fahrenheit") {
        return (celsius * 9) / 5 + 32;
    }

    return celsius;
}

export function convertWindSpeed(kilometersPerHour, unit) {
    if (unit === "ms") {
        return kilometersPerHour / 3.6;
    }

    return kilometersPerHour;
}
