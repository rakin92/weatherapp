import React from "react";
import Weather from "./components/weather";
import Form from "./components/form";

const Api_Key = process.env.REACT_APP_WEATHER_API_KEY;
const API_URL = 'http://api.openweathermap.org/data/2.5';

class App extends React.Component {

  state = {
    latitude: '',
    longitude: '',
    units: 'imperial',
    temperature: '',
    city: '',
    country: 'US',
    humidity: '',
    pressure: '',
    error: ''
  }

  componentDidMount = () => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getCurrentLocation);
    } else {
      console.log("Geolocation not supported by the browser")
    }
  }

  getCurrentLocation = (position) => {
    const { latitude, longitude } = position.coords;
    this.setState({ latitude, longitude }, async () => {
      const response = await this.getLatLongData(latitude, longitude);
      this.updateStateInfo(response);
    });
  }

  // could trigger some loading action
  getLatLongData = async (latitude, longitude) => {
    const { units } = this.state;
    const apiCall = await fetch(`${API_URL}/find?lat=${latitude}&lon=${longitude}&cnt=1&units=${units}&appid=${Api_Key}`);
    const response = await apiCall.json();
    return response.list[0];
  }

  // could trigger some loading action
  getCityData = async (city) => {
    const { country, units } = this.state;
    const apiCall = await fetch(`${API_URL}/weather?q=${city},${country}&units=${units}&appid=${Api_Key}`);
    const response = await apiCall.json();
    return response;
  }

  updateStateInfo = (response) => {
    this.setState({
      temperature: response.main.temp,
      city: response.name,
      country: response.sys.country,
      humidity: response.main.humidity,
      pressure: response.main.pressure,
      error: ""
    })
  }

  //getWeather is a method we'll use to make the api call
  getWeather = async (e) => {
    e.preventDefault();

    let response = {};
    const search = e.target.elements.search.value;
    const latAndLon = search.split(',')

    if (latAndLon.length === 2) {
      response = await this.getLatLongData(latAndLon[0], latAndLon[1])
    } else {
      response = await this.getCityData(latAndLon[0])
    }
   
    if(response && response.name){
      this.updateStateInfo(response);
    }
  }

  render() {

    return (

      <div>
         <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-12 form-container">
                <Form loadWeather={this.getWeather} />
                  <Weather
                    temperature={this.state.temperature}
                    city={this.state.city}
                    country={this.state.country}
                    humidity={this.state.humidity}
                    pressure={this.state.pressure}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}
export default App;
