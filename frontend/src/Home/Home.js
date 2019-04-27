import React, { Component } from 'react'
import MapContainer from './MapContainer'
import './Home.css'

export default class Home extends Component {
  render() {
    return (
      <div className="home-container">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">
              <div className="panel-container">
                panel
              </div>
            </div>
            <div className="col-md-8">
              <div className="map-view-container">
                <MapContainer />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
