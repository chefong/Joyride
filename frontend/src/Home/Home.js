import React, { Component } from 'react'
import MapContainer from './MapContainer'
import Field from './Field'
import Pickup from './Pickup'
import './Home.css'

import axios from 'axios'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';



export default class Home extends Component {
	


  state = {
    startAddress: "",
    endAddress: "",
    people: [
      {name: "", phoneNumber: "", address: "", passengerNum: 1}
    ],
    num: 1,
    requested: false,
    allPassengers: []
  }

  handleClick = e => {
    e.preventDefault()

    if (this.state.num >= 5) {
      return
    }

    let person = {name: "", phoneNumber: "", address: "", passengerNum: this.state.people.length + 1}
    let passengers = this.state.people
    passengers.push(person)

    this.setState({
      people: passengers,
      num: this.state.num + 1
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    
    let allPassengers = []

    let startAddress = e.target.elements.startAddress.value
    let endAddress = e.target.elements.endAddress.value

    this.setState({startAddress, endAddress})

    if (this.state.people.length <= 1) {
      let passengerName = e.target.elements.pName.value
      let passengerPhoneNumber = e.target.elements.pPhoneNumber.value
      let passengerAddress = e.target.elements.pAddress.value

      let passenger = {
        name: passengerName,
        phoneNumber: passengerPhoneNumber,
        address: passengerAddress
      }

      allPassengers.push(passenger)
    }
    else {
      for (let i = 0; i < this.state.people.length; ++i) {
        let passengerName = e.target.elements.pName[i].value
        let passengerPhoneNumber = e.target.elements.pPhoneNumber[i].value
        let passengerAddress = e.target.elements.pAddress[i].value

        let passenger = {
          name: passengerName,
          phoneNumber: passengerPhoneNumber,
          address: passengerAddress
        }

        allPassengers.push(passenger)
      }
    }
    console.log(allPassengers)
    this.setState({ allPassengers, requested: true })

    // axios.post(`https://cors-anywhere.herokuapp.com/` + `http://cecde3f4.ngrok.io/foo`, JSON.stringify(allPassengers)).then(res => {
    //   console.log(res)
    //   this.setState({requested: true})
    // }).catch(err => {
    //   console.log(err)
    // })
  }

  render() {
    return (
      <div className="home-container">
        <div className="container-fluid">
          <div className="row">
            <div className="left_side col-md-4">
              <div class="container">
                  <img class="hex animated fadeInDown" src={require("./assets/hex_redone.png")}></img>
              </div>
              <p class="body">Carpuuling made right for everyone, everywhere.</p>
              { !this.state.requested && <div className="panel-container">
                <form onSubmit={this.handleSubmit}>
                  <div className="start-address-container">
                    <div className="row justify-content-center">
                      <p>Start Address</p>
                    </div>
                    <div className="row justify-content-center">
                      <input class="form-control" type="text" placeholder="Start Address" name="startAddress" id="startAddress" />
                    </div>
                  </div>
                  <div className="form-container" name="passengerForm">
                    { this.state.people && this.state.people.map(person => {
                      return <Field name={person.name} phoneNumber={person.phoneNumber} address={person.address} passengerNum={person.passengerNum}/>
                    }) }
                  </div>
                  <div className="end-address-container">
                    <div className="row justify-content-center">
                      <p>End Address</p>
                    </div>
                    <div className="row justify-content-center">
                      <input class="form-control" type="text" placeholder="End Address" name="endAddress" id="endAddress"/>
                    </div>
                  </div>
  				        <div className="row justify-content-center">
                    <button type="button" class="btn btn-light plusButton" onClick={this.handleClick}>+</button>
                  </div>
                  <div id="submit" className="row justify-content-center">
                    <div className="submit-button-container">
                      <button type="submit" class="btn btn-light submit-button">Submit</button>
                    </div>
                  </div>
                </form>
              </div> }
              { this.state.requested && <Pickup allPassengers={ this.state.allPassengers }/> }
            </div>
            <div className="col-md-8">
              <div className="map-view-container">
                <MapContainer allPassengers={ this.state.allPassengers }/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class LocationSearchInput extends React.Component {


  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}
