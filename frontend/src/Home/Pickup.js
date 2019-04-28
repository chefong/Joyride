import React, { Component } from 'react'
import './Pickup.css'
import axios from 'axios';

const dots = require('./assets/dots.png')
const dotsDown = require('./assets/dotsdown.png')
const dotsUp = require('./assets/dotsup.png')

export default class Pickup extends Component {
  componentDidMount = () => {
    console.log(this.props.startAddress)
    console.log(this.props.endAddress)
  }

  handlePickup = (passenger, e) => {
    e.preventDefault()

    axios.post(`https://cors-anywhere.herokuapp.com/` + `http://ea29cc0b.ngrok.io/sms`,
      JSON.stringify(passenger)
    ).then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  }

  render() {
    return (
      <div className="pickup-container">
        <div className="container-fluid">
          <div className="start-pickup">
            <p className="start-pickup-label">{ this.props.startAddress }</p>
          </div>
          <div className="dots-container">
            <div className="row justify-content-center">
              <img className="dotsDown" src={ dotsDown } alt=""/>
            </div>
          </div>
          { this.props.allPassengers.map(passenger => {
            return <div className="passenger-pickup">
              <div className="row justify-content-center">
                <div className="col">
                  <p className="passenger-name">{ passenger.name }</p>
                </div>
                <div className="col">
                  <button type="submit" className="pickup-button" onClick={ e => this.handlePickup(passenger, e) }>Picked Up!</button>
                </div>
              </div>
            </div>
          }) }
          <div className="dots-container">
            <div className="row justify-content-center">
              <img className="dotsUp" src={ dotsUp } alt=""/>
            </div>
          </div>
          <div className="end-pickup">
            <p className="end-pickup-label">{ this.props.endAddress }</p>
          </div>
        </div>
      </div>
    )
  }
}
