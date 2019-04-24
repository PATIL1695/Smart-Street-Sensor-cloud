import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import SideBar from '../SideBar/SideBar'
import MapContainer from '../Maps/MapContainer';
import MyNavbar from '../LandingPage/MyNavbar';

class SensorHome extends Component {
    constructor(props){
        super(props);
		console.log("nodeid")
        this.state = {  
            sensors : [],
            nodeid : '',
            redirectVar: null,
            nodeData : {}           
        }
         this.deletesensor = this.deletesensor.bind(this);
         this.handleGraph = this.handleGraph.bind(this); 
    }  
    //get the nodes data from backend  
    async componentDidMount(){
        await this.setState({
            nodeData : JSON.parse(localStorage.getItem('nodeData'))
        })
        axios.get('http://localhost:3001/sensorhome/'+this.state.nodeData.nodeid)
                .then((response) => {
                //update the state with the response data
                this.setState({
                    sensors : this.state.sensors.concat(response.data),
                });
            });
    }


    deletesensor = (id,e) => {
        //prevent page from refresh
        e.preventDefault();   
        console.log(id);
        //make a post request with the user data
        var url = 'http://localhost:3001/deletesensor/'
        var requesturl = url + id;
        axios.delete(requesturl)
            .then(response => {
                console.log("Status Code : ",response.status);         
                  window.location = "/sensorhome/"+this.state.nodeid; 
            });         
    }

    handleGraph = (sensor,e) => 
    {
        console.log(sensor.sensorid);
        console.log(sensor.sensortype);
        console.log(this.state.nodeData.lat);
        console.log(this.state.nodeData.long);
        console.log(this.state.nodeData.nodeid);
        console.log(this.state.nodeData.clusterid);


        var values = {
            sensorid : sensor.sensorid,
            sensorname : sensor.sensorname,
            nodeid : this.state.nodeData.nodeid,
            sensortype : sensor.sensortype,
            latitude : this.state.nodeData.lat,
            longitude : this.state.nodeData.long,
            nodeid : this.state.nodeData.nodeid,
            clusterid : this.state.nodeData.clusterid

        }
        localStorage.setItem('sensorData', JSON.stringify(values));
        this.setState({
            redirectVar : <Redirect to="/graph"/>
        }) 
    }


    render(){
        let redirectLink;
        //iterate over nodes to create a table row
        let details = this.state.sensors.map(sensor => {
      
            redirectLink = <td><Link to = "/graph" className = "btn btn-warning" onClick = {this.handleGraph.bind(this,sensor)} value={sensor}> Real-time Sensor Data</Link></td> 

            return(
                <tr>
                    <td>{sensor.sensorid}</td>
                    <td>{sensor.sensorname}</td>
                    <td>{sensor.nodeid}</td>
                    <td>{sensor.sensortype}</td>
                    <td>{sensor.sensorstatus}</td> 
                    <td>{sensor.installation_date}</td>
                    <td><Link to="/addsensor/"$nodeid className = "btn btn-info">Update</Link></td> 
                    {redirectLink}
                    <td><button className = "btn btn-danger" onClick={this.deletesensor.bind(this,sensor.sensorid)} value={sensor.sensorid}>Delete</button></td> 
                    

                </tr>
            )
        })
        //if not logged in go to login page
        let redirectVar = null;
        let str = this.state.nodeData.nodeid;
        // if(!cookie.load('cookie')){
        //     redirectVar = <Redirect to= "/login"/>
        // }
        return(
            <div>
                {this.state.redirectVar}
                <MyNavbar></MyNavbar>
                <div className="container map-container col">
                {/* <MapContainer/>  */}
                </div>
                <div className="container">
                    <h3>Sensor List for Node ID {str}</h3>
                    <div className = "float-right">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Sensor ID</th>
                                    <th>Sensor Name</th>
                                    <th>Node ID</th>
                                    <th>Sensor Type</th>
                                    <th>Sensor Status</th>
                                    <th>Installed On</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/*Display the Tbale row based on data recieved*/}
                                {details}
                            </tbody>
                        </table>
                        </div>
                </div> 
            </div> 
        )
    }
}
//export Home Component
export default SensorHome;