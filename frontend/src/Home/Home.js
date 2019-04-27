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
                <h1>Carpuul</h1>
				<p>Carpuuling made right for everyone, everywhere.</p>

				<div class="container-fluid">
				  <div class="row">
				    <div class="col">
						<button type="button" class="btn btn-light">1st location</button>
						<button type="button" class="btn btn-light">2nd location</button>
				    </div>
				    <div class="col">
						<button type="button" class="btn btn-light">1st phone number</button>
						<button type="button" class="btn btn-light">2nd phone number</button>
				    </div>
				  </div>
				</div>
				<button type="button" class="btn btn-light plusButton">+</button>
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
