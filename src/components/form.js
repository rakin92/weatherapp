import React from "react";

class Form extends React.Component{

    render(){

        return(
            <form onSubmit = {this.props.loadWeather}>
                <input type="text" name="search" placeholder="Search City or Latitude,Longitude"/>
                <button>Get Weather</button>
            </form>
           
        )
    }
}

export default Form;