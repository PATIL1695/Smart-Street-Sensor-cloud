import React from 'react';
import axios from 'axios';

import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
  } from 'react-google-maps';

const fetch = require("isomorphic-fetch");
const { compose, withProps, withHandlers } = require("recompose");

const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");

const MapWithAMarkerClusterer = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDu0XOVNMFaA-JZj-OrOwF34i_AhmfR3CM&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `450px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withHandlers({
    onMarkerClustererClick: () => (markerClusterer) => {
      const clickedMarkers = markerClusterer.getMarkers()
      console.log(`Current clicked markers length: ${clickedMarkers.length}`)
      console.log(clickedMarkers)
    },
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={7}
    defaultCenter={{ lat: 37.33, lng: -121.88 }}
  >
    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={60}
    >
      {props.markers.map(marker => (
        <Marker
          key={marker.nodeid}
          position={{ lat: parseFloat(marker.lat), lng: parseFloat(marker.long) }}
        />
      ))}
    </MarkerClusterer>
  </GoogleMap>
);

class ClusterMap extends React.PureComponent {
  componentWillMount() {
    this.setState({ markers: [] })
  }

  componentDidMount() {
    // const url = [
    //   // Length issue
    //   `https://gist.githubusercontent.com`,
    //   `/farrrr/dfda7dd7fccfec5474d3`,
    //   `/raw/758852bbc1979f6c4522ab4e92d1c92cba8fb0dc/data.json`
    // ].join("")

    // fetch(url)
    //   .then(res => res.json())
    //   .then(data => {
    //     this.setState({ markers: data.photos });
    //   });

      axios.get('http://localhost:3001/home')
      .then((response) => {
      //update the state with the response data
      this.setState({
          markers : this.state.markers.concat(response.data)
      });
      console.log("m" + JSON.stringify(this.state.markers))
  });
  }

  render() {
    return (
       <MapWithAMarkerClusterer markers={this.state.markers} />
    // <p>hello</p>
    )
  }
}

<ClusterMap />



export default ClusterMap;
