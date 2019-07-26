import React from "react";
import axios from "axios";
import Weather from "./Weather";
import SearchBar from "./SearchBar";
import "./App.css";

class App extends React.Component {
  state = {
    lat: null,
    long: null,
    currTemp: null,
    maxTemp: null,
    minTemp: null,
    description: "",
    city: "",
    country: "",
    icon: "",
    gif: "",
    errorMessage: ""
  };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          lat: position.coords.latitude,
          long: position.coords.longitude
        });

        (async () => {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${
              this.state.lat
            }&lon=${
              this.state.long
            }&units=metric&appid=bc6f01ce4a4123c452f9698f179544f6`
          );

          this.setWeather(
            `${Math.round(response.data.main.temp)}\xB0`,
            Math.round(response.data.main.temp_max),
            Math.round(response.data.main.temp_min),
            response.data.weather[0].description,
            response.data.sys.country,
            response.data.name,
            response.data.weather[0].main
          );
        })().catch(error => {
          console.log(error);
        });
      },
      err => {
        this.setState({ errorMessage: err.message });
      }
    );
  }

  setWeather(
    currTemp_,
    maxTemp_,
    minTemp_,
    description_,
    country_,
    city_,
    shortDescription
  ) {
    this.setState({
      currTemp: currTemp_,
      maxTemp: maxTemp_,
      minTemp: minTemp_,
      description: description_,
      country: country_,
      city: city_
    });

    if (shortDescription === "Rain") {
      this.setState({ icon: "icon ion-md-rainy", gif: "rain" });
    } else if (shortDescription === "Clouds") {
      this.setState({ icon: "icon ion-md-cloudy", gif: "clouds" });
    } else if (shortDescription === "Snow") {
      this.setState({ icon: "icon ion-md-snow", gif: "snow" });
    } else {
      this.setState({ icon: "icon ion-md-sunny", gif: "sun" });
    }
  }

  onSearchSubmit = async city => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=bc6f01ce4a4123c452f9698f179544f6`
      );
      this.setWeather(
        `${Math.round(response.data.main.temp)}\xB0`,
        Math.round(response.data.main.temp_max),
        Math.round(response.data.main.temp_min),
        response.data.weather[0].description,
        response.data.sys.country,
        response.data.name,
        response.data.weather[0].main
      );
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    if (this.state.errorMessage && (!this.state.lat && !this.state.long)) {
      return <div className="center">Error: {this.state.errorMessage}</div>;
    }

    if (!this.state.errorMessage && (this.state.lat && this.state.long)) {
      return (
        <div>
          <Weather
            currentTemp={this.state.currTemp}
            maxTemp={this.state.maxTemp}
            minTemp={this.state.minTemp}
            description={this.state.description}
            country={this.state.country}
            city={this.state.city}
            icon={this.state.icon}
            gif={this.state.gif}
          >
            <SearchBar onSubmit={this.onSearchSubmit} />
          </Weather>
        </div>
      );
    }

    return <div className="center loading-screen"></div>;
  }
}

export default App;
