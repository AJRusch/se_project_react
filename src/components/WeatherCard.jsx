import "../blocks/weatherCard.css";
import { weatherStates, defaultWeatherState } from "../utils/constants";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";
import { useContext } from "react";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const temp = weatherData?.temp?.[currentTemperatureUnit] || 999;
  const selectedOption = weatherStates.find((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  let weatherState;

  if (selectedOption === undefined) {
    weatherState = defaultWeatherState[weatherData.isDay ? "day" : "night"];
  } else {
    weatherState = selectedOption;
  }

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {temp} &deg; {currentTemperatureUnit}
      </p>
      <img
        src={weatherState?.url}
        alt={`Card showing ${weatherState?.day ? "day" : "night"}time ${
          weatherState?.condition
        } weather`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
