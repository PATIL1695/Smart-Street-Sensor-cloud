import axios from 'axios';
import SideBar from '../SideBar/SideBar'
import MyNavbar from '../LandingPage/MyNavbar';
var React = require('react');
var dateFormat = require('dateformat')
var Component = React.Component;
var CanvasJSReact = require('../../canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;



var updatedInterval;
var newDps = [];
//var dps = [{x: 1, y: 10}, {x: 2, y: 13}, {x: 3, y: 18}, {x: 4, y: 20}, {x: 5, y: 17},{x: 6, y: 10}, {x: 7, y: 13}, {x: 8, y: 18}, {x: 9, y: 20}, {x: 10, y: 17}];   //dataPoints.
var dps = []
var xVal = 0


xVal = Date.now();

//var xVal = dps.length + 1;
console.log("xval" + xVal)
var yVal = 15;
var updateInterval = 1000;

class Graph extends Component {
	constructor(props) {
		var sensorid;
		super(props);
		this.state = {
			sensorData : ''
		}
		console.log("sensorid" + props.location.pathname.substring(7))
		this.setState({
			sensorid : props.location.pathname.substring(7)
		})
		this.updateChart = this.updateChart.bind(this);
		this.stopGraph = this.stopGraph.bind(this);
		this.startGraph = this.startGraph.bind(this);
	}
	async componentDidMount() {
		await this.setState({
            sensorData : JSON.parse(localStorage.getItem('sensorData'))
        })
		updatedInterval = setInterval(this.updateChart, updateInterval);
	}

	stopGraph() {
		this.chart.options.data[0].dataPoints = newDps;
		this.chart.render();
		clearInterval(updatedInterval);
	}

	updateChart() {
		console.log(this.state.sensorData.sensorid);
        console.log(this.state.sensorData.sensortype);
		console.log(this.state.sensorData.latitude);
        console.log(this.state.sensorData.longitude);
        console.log(this.state.sensorData.nodeid);
        console.log(this.state.sensorData.clusterid);
		function getRandomInt(min, max) {
			return Math.floor(Math.random() * (max - min + 1) + min);
		  }

		function getRandomFloat(min, max) {
			return (Math.random() * (max - min + 1) + min);
		}

		//yVal = yVal +  Math.round(5 + Math.random() *(-5-5));
		var yVal;
		if (this.state.sensorData.sensortype == "Temperature")
		{
		yVal = getRandomInt(70,80);
		}
		else if (this.state.sensorData.sensortype == "Humidity")
		{
		yVal = getRandomInt(30,80);
		}
		else if (this.state.sensorData.sensortype == "Wind")
		{
		yVal = getRandomFloat(1,7);
		}
		//insert into db

		const data = {
			sensorid : this.state.sensorData.sensorid,
			sensorname : this.state.sensorData.sensorname,
			sensortype : this.state.sensorData.sensortype,
			sensorvalue : yVal,
			timestamp : xVal,
			timestamp2 : new Date().toISOString(),
			nodeid : this.state.sensorData.nodeid,
			clusterid : this.state.sensorData.clusterid,
			latitude : this.state.sensorData.latitude,
			longitude : this.state.sensorData.longitude			
        }      
        //make a post request with the user data
        axios.post('http://localhost:3001/sensorReadings',data)
            .then(response => {
				if (response.status===200)
				{
					console.log("successfully sent sensor data")
				}
			});

		
			
		dps.push({x: xVal,y: yVal});
		xVal++;
		if (dps.length >  10 ) {
			dps.shift();
			newDps = dps;
		}
		this.chart.render();
	}

	startGraph(){
		window.location.reload();
	} 


	render() {
		
		const options = {
			title :{
				text: "Sensor Data Generation"
			},
			axisX:{
			  interval: 1,
			},
			data: [{
				type: "line",
				dataPoints : dps
			}]
		}
		return (
		<div>
			<MyNavbar></MyNavbar>
			<center>
			<CanvasJSChart options = {options}
				 onRef={ref => this.chart = ref}
			/>
			<button onClick={this.stopGraph} className="btn btn-danger" type="submit">Stop Sensor</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			<button onClick={this.startGraph} className="btn btn-success" type="submit">Start Sensor</button>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
			</center>
		</div>
		);
	}
}


export default Graph;