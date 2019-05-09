import React, { Component } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";

const key = process.env.REACT_APP_API_KEY
const google = window.google;

class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    allPassengers: [],
    gMap: undefined
  }

  componentDidUpdate = () => {
    if (this.props.allPassengers.length >= 1) {
      this.calculateAndDisplayRoute(this.state.gMap)
    }
  }

  handleMapReady = map => {
    this.setState({ gMap: map })
  }

  calculateAndDisplayRoute(map) {
    const directionsService = new google.maps.DirectionsService();
    const directionsDisplay = new google.maps.DirectionsRenderer({
      polylineOptions: {
        strokeColor: "#5EAAF0"
      }
    })
    
    directionsDisplay.setMap(map);

    let waypoints = []

    let startPoint = {
      location: this.props.startAddress,
      stopover: false
    }
    let endPoint = {
      location: this.props.endAddress,
      stopover: false
    }

    console.log(this.props.allPassengers)
    if (this.props.allPassengers.length < 1) {
      waypoints.push(startPoint)
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
      waypoints.push(startPoint)
      for (let i = 0; i < this.props.allPassengers.length; ++i) {
        let address = this.props.allPassengers[i].address
        let waypoint = { location: address, stopover: true }

        waypoints.push(waypoint)
      }
    }

    waypoints.push(endPoint)

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
            google={ this.props.google } 
            zoom={ 14 }
            center={ new google.maps.LatLng(-34.397, 150.644) } 
            onReady={ this.handleMapReady } 
          />
      </div>
    );
  }
}
export default GoogleApiWrapper({ apiKey: key })(MapContainer)
