const CityAndCountryName = ({ cityName, countryName }) => {
  const capitalizeFirstLetter = () => {
    let capCityName = "";
    if (cityName !== undefined) {
      capCityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
    }
    return capCityName;
  };
  return (
    <div>
      <h1 className="CityName">
        Forecast for: {capitalizeFirstLetter(cityName)}
        {countryName && ","}
        {countryName}
      </h1>
    </div>
  );
};
export default CityAndCountryName;
