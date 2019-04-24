import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import SideBar from '../SideBar/SideBar'
import MyNavbar from '../LandingPage/MyNavbar';
import MapContainer from '../Maps/MapContainer';
import Navbar from '../LandingPage/Navbar';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {  
            nodes : [],
            redirectVar: null
        }
         this.deletenode = this.deletenode.bind(this); 
         this.handleViewSensorList = this.handleViewSensorList.bind(this);
    }  
    //get the nodes data from backend  
    componentDidMount(){
        axios.get('http://localhost:3001/home')
                .then((response) => {
                //update the state with the response data
                this.setState({
                    nodes : this.state.nodes.concat(response.data),
                    redirectVar : <Redirect to= "/home"/> 
                });
            });
    }

    handleViewSensorList = (node,e) => {
        console.log("node lat" + node.lat)
        console.log("long" + node.long)
        console.log("long" + node.nodeid)
        console.log("long" + node.clusterid)
        var values = {
            lat : node.lat,
            long : node.long,
            nodeid : node.nodeid,
            clusterid : node.clusterid
        }
        localStorage.setItem('nodeData', JSON.stringify(values));
        this.setState({
            redirectVar : <Redirect to="/sensorhome"/>
        })   
    }


    deletenode = (id,e) => {
        //prevent page from refresh
        e.preventDefault();   
        console.log(id);
        //make a post request with the user data
        var url = 'http://localhost:3001/delete/'
        var requesturl = url + id;
        axios.delete(requesturl)
            .then(response => {
                console.log("Status Code : ",response.status);  
                // console.log("Data: " + response.data);
                //  this.setState({
                //      redirectVar : <Redirect to="/home"/>
                //  })          
                  window.location = "/home"; 
            });         
    }


    render(){
        
        //iterate over nodes to create a table row
        let details = this.state.nodes.map(node => {
            return(
                <tr>
                    <td>{node.nodeid}</td>
                    <td>{node.node_status}</td>
                    <td>{node.lat}</td> 
                    <td>{node.long}</td>
                    <td>{node.no_sensors}</td>
                    <td>{node.clusterid}</td> 
                    <td>{node.installation_date}</td>
                    <td><Link to={`/addsensor/${node.nodeid}`} className = "btn btn-success">Add Sensors</Link></td> 
                    <td><Link to = "/sensorhome" className = "btn btn-info" onClick = {this.handleViewSensorList.bind(this,node)} value={node}> View Sensor List</Link></td>
                    {/* <td><Link to={`/sensorhome/${node.nodeid}`} className = "btn btn-info">View Sensor List</Link></td>  */}
                    <td><Link to={`/updatenode/${node.nodeid}`} className = "btn btn-warning">Update Smart Node</Link></td> 
                    <td><button className = "btn btn-danger" onClick={this.deletenode.bind(this,node.nodeid)} value={node.nodeid}>Delete Node</button></td> 
                    

                </tr>
            )
        })
        //if not logged in go to login page
        // let redirectVar = null;
        // if(!cookie.load('cookie')){
        //     redirectVar = <Redirect to= "/login"/>
        // }
        return(
            <div>
                <MyNavbar></MyNavbar>
                {this.state.redirectVar}
                
                <h3><center>Sensor Station Dashboard</center></h3>


                <div className="container table-container">
                    
                    <hr></hr>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Node ID</th>
                                    <th>Node Status</th>
                                    <th>Latitude</th>
                                    <th>Longitude</th>
                                    <th>No of Sensors</th>
                                    <th>Cluster ID</th>
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
        )
    }
}
//export Home Component
export default Home;