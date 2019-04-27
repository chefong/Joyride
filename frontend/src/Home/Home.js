import React, { Component } from 'react'
import MapContainer from './MapContainer'
import Field from './Field'
import './Home.css'

export default class Home extends Component {
  state = {
    people: [
      {name: "", phoneNumber: "", address: "", passengerNum: 1}
    ],
    num: 1
  }

  handleClick = e => {
    e.preventDefault()

    if (this.state.num >= 5) {
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

  handleSubmit = e => {
    e.preventDefault()

    let passengerForms = document.getElementsByClassName("form-container")
    console.log(passengerForms)
    // for (let i = 0; i < passengerForms.children; ++i) {
    //   console.log(passengerForms[i].pName)
    // }
  }

  render() {
    return (
      <div className="home-container">
        <div className="container-fluid">
          <div className="row">
            <div className="left_side col-md-4">
              <div className="panel-container">
				<h1 class="animated fadeInDown" align="center">Carpuul</h1>
					<p class="body">Carpuuling made right for everyone, everywhere.</p>
                <form onSubmit={this.handleSubmit}>
                  <div className="form-container" name="passengerForm">
                    { this.state.people && this.state.people.map(person => {
                      return <Field name={person.name} phoneNumber={person.phoneNumber} address={person.address} passengerNum={person.passengerNum}/>
                    }) }
                  </div>
  				        <div className="row justify-content-center">
                    <button type="button" class="btn btn-light plusButton" onClick={this.handleClick}>+</button>
                  </div>
                  <div id="submit" className="row justify-content-center">
                    <div className="submit-button-container">
                      <button type="submit" class="btn btn-light submit-button">Submit</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="right_side col-md-8">
              <div className="map-view-container animated fadeInLeft">
                <MapContainer />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
