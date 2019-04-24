import axios from 'axios';
var React = require('react');
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
//console.log("xval" + xVal)
var yVal = 15;
var updateInterval = 1000;

class RelativeHumidityGraph extends Component {
	constructor(props) {
        super(props);
        console.log("sensorid" + props.location.pathname.substring(15))
        this.setState({
			sensorid : props.location.pathname.substring(15)
		})
		this.updateChart = this.updateChart.bind(this);
		this.stopGraph = this.stopGraph.bind(this);
		this.startGraph = this.startGraph.bind(this);
	}
	componentDidMount() {
        updatedInterval = setInterval(this.updateChart, updateInterval);
        this.setState({
			sensorid : this.props.location.pathname.substring(15)
		})
	}

	stopGraph() {
		this.chart.options.data[0].dataPoints = newDps;
		this.chart.render();
		clearInterval(updatedInterval);
	}

	updateChart() {
		function getRandomInt(min, max) {
			return Math.floor(Math.random() * (max - min + 1) + min);
		  }

		//yVal = yVal +  Math.round(5 + Math.random() *(-5-5));
		var yVal = getRandomInt(30,80);

		//insert into db
		const data = {
			sensorid : this.state.sensorid,
			relativehumidity : yVal,
			timestamp : xVal
        }      
        //make a post request with the user data
        axios.post('http://localhost:3001/humiditysensor',data)
            .then(response => {
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
				text: "Humidity Sensor Data Generation"
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


export default RelativeHumidityGraph;