import "./App.css";
import { useState, useEffect } from "react";
import SearchIcon from "./assets/SearchIcon";
import Cloud from "./assets/Cloud";
function App() {
  const [city, setcity] = useState(null);
  const [searchcity, setsearchcity] = useState("Mumbai");
  const [cityinfo, setcityinfo] = useState({});

  const showWeather = () => {
    setsearchcity(city);
  };

  useEffect(() => {
    fetchapi(searchcity);
  }, [searchcity]);

  const fetchapi = async (searchcity) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${searchcity}&appid=e649cadd1f8725a9081f5d331f1f0c7f`;
    const response = await fetch(url);
    const res = await response.json();
    setcityinfo({
      temp: res?.main?.temp,
      max_temp: res?.main?.temp_max,
      min_temp: res?.main?.temp_min,
      description: res?.weather?.[0]?.description,
      wind: res?.wind?.speed,
      pressure: res?.main?.pressure,
      humidity: res?.main?.humidity,
    });
  };

  console.log(cityinfo);

  const changecity = (e) => {
    let city = e.target.value;
    setcity(city);
  };

  return (
    <div className="app">
      <div className="container">
        <div className="search">
          <input
            type="text"
            name="search"
            value={city}
            placeholder="Enter City Name"
            onChange={(e) => changecity(e)}
          />
          <div className="searchbutton" onClick={() => showWeather()}>
            <SearchIcon className="searchIncon" />
          </div>
        </div>
        <div className="weather-info">
          <div>Weather in {searchcity}</div>
          <div>
            {cityinfo?.temp ? (cityinfo?.temp - 273.15).toFixed(2) : "-"}{" "}
            <sup>o</sup>C
          </div>
          <div>{cityinfo?.description ?? "-"}</div>
          <div>Humidity: {cityinfo?.humidity ?? "-"}%</div>
          <div>Wind Speed: {cityinfo?.wind ?? "-"} km/hr</div>
        </div>
      </div>
    </div>
  );
}

export default App;
