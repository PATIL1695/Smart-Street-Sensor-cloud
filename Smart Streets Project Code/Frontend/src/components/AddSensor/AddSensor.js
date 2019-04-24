import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import MapContainer from '../Maps/MapContainer';
import MyNavbar from '../LandingPage/MyNavbar';

class AddSensor extends Component{

        //call the constructor method
        constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        var path = props.location.pathname;
        var nodeid;
        nodeid = path.substring(11)
        //maintain the state required for this component
        this.state = {
            SensorID : '',
            SensorType : '',
            Status : '',
            SensorName : '',
            InstallationDate : '',
            NodeID : nodeid,
            redirectVar:null
        }
        //Bind the handlers to this class
        this.NodeIDChangeHandler  = this.NodeIDChangeHandler.bind(this);
        this.SensorIDChangeHandler  = this.SensorIDChangeHandler.bind(this);
        this.SensorNameChangeHandler = this.SensorNameChangeHandler.bind(this);
        this.SensorTypeChangeHandler = this.SensorTypeChangeHandler.bind(this);
        this.StatusChangeHandler  = this.StatusChangeHandler.bind(this);
        this.InstallationDateChangeHandler  = this.InstallationDateChangeHandler.bind(this);
        this.submitCreate = this.submitCreate.bind(this);
    }
    //node id change handler to update state variable with the text entered by the user
    SensorIDChangeHandler  = (e) => {
        this.setState({
            SensorID : e.target.value
        })
    }
    SensorTypeChangeHandler  = (e) => {
        this.setState({
            SensorType : e.target.value
        })
    }
    StatusChangeHandler  = (e) => {
        this.setState({
            Status : e.target.value
        })
    }

    InstallationDateChangeHandler  = (e) => {
        this.setState({
            InstallationDate : e.target.value
        })
    }

    NodeIDChangeHandler  = (e) => {
        this.setState({
            NodeID : e.target.value
        })
    }

    SensorNameChangeHandler  = (e) => {
        this.setState({
            SensorName : e.target.value
        })
    }

    //submit Login handler to send a request to the node backend
    submitCreate = (e) => {
        //var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            sensorid : this.state.SensorID,
            sensortype : this.state.SensorType,
            sensorstatus : this.state.Status,
            sensorname : this.state.SensorName,
            installation_date : this.state.InstallationDate,
            nodeid : this.state.NodeID
        }

        console.log("data in create" + JSON.stringify(data));
        
        //make a post request with the user data
        axios.post('http://localhost:3001/addsensor',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                console.log("Data", response.data);
                this.setState({
                    redirectVar : <Redirect to = {`/sensorhome/${response.data.nodeid}`}/>
                })
  
            });
            
    }

    submitReset = (e) => {
        //var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        this.setState({
            SensorID : '',
            SensorType : '',
            Latitude : '',
            Longitude : '',
            Status : '',
            NodeID : '',
            SensorName : '',
            InstallationDate : ''
        }
        );          
    };

    render(){
        return(
            <div>
                <MyNavbar></MyNavbar>
                <div className = "create-wrapper-div">
                <h3>&nbsp;&nbsp;Configure your sensor</h3>
                <div className="container map-container col">
                {/* <MapContainer example = "foo"/> */}
                </div>
                <br/>

                <div className="container form-container col">
                
                        {this.state.redirectVar}
                        <form>
                        <div>
                         <div style={{width: '60%'}} className="form-group">
                            <input  type="text" className="form-control" name="SensorID" placeholder="Sensor ID" onChange={this.SensorIDChangeHandler} value={this.state.SensorID}/>
                        </div> 
                        <br/>

                        <div className="dropdown">
                        <div className="col-sm-12 col-md-7" style={{width: '60%'}} className="form-group" onChange = {this.SensorTypeChangeHandler} value={this.state.SensorType}>     
                        <select className="form-control">
                                <option disabled="" hidden="" value="" selected="selected">Sensor Type</option>
                                <option value="Temperature">Temperature</option>
                                <option value="Humidity">Humidity</option>
                                <option value="Wind">Wind Speed</option>
                        </select>
                        </div>
                        </div>
                        <br/>
                        <div style={{width: '60%'}} className="form-group">
                                <input  type="select" className="form-control" name="SensorName" placeholder="Sensor Name" onChange={this.SensorNameChangeHandler} value={this.state.SensorName}/>
                        </div>
                        <br/>
                        <div style={{width: '60%'}} className="form-group">
                                <input  type="text" className="form-control" name="Status" placeholder="Active/Inactive/Maintenance" onChange={this.StatusChangeHandler} value={this.state.Status}/>
                        </div>
                        <br/>
                        <div style={{width: '60%'}} className="form-group">
                                <input  type="date" className="form-control" name="InstallationDate" placeholder="Installation Date" onChange={this.InstallationDateChangeHandler} value={this.state.InstallationDate}/>
                        </div>
                        <br/>
                        <div style={{width: '60%'}} className="form-group">
                                <input  type="text" className="form-control" name="NodeID" placeholder="Node ID" onChange={this.NodeIDChangeHandler} value={this.state.NodeID}/>
                        </div>
                        <br/>
                        <div style={{width: '60%'}}>
                            <center><button onClick={this.submitCreate} className="btn btn-success" type="submit">Update Sensor</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</center>
                        </div>

                        </div>
                        </form>

                        <div>
                            {/* <img src = {icon}></img> */}    
                        </div> 
                    
                    </div>
                </div>
            </div>
        )
    }
}

export default AddSensor;