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

const directionIcons = [
    MdNorth,
    MdNorthEast,
    MdEast,
    MdSouthEast,
    MdSouth,
    MdSouthWest,
    MdWest,
    MdNorthWest,
];

const WindDirectionIcon = ({ degrees }) => {
    if (degrees == null) return null;

    const Icon = directionIcons[Math.round(degrees / 45) % 8];

    return <Icon aria-label={`Направление ветра: ${degrees}°`} role="img" />;
};

export default WindDirectionIcon;
