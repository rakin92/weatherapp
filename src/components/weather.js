import React from "react";

class Weather extends React.Component{

    render(){

        return(

            <div className="weather-info">
                {
                    this.props.country && this.props.city && <p className="weather-key">Location: 
                        <span className="weather-value">  {this.props.city}, {this.props.country}</span>                    
                    </p> 
                }
                
                {
                    this.props.temperature && <p className="weather-key">Temperature: 
                        <span className="weather-value">  {this.props.temperature}</span>
                    </p>
                }

                {
                    this.props.humidity && <p className="weather-key">Humidity: 
                        <span className="weather-value">  {this.props.humidity}</span>
                    </p>
                }

                {
                    this.props.pressure && <p className="weather-key">Pressure:
                        <span className="weather-value">  {this.props.pressure}</span>
                    </p>
                }

                {
                    this.props.error && <p className="weather-error">{this.props.error}</p>
                }
        
            </div>
        )
    }
}

export default Weather;