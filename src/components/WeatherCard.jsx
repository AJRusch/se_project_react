import "../blocks/weatherCard.css";
import { weatherState, defaultWeatherState } from "../utils/constants";

function WeatherCard({ weatherData }) {
  const filteredOptions = weatherState.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  let weatherCurrentState;
  if (filteredOptions.length === 0) {
    weatherCurrentState =
      defaultWeatherState[weatherData.isDay ? "day" : "night"];
  } else {
    weatherCurrentState = filteredOptions[0];
  }

  return (
    <>
      <section className="weather-card">
        <p className="weather-card__temp">{weatherData.temp.F} &deg; F</p>
        <img
          src={weatherCurrentState?.url}
          alt={`Card showing ${
            weatherCurrentState?.day ? "day" : "night"
          }time ${weatherCurrentState?.condition} weather`}
          className="weather-card__image"
        />
      </section>
    </>
  );
}

export default WeatherCard;
