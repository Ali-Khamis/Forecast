import rain from "./images/rain.jpg";
import clouds from "./images/Clouds.jpg";
import sunny from "./images/Sunny.jpg";

const Forecast = ({ data, loading, error }) => {
  function formatDate(string) {
    let options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  }
  let dateName, dayName, Temp, noData, img;

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  if (error) {
    return <h1>Sorry there has been a problem getting the results</h1>;
  }
  if (loading) {
    return <h1>Loading the city's forecast</h1>;
  }

  if (data) {
    let fiveDaysForecast = [],
      previousDate = 9999;

    for (let i = 0; i < data.length; i++) {
      let currentDate = new Date(data[i].dt_txt).getDay();
      if (i > 0) {
        previousDate = new Date(data[i - 1].dt_txt).getDay();
      }
      if (currentDate !== previousDate) {
        fiveDaysForecast.push(data[i]);
      }
    }

    let weather = "";
    const theCards = fiveDaysForecast.map((day) => {
      if (day.weather[0].main === "Rain") {
        weather = rain;
      } else if (day.weather[0].main === "Clouds") {
        weather = clouds;
      } else {
        weather = sunny;
      }
      img = <img className="forecast__img" src={weather} alt="" />;
      const dayDate = new Date(day.dt_txt);
      let key = Math.random();
      const dayNumber = dayDate.getDay();
      dayName = days[dayNumber];
      dateName = formatDate(day.dt_txt);
      Temp = "Temp: " + day.main.temp + "°C";
      noData = "";
      return (
        <div className="card__container" key={key}>
          <h1 className="dayName">{dayName}</h1>
          <h2 className="date">{dateName}</h2>
          <div className="temp__container">
            <h1>{noData}</h1>
            <p className="temp__min"> {Temp}</p>
          </div>
          {img}
        </div>
      );
    });
    return <div className="cards__container">{theCards}</div>;
  } else {
    return (
      <div className="card__container">
        <h1>Enter your city name, please</h1>
      </div>
    );
  }
};

export default Forecast;
