import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { GoogleApiWrapper, Map as GoogleMap, Marker } from 'google-maps-react';
import GOOGLEMAPS_API_KEY from '../config/googlemaps.js';
import styled from 'styled-components';

const StyledMap = styled.div`
  margin: auto;
	width: 320px;
	height: 220px;
  font-family: 'Josefin Sans', sans-serif;
`;

let params = (new URL(document.location)).searchParams;
let restId = parseInt(params.get('restaurantid')) || 92;

class Map extends Component {
	constructor(props) {
		super(props);
		//  restaurant number will be passed into props from overview
		//  along with street address
		console.log(props);  // Google maps does something to props so I'm not getting restaurant id

		this.restId = restId || 92;
		this.restAddress = '1313 Mockingbird Lane';
		var initialCoords = {
			latitude: 47.444,
			longitude: -122.176
		};
		this.state = {
      coords: initialCoords
		};
		this.getCoordinates.bind(this);
		this.getCoordinates(this.restId);
	}

	getCoordinates(restId) {
		axios.get(`http://localhost:3002/mapper/${restId}`)
		.then(res => {
			var coords = {};
			coords.latitude = res.data[0].latitude;
			coords.longitude = res.data[0].longitude;
			coords.gotData = true;
			this.setState({coords});
		})
	}

	render() {
		//  prevent call to gmaps before we have gotten our coordinates
		if (!this.state.coords.gotData) {
		 	return <div />
	  }

		const mapStyle = {
			marginTop: '20px',
			marginLeft: 'auto',
			marginRight: 'auto',
			left: '-15px',
			width: '320px',
			height: '220px',
			border: '2px solid lightgrey'
		};

		return (
			<div>
				<GoogleMap
					google={this.props.google}
					style = {mapStyle}
					initialCenter={{ lat: this.state.coords.latitude, lng: this.state.coords.longitude}} >
					<Marker position={{ lat: this.state.coords.latitude, lng: this.state.coords.longitude}} />
				</GoogleMap>
			</div>
		);
	}
}

const MapWrapper = GoogleApiWrapper({
	apiKey: GOOGLEMAPS_API_KEY
})(Map);

class Mapper extends Component{
	render(){
		return (<MapWrapper/>)
	}
}

export default Mapper;