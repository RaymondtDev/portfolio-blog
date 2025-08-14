import { useEffect, useState } from "react";
import { getWeatherIcon } from "../../utils/getWeatherIcon";
import axios from "axios";
import Spinner from "../../components/ux/Spinner";
import { TbTemperatureCelsius } from "react-icons/tb";
import { IoIosArrowUp } from "react-icons/io";

function WeatherWidget() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [display, setDisplay] = useState(false);

  const latitude = -25.404228267765568;
  const longitude = 28.792217950096394;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`
        );

        console.log(response);

        if (response.status === 200) {
          setForecast(response.data.daily);
          setLoading(false);
        }
        console.log("Weather data fetched successfully.");
      } catch (error) {
        console.error("Error fetching weather:", error);
        setLoading(false);
      }
    };

    const fetchCurrentWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`
        );
        if (response.status === 200) {
          setCurrentWeather(response.data.current_weather);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching weather:", error);
        setLoading(false);
      }
    };

    fetchWeather();
    fetchCurrentWeather();
  }, []);

  if (loading)
    return (
      <div className="grid place-tems-center absolute left-0 right-0 bottom-0 w-full h-fit p-1.5 border-t">
        <Spinner />
      </div>
    );
  if (!forecast) return <p>No weather data available.</p>;

  return (
    <div className="grid grid-cols-2 absolute left-0 right-0 bottom-0 w-full h-fit p-1.5 border-t">
      <div className="flex justify-evenly items-center col-span-2 bg-slate-50 rounded-sm shadow h-fit py-2">
        <div className="h-24 aspect-square flex items-center justify-center">
          <img
            src={`/icons/${getWeatherIcon(currentWeather.weathercode)}`}
            alt="weather icon"
            className="w-full h-auto object-contain"
          />
        </div>
        <div className="flex flex-col">
          <small>{new Date(currentWeather.time).toLocaleTimeString("en-US", { hour12: true, hour: "numeric", minute: "2-digit" })}</small>
          <p className="text-2xl font-bold">Today</p>
          <p className="flex items-center font-bold text-2xl">{Math.round(currentWeather.temperature)}<TbTemperatureCelsius /></p>
        </div>
      </div>

      <button className="flex justify-center w-full bg-slate-50 my-1 col-span-2 text-3xl cursor-pointer" onClick={() => setDisplay(!display)}>
        <IoIosArrowUp className={`transition duration-1000 ${display && "rotate-180"}`}/>
      </button>

      <div className={`grid col-span-2 grid-cols-subgrid gap-1 transition duration-1000 ${display ? "translate-y-0" : "-translate-y-full hidden"} z-50`}>
        {forecast.time.slice(1, 3).map((date, index) => {
          const code = forecast.weathercode[index];
          const icon = getWeatherIcon(code);

          return (
          <div key={date} className="flex items-center justify-center gap-2 bg-slate-50 rounded-sm shadow py-2">
            <div className="h-10 aspect-square flex items-center justify-center">
              <img
                src={`/icons/${icon}`}
                alt="weather icon"
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="flex gap-2 items-center justify-center">
              <p>
                {new Date(date).toLocaleDateString(undefined, {
                  weekday: "short",
                })}
              </p>
              <p className="flex justify-center items-center font-bold">{Math.round(forecast.temperature_2m_max[index])}<TbTemperatureCelsius /></p>
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
}

export default WeatherWidget;
