import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

const key = process.env.REACT_APP_API_KEY
const google = window.google;
let allPassengers = []

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.handleMapReady = this.handleMapReady.bind(this);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      allPassengers: [],
      gMap: undefined
    };
  }

  componentDidUpdate = () => {
    // for (let i = 0; i < this.props.allPassengers.length; ++i) {
    //   let address = this.props.allPassengers[i].address
    //   console.log(address)
    // }
    console.log(this.props.allPassengers)
    if (this.props.allPassengers.length > 1) {
      this.calculateAndDisplayRoute(this.state.gMap)
    }
  }

  handleMapReady(mapProps, map) {
    //this.calculateAndDisplayRoute(map);
    this.setState({ gMap: map })
  }

  calculateAndDisplayRoute(map) {
    const directionsService = new google.maps.DirectionsService();
    const directionsDisplay = new google.maps.DirectionsRenderer({
    polylineOptions: {
      strokeColor: "#00E38D"
    }
  });
    directionsDisplay.setMap(map);

    let waypoints = []

    console.log(this.props.allPassengers)
    if (this.props.allPassengers.length <= 1) {
      waypoints = [
      {
        location: 'Joplin, MO',
        stopover: false
      },{
        location: 'Oklahoma City, OK',
        stopover: false
      }]
    }
    else {
      waypoints = []
      for (let i = 0; i < this.props.allPassengers.length; ++i) {
        let address = this.props.allPassengers[i].address
        let waypoint = { location: address, stopover: true }

        waypoints.push(waypoint)
      }
    }

    console.log(waypoints)

    const origin = waypoints.shift().location;
    const destination = waypoints.pop().location;

    directionsService.route({
      origin: origin,
      destination: destination,
      waypoints: waypoints,
      optimizeWaypoints: true,
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
          styles={[
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#e6e6e6'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#e6e6e6'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#e6e6e6'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#e6e6e6'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#e6e6e6'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#e6e6e6'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#e6e6e6'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#e6e6e6'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]} 
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
