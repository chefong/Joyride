import React, { Component } from 'react'
import './Home.css';

export default class Home extends Component {
  render() {
    return (
      <div className="home-container">
        <div className="row">
          <div className="col-md-5">
            <div className="panel-container">
              <div className="container-fluid">
                <p>panel</p>
                
                <h1>Carpuul</h1>
				<p>Carpuuling made right for everyone, everywhere.</p>

				<div class="container">
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
