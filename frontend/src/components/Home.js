import React, { Component } from 'react'
import MapContainer from './MapContainer'
import Field from './Field'
import Pickup from './Pickup'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './Home.css'

import axios from 'axios'

const hexLogo = require("../assets/hex_redone.png")
const dotsDown = require('../assets/dotsdown.png')
const dotsUp = require('../assets/dotsup.png')
const spinner = require('../assets/spinner.svg')

export default class Home extends Component {

  state = {
    startAddress: "",
    endAddress: "",
    people: [
      {name: "", phoneNumber: "", address: "", passengerNum: 1}
    ],
    num: 1,
    requested: false,
    allPassengers: [],
    isLoading: false,
    error: false
  }

  handlePlusClick = e => {
    e.preventDefault()

    if (this.state.num >= 3) {
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

  handleMinusClick = e => {
    e.preventDefault()
    
    if (this.state.num <= 1) {
      return
    }

    let passengers = this.state.people
    passengers.pop()

    this.setState({
      people: passengers,
      num: this.state.num - 1
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    
    let allPassengers = []

    let startAddress = e.target.elements.startAddress.value
    let endAddress = e.target.elements.endAddress.value
    console.log(startAddress)
    console.log(endAddress)

    this.setState({startAddress, endAddress, isLoading: true})

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

    axios.post(`https://cors-anywhere.herokuapp.com/` + `http://9b773ac3.ngrok.io/foo`,
      JSON.stringify({
        startAddress,
        endAddress,
        allPassengers
      })
    ).then(res => {
      console.log(res.data)
      this.setState({
        requested: true,
        allPassengers: res.data,
        isLoading: false
      })
    }).catch(err => {
      console.log(err)
      this.setState({
        isLoading: false
      })
      toast.error("Error!")
    })
  }

  handleImageClick = () => {
    this.setState({
      requested: false,
      allPassengers: []
    })
  }

  render() {
    return (
      <div className="home-container">
        <div className="container-fluid">
          <div className="row">
            <div className="left_side col-md-4">
              <div class="container">
                <div className="hex-container">
                  <img class="hex animated fadeIn" src={ hexLogo } onClick={this.handleImageClick}></img>
                </div>
              </div>
              { !this.state.requested && <div className="panel-container">
                <form onSubmit={this.handleSubmit}>
                  <div className="start-address-container">
                    <div className="row">
                      <p className="start-end">Start Address</p>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <input class="form-control" type="text" placeholder="Start Address" name="startAddress" id="startAddress" />
                      </div>
                    </div>
                  </div>
                  <div className="dots-container">
                    <div className="row justify-content-center">
                      <img className="dotsDown" src={ dotsDown } alt=""/>
                    </div>
                  </div>
                  <div className="form-container" name="passengerForm">
                    { this.state.people && this.state.people.map(person => {
                      return <Field name={person.name} phoneNumber={person.phoneNumber} address={person.address} passengerNum={person.passengerNum}/>
                    }) }
                  </div>
                  <div className="adjust-container">
                    <div className="row justify-content-center">
                      <div className="col-md-2">
                        <div className="adjust-button-container">
                          <button type="button" class="btn-light plusButton" onClick={this.handlePlusClick}>+</button>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className="adjust-button-container">
                          <button type="button" class="btn-light minusButton" onClick={this.handleMinusClick}>-</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="dots-container">
                    <div className="row justify-content-center">
                      <img className="dotsUp" src={ dotsUp } alt=""/>
                    </div>
                  </div>
                  <div className="end-address-container">
                    <div className="row">
                      <p className="start-end">End Address</p>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <input class="form-control" type="text" placeholder="End Address" name="endAddress" id="endAddress"/>
                      </div>
                    </div>
                  </div>
                  <div className="spinner-container">
                    { this.state.isLoading && <img id="spinner" src={ spinner } alt=""/> }
                  </div>
                  <div id="submit" className="row justify-content-center">
                    <div className="submit-button-container">
                      <button type="submit" class="btn-light submit-button">SUBMIT</button>
                    </div>
                  </div>
                </form>
                <ToastContainer
                  position="bottom-center"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnVisibilityChange
                  draggable
                  pauseOnHover
                  />
              </div> }
              { this.state.requested && <Pickup allPassengers={ this.state.allPassengers } startAddress={ this.state.startAddress } endAddress={ this.state.endAddress }/> }
            </div>
            <div className="right_side col-md-8">
              <div className="map-view-container">
                <MapContainer allPassengers={ this.state.allPassengers } startAddress={ this.state.startAddress } endAddress={ this.state.endAddress }/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
