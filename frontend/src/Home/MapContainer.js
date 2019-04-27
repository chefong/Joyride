import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

const key = process.env.REACT_APP_API_KEY
const google = window.google;

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.handleMapReady = this.handleMapReady.bind(this);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    };
  }

  handleMapReady(mapProps, map) {
    this.calculateAndDisplayRoute(map);
  }

  calculateAndDisplayRoute(map) {
    const directionsService = new google.maps.DirectionsService();
    const directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);


    const waypoints = [
      {
        location: 'Joplin, MO',
        stopover: false
      },{
        location: 'Oklahoma City, OK',
        stopover: true
      }]
    const origin = waypoints.shift().location;
    const destination = waypoints.pop().location;

    directionsService.route({
      origin: origin,
      destination: destination,
      waypoints: waypoints,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
  render() {
    if (!this.props.google) {
      return <div>Loading...</div>;
    }

    return (
      <div
        style={{
          position: "absolute",
          height: "100vh",
          width: "100%"
        }}
      >
        <Map
          style={{}} 
          google={this.props.google} 
          zoom={14} 
          onReady={this.handleMapReady} 
          
          />
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyAxl5yLMYFQZl5OhdMIqnPz3jbD4qjSeIo'
})(MapContainer);
