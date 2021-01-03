import React, { Component } from "react";
import Forecast from "./Forecast";
import AddCityName from "./AddCityName";
import CityAndCountryName from "./CityName";
import axios from "axios";

class App extends Component {
  state = {
    city: "",
    country: "",
    countryCode: "",
    countryData: null,
    data: null,
    error: false,
    loading: true,
  };

  cityName = ({ city }) => {
    this.setState({
      city,
    });
  };
  countryName = ({ country }) => {
    this.setState({
      country,
    });
  };

  countryNameHttpRequest = (countryName) => {
    this.setState({
      error: false,
      loading: true,
    });
    return axios
      .get("http://vocab.nic.in/cla.php?cat=mast&info=country&format=json")
      .then((res) => {
        const countriesArray = res.data.countries;
        const theCountries = countriesArray.map((country) => {
          let countryNameJson = country.country.country_name;
          let countryCodeJson = country.country.country_id;

          if (
            countryNameJson === countryName.toUpperCase() ||
            countryCodeJson === countryName.toUpperCase()
          ) {
            this.setState({
              country: ", " + countryCodeJson,
              countryCode: countryCodeJson,
            });
          }
        });
        this.setState({
          error: false,
          loading: false,
        });
      })
      .catch(() => {
        this.setState({
          country: "",
          error: true,
          loading: false,
        });
      });
  };

  cityNameHttpRequest = (cityName) => {
    this.setState({
      error: false,
      loading: true,
    });
    return axios
      .get(
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
          cityName +
          "," +
          this.state.countryCode +
          "&units=metric&mode=json&appid=da9a9244afcf9ed561791ea2692cfa45"
      )
      .then((res) => {
        this.setState({
          city: cityName,
          data: res.data.list,
          error: false,
          loading: false,
        });
      })
      .catch(() => {
        this.setState({
          city: "",
          error: true,
          loading: false,
        });
      });
  };

  render() {
    return (
      <div className="container">
        <AddCityName
          cityName={this.cityName}
          cityNameHttpRequest={this.cityNameHttpRequest}
          countryName={this.countryName}
          countryNameHttpRequest={this.countryNameHttpRequest}
        />

        <CityAndCountryName
          cityName={this.state.city}
          countryName={this.state.country}
        />
        <Forecast
          data={this.state.data}
          countryData={this.state.countryData}
          error={this.state.error}
          loading={this.state.loading}
        />
      </div>
    );
  }
}

export default App;
