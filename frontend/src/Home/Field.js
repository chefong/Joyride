import React, { Component } from 'react'
import './Field.css'

export default class Field extends Component {
  render() {
    return (
      <div className="field-container">
        <div className="container">
          <div className="row">
            <p className="passenger-title">Passenger {this.props.passengerNum}</p>
          </div>
          <div class="row">
            <div className="col">
              <input class="form-control" type="text" placeholder="Name" name="pName" id="pName"/>
            </div>
            <div className="col">
              <input class="form-control" type="text" placeholder="Phone Number" name="pPhoneNumber" id="pPhoneNumber"/>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <input class="form-control" type="text" placeholder="Address" size="30" name="pAddress" id="pAddress"/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
