import React, { Component } from 'react'
import MapContainer from './MapContainer'
import Field from './Field'
import './Home.css'

export default class Home extends Component {
  state = {
    startAddress: "",
    endAddress: "",
    people: [
      {name: "", phoneNumber: "", address: "", passengerNum: 1}
    ],
    num: 1
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
  }

  render() {
    return (
      <div className="home-container">
        <div className="container-fluid">
          <div className="row">
            <div className="left_side col-md-4">
              <div className="panel-container">
				<div class="container">
					<img class="animated fadeInDown" src={require("./assets/hex_redone.png")}></img>
				</div>
					<p class="body">Carpuuling made right for everyone, everywhere.</p>
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
              </div>
            </div>
            <div className="right_side col-md-8">
              <div className="map-view-container animated fadeInRight">
                <MapContainer />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
