import React, { Component } from 'react'

export default class Home extends Component {
  render() {
    return (
      <div className="home-container">
        <div className="row">
          <div className="col-md-5">
            <div className="panel-container">
              <div className="container-fluid">
                <p>panel</p>
              </div>
            </div>
          </div>
          <div className="map-container">
            <div className="container-fluid">
              <div className="col-md-7">
                <p>map</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
