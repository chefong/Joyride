import React, { Component } from 'react'
import './Pickup.css'

export default class Pickup extends Component {
  componentDidMount = () => {
    console.log(this.props.allPassengers)
  }

  handlePickup = e => {
    e.preventDefault()
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
                  <button type="submit" onSubmit={ this.handlePickup }>Picked Up!</button>
                </div>
              </div>
            </div>
          }) }
        </div>
      </div>
    )
  }
}
