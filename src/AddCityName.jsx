import React, { Component } from "react";
class AddCityName extends Component {
  state = {
    city: "",
    country: "",
    countryCode: "",
  };
  handleCityChange = (e) => {
    this.setState({
      city: e.target.value,
    });
  };

  handleCountryChange = (e) => {
    this.setState({
      country: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    await this.props.countryName(this.state.country);
    await this.props.countryNameHttpRequest(this.state.country);
    await this.props.cityName(this.state.city);
    await this.props.cityNameHttpRequest(this.state.city);
    this.setState({
      city: "",
      country: "",
    });
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="City_search">
            <label className="country__label" htmlFor="CitySearch">
              The Country:
            </label>
            <input
              id="CitySearch"
              type="text"
              onChange={this.handleCountryChange}
              value={this.state.country}
              required
            />
            <div className="border"></div>
          </div>
          <div className="City_search">
            <label className="label" htmlFor="CitySearch">
              The City:
            </label>
            <input
              id="CitySearch"
              type="text"
              onChange={this.handleCityChange}
              value={this.state.city}
              required
            />
            <div className="border"></div>
          </div>
          <button>City Search</button>
        </form>
      </div>
    );
  }
}
export default AddCityName;
