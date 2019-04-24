import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import icon from './streetlight.png'
import MapContainer from '../Maps/MapContainer';
import ClusterMap from '../Maps/ClusterMap'
import Navbar from '../LandingPage/Navbar';
import MyNavbar from '../LandingPage/MyNavbar';
import SideBar from '../SideBar/SideBar'
import {Link} from 'react-router-dom';
import jwtdecode from 'jwt-decode';
import swal from 'sweetalert'
import { shallowEqual } from 'recompose';

class Create extends Component{

        //call the constructor method
        constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            NodeID : '',
            Latitude : '',
            Longitude : '',
            Status : 'OFF',
            InstallationDate : '',
            NoSensors : '',
            ClusterID : '',
            redirectVar:null
        }
        //Bind the handlers to this class
        this.NodeIDChangeHandler  = this.NodeIDChangeHandler.bind(this);
        this.StatusChangeHandler  = this.StatusChangeHandler.bind(this);
        this.LatitudeChangeHandler  = this.LatitudeChangeHandler.bind(this);
        this.LongitudeChangeHandler = this.LongitudeChangeHandler.bind(this);
        this.InstallationDateChangeHandler  = this.InstallationDateChangeHandler.bind(this);
        this.NoSensorsChangeHandler = this.NoSensorsChangeHandler.bind(this);
        this.ClusterIDChangeHandler = this.ClusterIDChangeHandler.bind(this);
        this.submitCreate = this.submitCreate.bind(this);
    }
    //node id change handler to update state variable with the text entered by the user
    NodeIDChangeHandler  = (e) => {
        this.setState({
            NodeID : e.target.value
        })
    }

    StatusChangeHandler  = (e) => {
        this.setState({
            Status : e.target.value
        })
    }
    LatitudeChangeHandler  = (e) => {
        this.setState({
            Latitude : e.target.value
        })
    }
    LongitudeChangeHandler  = (e) => {
        this.setState({
            Longitude : e.target.value
        })
    }
    InstallationDateChangeHandler  = (e) => {
        this.setState({
            InstallationDate : e.target.value
        })
    }


    NoSensorsChangeHandler  = (e) => {
        this.setState({
            NoSensors : e.target.value
        })
    }

    ClusterIDChangeHandler  = (e) => {
        this.setState({
            ClusterID : e.target.value
        })
    }

    async componentWillMount(){
        console.log("Token in did mount" + localStorage.getItem("usertoken"))
            if(localStorage.getItem("usertoken")){
                var tokenvalue = jwtdecode(localStorage.getItem("usertoken"));
                await this.setState({
                    token: true,
                    username: tokenvalue.user.firstname,
                    usertype : tokenvalue.user.usertype
                })
            }
            if(this.state.usertype==="client")
            {
                swal("Access Denied","","warning")
                this.setState({
                    redirectVar : <Redirect to= "/"/>
                })
            }
    }

    //submit Login handler to send a request to the node backend
    submitCreate = (e) => {
        //var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            NodeID : this.state.NodeID,
            NoSensors : this.state.NoSensors,
            Latitude : this.state.Latitude,
            Longitude : this.state.Longitude,
            Status : this.state.Status,
            InstallationDate : this.state.InstallationDate,
            ClusterID : this.state.ClusterID
        }

        console.log("data in create" + JSON.stringify(data));
        localStorage.setItem('Latitude', data.Latitude);
        localStorage.setItem('Longitude', data.Longitude);
        localStorage.setItem('nodeID',data.NodeID);
       
        
        //make a post request with the user data
        axios.post('http://localhost:3001/create',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                console.log("Data", response.data);
                this.setState({
                    redirectVar : <Redirect to= "/home"/>
                })
            });
            
    }

    submitReset = (e) => {
        //var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        this.setState({
            NodeID : '',
            NoSensors : '',
            Latitude : '',
            Longitude : '',
            Status : 'OFF',
            InstallationDate : '',
            ClusterID : ''
        }
        );          
    };

    render(){
        return(
            <div>
                <MyNavbar></MyNavbar>
                
                {this.state.redirectVar}
                
                <div className = "create-wrapper-div">
                <div className="container map-container col">
                <h4>Map View of nodes in clusters</h4>
                {/* <MapContainer example = "foo"/> */}
                <ClusterMap/>
                </div>
                <br/>

                <div className="container form-container col">                
                        <div>
                         <div style={{width: '60%'}} className="form-group">
                            <input  type="text" className="form-control" name="NodeID" placeholder="Node ID" onChange={this.NodeIDChangeHandler} value={this.state.NodeID}/>
                        </div> 
                        <br/>
                       <div style={{width: '60%'}} className="form-group">
                                <input  type="text" className="form-control" name="Latitude" placeholder="Latitude" onChange={this.LatitudeChangeHandler} value={this.state.Latitude}/>
                        </div>
                        <br/>
                        <div style={{width: '60%'}} className="form-group">
                                <input  type="text" className="form-control" name="Longitude" placeholder="Longitude" onChange={this.LongitudeChangeHandler} value={this.state.Longitude}/>
                        </div>
                        <br/> 
   
                        <div className="dropdown">
                        <div className="col-sm-12 col-md-7" style={{width: '60%'}} className="form-group" onChange = {this.StatusChangeHandler} value={this.state.Status}>     
                        <select className="form-control">
                                <option disabled="" hidden="" value="" selected="selected">Status</option>
                                <option value="ON">ON</option>
                                <option value="OFF">OFF</option>
                        </select>
                        </div>
                        </div>
                        <br/>
                        <div style={{width: '60%'}} className="form-group">
                                <input  type="select" className="form-control" name="NoSensors" placeholder="No of sensors" onChange={this.NoSensorsChangeHandler} value={this.state.NoSensors}/>
                        </div>
                        <br/>
                        {/* <div style={{width: '60%'}} className="form-group">
                                <input  type="text" className="form-control" name="PollingFrequency" placeholder="Frequency of polling" onChange={this.FrequencyChangeHandler} value={this.state.Frequency}/>
                        </div>
                        <br/> */}
                        <div style={{width: '60%'}} className="form-group">
                                <input  type="date" className="form-control" name="InstallationDate" placeholder="Installation Date" onChange={this.InstallationDateChangeHandler} value={this.state.InstallationDate}/>
                        </div>
                        <br/>
                        <div style={{width: '60%'}} className="form-group">
                                <input  type="text" className="form-control" name="ClusterID" placeholder="Cluster ID" onChange={this.ClusterIDChangeHandler} value={this.state.ClusterID}/>
                        </div>
                        <br/>
                        <div style={{width: '60%'}}>
                            <button onClick={this.submitCreate} className="btn btn-success" type="submit">Create Smart Node</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <button onClick={this.submitReset} className="btn btn-success" type="submit">Reset</button>
                        </div>
                        </div>
                        <div>
                            {/* <img src = {icon}></img> */}    
                        </div> 
                    
                    </div>
                </div>
            </div>
        )
    }
}

export default Create;