import React, { Component } from 'react'
import './Pickup.css'
import axios from 'axios';

const dots = require('./assets/dots.png')

export default class Pickup extends Component {
  componentDidMount = () => {
    console.log(this.props.startAddress)
    console.log(this.props.endAddress)
  }

  handlePickup = name => {
    axios.post("/bar", { name })
    .then(res => {
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
              <img className="dots" src={ dots } alt=""/>
            </div>
          </div>
          { this.props.allPassengers.map(passenger => {
            return <div className="passenger-pickup">
              <div className="row justify-content-center">
                <div className="col">
                  <p className="passenger-name">{ passenger.name }</p>
                </div>
                <div className="col">
                  <button type="submit" className="pickup-button" onSubmit={ this.handlePickup(passenger.name) }>Picked Up!</button>
                </div>
              </div>
            </div>
          }) }
          <div className="dots-container">
            <div className="row justify-content-center">
              <img className="dots" src={ dots } alt=""/>
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
