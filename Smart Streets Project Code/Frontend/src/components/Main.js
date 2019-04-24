import React, {Component} from 'react';
import {Route,Switch} from 'react-router-dom';
import Login from './Login/Login';
import Home from './Home/Home';
import SensorHome from './Home/SensorHome';
import CreateNode from './CreateNode/Create';
import Navbar from './LandingPage/Navbar';
import MapContainer from './Maps/MapContainer';
import Graph from './Graphs/Graph'
import RelativeHumidityGraph from './Graphs/RelativeHumidityGraph'
import Wind from './Graphs/Wind'
import AddSensor from './AddSensor/AddSensor';
import ClusterMap from './Maps/ClusterMap';
import UpdateNode from './UpdateNode/UpdateNode';
import SideBar from './SideBar/SideBar';
import Create from "./create.component"
import Edit from "./edit.component";
import Index from "./index.component";
import Search from "./search.component";
import Screen1 from './LoadBalancer/Screen1';
import Screen2 from './LoadBalancer/Screen2';
import Screen3 from './LoadBalancer/Screen3';
import ManagerSignUp from './SignUp/ManagerSignUp';
import MaintenanceSignUp from './SignUp/MaintenanceSignUp';
import ClientSignUp from './SignUp/ClientSignUp';
import ManagerLogin from './Login/ManagerLogin';
import MaintenanceLogin from './Login/MaintenanceLogin';
import ClientLogin from './Login/ClientLogin';
import MyNavbar from './LandingPage/MyNavbar';

//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route exact path="/" component={Navbar}/>
                <Route path="/mynavbar" component={MyNavbar}/>
                <Route path="/login" component={Login}/>
                <Route path="/home" component={Home}/>
                <Route path="/sensorhome" component={SensorHome}/>
                {/* <Route path="/delete" component={Delete}/> */}
                <Route path="/createNode" component={CreateNode}/>
                <Route path="/updatenode" component={UpdateNode}/>
                <Route path="/maps" component={MapContainer}/>
                <Route path="/graph" component={Graph}/>
                <Route path="/humiditygraph" component={RelativeHumidityGraph}/>
                <Route path="/windgraph" component={Wind}/>
                <Route path="/addsensor" component={AddSensor}/>
                <Route path="/clustermap" component={ClusterMap}/>
                <Route path="/sidebar" component={SideBar}/>
                <Route path="/managersignup" component={ManagerSignUp}/>
                <Route path="/maintenancesignup" component={MaintenanceSignUp}/>
                <Route path="/clientsignup" component={ClientSignUp}/>
                <Route path="/managerlogin" component={ManagerLogin}/>
                <Route path="/maintenancelogin" component={MaintenanceLogin}/>
                <Route path="/clientlogin" component={ClientLogin}/>
                <Switch>
                    <Route exact path="/create" component={Create} />
                    <Route path="/edit/:id" component={Edit} />
                    <Route path="/index" component={Index} />
                    <Route path="/search" component={Search} />
                </Switch>
                <Route path="/screen1" component={Screen1} />
                <Route path="/screen2" component={Screen2} />
                <Route path="/screen3" component={Screen3} />
                
            </div>
        )
    }
}
//Export The Main Component
export default Main;