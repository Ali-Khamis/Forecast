const CityAndCountryName = ({ cityName, countryName, error, countryError }) => {
  const capitalizeFirstLetter = () => {
    let capCityName = "";
    if (cityName !== undefined) {
      capCityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
    }
    return capCityName;
  };
  if (error) {
    return null;
  } else {
    return (
      <div>
        <h1 className="CityName">
          Forecast for: {capitalizeFirstLetter(cityName)}
          {countryName && ","}
          {countryName}
        </h1>
      </div>
    );
  }
};
export default CityAndCountryName;
