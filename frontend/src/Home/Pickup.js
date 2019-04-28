import React, { Component } from 'react'
import './Pickup.css'
import axios from 'axios';

export default class Pickup extends Component {
  componentDidMount = () => {
    console.log(this.props.allPassengers)
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
        </div>
      </div>
    )
  }
}
