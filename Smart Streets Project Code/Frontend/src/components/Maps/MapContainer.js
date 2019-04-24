import React, { Component } from 'react';
// import { Link } from "react-router-dom";
// import { connect } from "react-redux";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
   width: '50%',
   height: '50%'
};


export class MapContainer extends Component {
  state = {
   showingInfoWindow: false,  //Hides or the shows the infoWindow
   activeMarker: {},          //Shows the active marker upon click
   selectedPlace: {} ,        //Shows the infoWindow to the selected place upon a marker
   lat : localStorage.getItem('Latitude'),
   long : localStorage.getItem('Longitude'),
   nodeID : localStorage.getItem('nodeID')
 };

 

onMarkerClick = (props, marker, e) =>
this.setState({
  selectedPlace: props,
  activeMarker: marker,
  showingInfoWindow: true
});

onClose = props => {
if (this.state.showingInfoWindow) {
  this.setState({
    showingInfoWindow: false,
    activeMarker: null
  });
}
};

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={16}
        style={mapStyles}

        initialCenter={{
         lat: this.state.lat,
         lng: this.state.long
        }}
        >
      
        {/* <h1>{this.props.example}</h1> */}
       <Marker
          onClick={this.onMarkerClick}
          name={"NodeID: " + this.state.nodeID}
        />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
       
        </Map>
    );
  }
}

// const mapStateToProps = state =>{
//   return {
//       searchFlag : state.searchpropertiesreducer.searchFlag,
//       searchresults : state.searchpropertiesreducer.searchresults
//   }
// }

export default GoogleApiWrapper({
   apiKey: 'AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo' //'AIzaSyDu0XOVNMFaA-JZj-OrOwF34i_AhmfR3CM'
})(MapContainer);

