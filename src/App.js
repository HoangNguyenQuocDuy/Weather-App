import { useState, useEffect, useRef } from "react";
import axios from "axios";

import Input from "./components/Input";
import CityTime from "./components/CityTime";
import Weather from "./components/Weather";
import ForeCast from "./components/ForeCast";
import { city } from "./store/reducer";

function App() {
  const [currentWeather, setCurrentWeather] = useState();
  const [forecast, setForecast] = useState();
  const inpRef = useRef()

  const handleSearch = () => {
    if (city) {
      console.log("city: ", city);
      const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${city.value.lat}&lon=${city.value.lon}&appid=e145395ec9e5aba9c8e24db1b2622176`;
      const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${city.value.lat}&lon=${city.value.lon}&appid=e145395ec9e5aba9c8e24db1b2622176`;

      axios
        .all([axios.get(currentWeatherURL), axios.get(forecastURL)])
        .then(
          axios.spread((currentWeatherRes, forecastRes) => {
            console.log("currentWeatherRes: ", currentWeatherRes);
            console.log("forecastRes: ", forecastRes);
            setCurrentWeather({
              city: `${city.label.city}`,
              countryCode: `${city.label.countryCode}`,
              ...currentWeatherRes.data,
            });
            setForecast({
              city: `${city.label.city}`,
              countryCode: `${city.label.countryCode}`,
              ...forecastRes.data,
            });
          })
        )
        .catch((error) => console.error(error));
    }
    inpRef.current.focus()
  };

  return (
    <div className="App">
      <Input  onClickSearch={handleSearch} ref={inpRef} />
      {currentWeather === undefined ? (
        <div className="one">Enter Your City :3</div>
      ) : (
        <>
          <CityTime data={currentWeather} />
          <Weather data={currentWeather} dayTime={forecast} />
          <ForeCast data={forecast} />
        </>
      )}
    </div>
  );
}

export default App;
