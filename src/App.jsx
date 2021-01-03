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
    countryError: false,
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
        countriesArray.forEach(
          ({
            country: {
              country_name: countryNameJson,
              country_id: countryCodeJson,
            },
          }) => {
            if (
              countryNameJson === countryName.toUpperCase() ||
              countryCodeJson === countryName.toUpperCase()
            ) {
              this.setState({
                country: countryCodeJson,
                countryCode: countryCodeJson,
              });
              this.setState({
                countryError: false,
                loading: false,
              });
              return;
            }
          }
        );
        if (this.state.country && this.state.countryCode) {
          return;
        } else {
          this.setState({
            countryError: true,
            loading: false,
          });
        }
      })
      .catch(() => {
        this.setState({
          country: "",
          countryError: true,
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
          countryError={this.state.countryError}
          error={this.state.error}
        />
        <Forecast
          data={this.state.data}
          countryData={this.state.countryData}
          countryError={this.state.countryError}
          error={this.state.error}
          loading={this.state.loading}
        />
      </div>
    );
  }
}

export default App;
