import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
import FileInput from 'simple-react-file-uploader';
import * as API from './api/API';
import rec from './recycle.png';
import cmp from './compost.jpg';
import lf from './landfill.png';
import Popup from 'react-popup';
import Signup from './Signup';
import Signin from './Signin';
import Header from './Header';
import {Rectangle, Circle, Ellipse, Line, Polyline, CornerBox, Triangle} from 'react-shapes';
import GoogleMapReact from 'google-map-react';
var self=this;

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Routing extends Component{



  constructor(props){
    super(props);
    console.log(this);

    this.state={
      type:null,
      id:1,
      isSelected:false,
      clusterNode:null,
      smartNode:null,
      sensorNode:null,
      showNotif:false,
      latitude:null,
      longitude:null,
      numOfNodes:null,
      withinCluster:null,
      commNode:null,
      what:1,
      status:null,
      showNotif2:false,
      showNotif3:false,
      showNotif4:false

    }

    API.getAllSensors()
    .then((res) => {
      var activeClusters=0;
      var pausedClusters=0;
      var inactiveClusters=0;
      var brokenClusters=0;
      var activeSNode=0;
      var pausedSNode=0;
      var inactiveSNode=0;
      var brokenSNode=0;
      var activeNode=0;
      var pausedNode=0;
      var inactiveNode=0;
      var brokenNode=0;
      for(var i=0;i<res.clusterNode.length;i++){
        if(res.clusterNode[i]["status"]==="Active"){
          activeClusters++;
        }
        else if(res.clusterNode[i]["status"]==="Paused"){
          pausedClusters++;
        }
        else if(res.clusterNode[i]["status"]==="Inactive"){
          inactiveClusters++;
        }
        else {
          brokenClusters++;
        }
      }
      for(var i=0;i<res.smartNode.length;i++){
        if(res.smartNode[i]["status"]==="Active"){
          activeSNode++;
        }
        else if(res.smartNode[i]["status"]==="Paused"){
          pausedSNode++;
        }
        else if(res.smartNode[i]["status"]==="Inactive"){
          inactiveSNode++;
        }
        else {
          brokenSNode++;
        }
      }

      for(var i=0;i<res.sensorNode.length;i++){
        if(res.sensorNode[i]["status"]==="Active"){
          activeNode++;
        }
        else if(res.sensorNode[i]["status"]==="Paused"){
          pausedNode++;
        }
        else if(res.sensorNode[i]["status"]==="Inactive"){
          inactiveNode++;
        }
        else {
          brokenNode++;
        }
      }
        console.log(res);
        this.setState({
          activeNode:activeNode,
          pausedNode:pausedNode,
          inactiveNode:inactiveNode,
          brokenNode:brokenNode,
          activeSNode:activeSNode,
          pausedSNode:pausedSNode,
          inactiveSNode:inactiveSNode,
          brokenSNode:brokenSNode,
          activeClusters:activeClusters,
          inactiveClusters:inactiveClusters,
          brokenClusters:brokenClusters,
          pausedClusters:pausedClusters,
          clusterNode:res.clusterNode,
          sensorNode:res.sensorNode,
          smartNode:res.smartNode
        })

    });
  }


  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 14
  };

  showDetails = (type,id) =>{
    this.setState({what:type});
    var details=null;
    if(type===1){
      for(var i=0;i<this.state.clusterNode.length;i++){
        if(this.state.clusterNode[i].id==id){
          details=this.state.clusterNode[i];
          break;
        }
      }
      var arr=[];
      var key=[];
      for(var i in details){
        if(i!=="_id"){
          key.push(i);
          arr.push(details[i]);
        }
      }
      console.log(arr);
      this.setState({isSelected:true,showDetails:arr,key:key});
    }
    else if(type===2){
      for(var i=0;i<this.state.smartNode.length;i++){
        console.log(id);
        console.log(this.state.smartNode[i])
        if(this.state.smartNode[i].id==id){
          details=this.state.smartNode[i];
          break;
        }
      }
      var arr=[];
      var key=[];
      for(var i in details){
        if(i!=="_id"){
          key.push(i);
          arr.push(details[i]);
        }

      }
      this.setState({isSelected:true,showDetails:arr,key:key});
    }
    else{
      for(var i=0;i<this.state.sensorNode.length;i++){
        console.log(id);
        console.log(this.state.sensorNode[i])
        if(this.state.sensorNode[i].id==id){
          details=this.state.sensorNode[i];
          break;
        }
      }
      var arr=[];
      var key=[];
      for(var i in details){
        if(i!=="_id"){
          key.push(i);
          arr.push(details[i]);
        }

      }
      this.setState({isSelected:true,showDetails:arr,key:key});
    }

  }


  gotoSignin = () => {
        this.props.history.push('/');
    };

    gotoSignup = () => {
          this.props.history.push('/signup');
      };

    handleClickSignup = () => {
        this.props.history.push('/signup');
    };

    handleClickSignin = () => {
        this.props.history.push('/');
    };

    addUser = (payload) =>{
      payload.timestamp=new Date();
      if(payload.what==1){
        API.addCNode(payload)
        .then((res) => {
          this.setState({showNotif2:true});
          this.props.history.push('/view');
        });
      }
      else if(payload.what==2){
        API.addSNode(payload)
        .then((res) => {
          this.setState({showNotif2:true});
          this.props.history.push('/view');
        });
      }
      else{
        API.addNode(payload)
        .then((res) => {
          this.setState({showNotif2:true});
          this.props.history.push('/view');
        });
      }
      console.log(payload);
      console.log(new Date());


      setTimeout(function() { //Start the timer
       this.setState({showNotif2:false});//After 1 second, set render to true
    }.bind(this), 2000);

    }

    deleteUser = (payload) =>{
      if(payload.what==1){
        API.deleteCNode(payload)
        .then(res =>{
          this.setState({showNotif4:true});
          this.props.history.push('/view');
        });
      }
      else if(payload.what==2){
        API.deleteSNode(payload)
        .then(res =>{
          this.setState({showNotif4:true});
          this.props.history.push('/view');
        });
      }
      else{
        API.deleteNode(payload)
        .then(res =>{
          this.setState({showNotif4:true});
          this.props.history.push('/view');
        });
      }
      console.log(payload);


      setTimeout(function() { //Start the timer
       this.setState({showNotif4:false});//After 1 second, set render to true
    }.bind(this), 2000);
    }

    updateUser = (payload) =>{
      payload.timestamp=new Date();
      if(payload.what==1){
        API.updateCNode(payload)
        .then(res =>{
          this.setState({showNotif3:true});
          this.props.history.push('/view');
        });
      }
      else if(payload.what==2){
        API.updateSNode(payload)
        .then(res =>{
          this.setState({showNotif3:true});
          this.props.history.push('/view');
        });
      }
      else{
        API.updateNode(payload)
        .then(res =>{
          this.setState({showNotif3:true});
          this.props.history.push('/view');
        });
      }


      setTimeout(function() { //Start the timer
       this.setState({showNotif3:false});//After 1 second, set render to true
    }.bind(this), 2000);
    }

    loginUser = (payload) => {

      if(payload.username==="admin" && payload.password==="admin"){
        this.props.history.push('/view');
      }


      /*
        if (!this.state.LoginInFlag){
            API.loginUser(payload)
                .then((res) => {
                    if (res.status == 201) {
                        this.setState({
                            LoginInFlag:true
                        });
                        this.props.history.push("/");
                    }
                    else {
                        alert("Please check your username and password, and reenter!");
                        this.props.history.push('/');
                        this.props.history.push("/signin");
                    }
                });
        }
        else{
            alert("You are already logged in");
            this.props.history.push('/');
        }
        */
    };

    registerUser = (payload) => {
      this.props.history.push("/");
      var self=this;
      this.setState({showNotif:true});

      setTimeout(function() { //Start the timer
       this.setState({showNotif:false});//After 1 second, set render to true
    }.bind(this), 2000);

      //alert("In alert");
      /*
        API.registerUser(payload)
            .then((res) => {
                console.log(res.msg);
                if (res.status == 201) {
                    alert("User registration is successful!");
                    this.props.history.push("/signin");
                }
                else if (res.status == 401) {
                    alert("User with this email id already exists. Please use another email id!");
                    this.props.history.push("/");
                    this.props.history.push("/signup");
                }
                else {
                    alert("Failed to register!Please check all the fields and try again");
                    this.props.history.push("/signup");
                }

            });
            */
    }


  componentWillMount(){
    console.log("In componentWillMount");

  }

  render(){
    return(
      <div  className="container-fluid" style={{backgroundColor:"white"}}>
        <Route exact path="/view" render={() => (
            <div>
              <Header handleClickSignup={this.handleClickSignup} handleClickSignin={this.handleClickSignin}/>
            {this.state.showNotif2?(<div style={{backgroundColor:"blue", height:"70%",color:"white"}}>Updated the node Successfully</div>):(<div></div>)}
            {this.state.showNotif3?(<div style={{backgroundColor:"blue", height:"70%",color:"white"}}>Inserted the node Successfully</div>):(<div></div>)}
            {this.state.showNotif4?(<div style={{backgroundColor:"blue", height:"70%",color:"white"}}>Deleted the node Successfully</div>):(<div></div>)}
                  <div style={{ height: '60vh', width: '100%' }}>
                    <GoogleMapReact
    bootstrapURLKeys={{ key: "AIzaSyBUkSNy_eqzXsqP0fKFZturqI-3iWqkblI" }}
    defaultCenter={this.props.center}
    defaultZoom={this.props.zoom}>
  {this.state.clusterNode?this.state.clusterNode.map(node =>

    <Circle onClick={() => this.showDetails(1,node.id)}  r={10} lat={node.latitude} lng={node.longitude} fill={{color:'yellow'}} stroke={{color:'pink'}} strokeWidth={3} />
  ):<div></div>}


  {this.state.smartNode?this.state.smartNode.map(node =>
    <Triangle onClick={() => this.showDetails(2,node.id)} width={10} height={10} lat={node.latitude} lng={node.longitude} fill={{color:'orange'}} stroke={{color:'black'}} strokeWidth={3} />
  ):<div></div>}


  {this.state.sensorNode?this.state.sensorNode.map(node =>
    <Rectangle onClick={() => this.showDetails(3,node.id)} width={10} height={10} lat={node.latitude} lng={node.longitude} fill={{color:'red'}} stroke={{color:'green'}} strokeWidth={3} />
  ):<div></div>}

  </GoogleMapReact>
  <div className="container-fluid" style={{marginTop:"0%",marginLeft:"10%"}}>
    {this.state.isSelected?(<div>
      {this.state.what==1?(<div><h1>Cluster Node</h1></div>):(<div></div>)}
      {this.state.what==2?(<div><h1>Smart Node</h1></div>):(<div></div>)}
      {this.state.what==3?(<div><h1>Sensor Node</h1></div>):(<div></div>)}
      <table style={{width:"40%",border:"1px solid black"}} className="table">
      <tr>
      <th>Property</th>
      <th>Value</th>
      </tr>
      {this.state.showDetails.map((node,i) =>
          <tr>
            <td><h3>{this.state.key[i]}</h3></td>
            <td><h3>{node}</h3></td>

          </tr>
        )}
      </table>
    </div>):(<div></div>)}
  </div>
                  </div>

    <div>
      <h1>Legend</h1>
          Cluster node : <Circle  r={10}  fill={{color:'yellow'}} stroke={{color:'pink'}} strokeWidth={3} /><br/>
        Smart node:      <Triangle width={10} height={10}  fill={{color:'orange'}} stroke={{color:'black'}} strokeWidth={3} /><br/>
      Sensors:  <Rectangle width={10} height={10} fill={{color:'red'}} stroke={{color:'green'}} strokeWidth={3} /><br/>


    </div>
</div>
        )}/>
      <Route exact path="/signup" render={() => (
                  <div>
                    <Signup gotoSignin={this.gotoSignin} registerUser={this.registerUser}
                                handleClickSignup={this.handleClickSignup} handleClickSignin={this.handleClickSignin}/>

                  </div>

        )}/>
      <Route exact path="/clusterReport" render={() => (
                    <div>
                      <Header handleClickSignup={this.handleClickSignup} handleClickSignin={this.handleClickSignin}/>

                      {this.state.clusterNode?(<div>

                        <br/><br/>
                      <table style={{width:"60%",height:"60%",marginLeft:"20%",border:"1px solid black"}} className="table">
                      <tr>
                      <th>ID</th>
                      <th>Latitude</th>
                        <th>Longitude</th>
                          <th>Status</th>
                            <th>Communicating Nodes</th>
                              <th>Created on</th>
                              <th>Updated on</th>
                      </tr>
                      {this.state.clusterNode.map( item =>
                        <tr>

                          <td>{item.id}</td>
                          <td>{item.latitude}</td>
                          <td>{item.longitude}</td>
                          <td>{item.status}</td>
                          <td>{item.communicatingNodes}</td>
                          <td>{item.timestamp}</td>
                          <td>{item.updatedTimestamp}</td>
                        </tr>
                      )}
                    </table>
                    <br/>
                    <h1 style={{marginLeft:"30%"}}>Active: {this.state.activeClusters}</h1>
                      <h1 style={{marginLeft:"30%"}}>Broken: {this.state.brokenClusters}</h1>
                        <h1 style={{marginLeft:"30%"}}>Paused: {this.state.pausedClusters}</h1>
                          <h1 style={{marginLeft:"30%"}}>Inactive: {this.state.inactiveClusters}</h1>


                    </div>):(<div></div>)}
                    </div>

          )}/>


        <Route exact path="/smartReport" render={() => (
                        <div>
                          <Header handleClickSignup={this.handleClickSignup} handleClickSignin={this.handleClickSignin}/>

                          {this.state.smartNode?(<div>

                            <br/><br/>
                          <table style={{width:"60%",height:"60%",marginLeft:"20%",border:"1px solid black"}} className="table">
                          <tr>
                          <th>ID</th>
                          <th>Latitude</th>
                            <th>Longitude</th>
                              <th>Status</th>
                                <th>Communicating Nodes</th>
                                  <th>Created on</th>
                                  <th>Updated on</th>
                                  <th>Within Cluster</th>
                          </tr>
                          {this.state.smartNode.map( item =>
                            <tr>

                              <td>{item.id}</td>
                              <td>{item.latitude}</td>
                              <td>{item.longitude}</td>
                              <td>{item.status}</td>
                              <td>{item.commNode}</td>
                              <td>{item.timestamp}</td>
                              <td>{item.updatedTimestamp}</td>
                              <td>{item.withinCluster}</td>
                            </tr>
                          )}
                        </table>
                        <br/>
                        <h1 style={{marginLeft:"30%"}}>Active: {this.state.activeSNode}</h1>
                          <h1 style={{marginLeft:"30%"}}>Broken: {this.state.brokenSNode}</h1>
                            <h1 style={{marginLeft:"30%"}}>Paused: {this.state.pausedSNode}</h1>
                              <h1 style={{marginLeft:"30%"}}>Inactive: {this.state.inactiveSNode}</h1>


                        </div>):(<div></div>)}
                        </div>

              )}/>
            <Route exact path="/sensorReport" render={() => (
                            <div>
                              <Header handleClickSignup={this.handleClickSignup} handleClickSignin={this.handleClickSignin}/>

                              {this.state.sensorNode?(<div>

                                <br/><br/>
                              <table style={{width:"60%",height:"60%",marginLeft:"20%",border:"1px solid black"}} className="table">
                              <tr>
                              <th>ID</th>
                              <th>Latitude</th>
                                <th>Longitude</th>
                                <th>Type</th>
                                  <th>Status</th>
                                    <th>Communicating With Smart Node</th>
                                    <th>Within the Cluster</th>
                                      <th>Created on</th>
                                      <th>Updated on</th>
                              </tr>
                              {this.state.sensorNode.map( item =>
                                <tr>

                                  <td>{item.id}</td>
                                  <td>{item.latitude}</td>
                                  <td>{item.longitude}</td>
                                  <td>{item.type}</td>
                                  <td>{item.status}</td>
                                  <td>{item.withinSmartNode}</td>
                                    <td>{item.withinCluster}</td>
                                  <td>{item.timestamp}</td>
                                  <td>{item.updatedTimestamp}</td>
                                </tr>
                              )}
                            </table>
                            <br/>
                            <h1 style={{marginLeft:"30%"}}>Active: {this.state.activeNode}</h1>
                              <h1 style={{marginLeft:"30%"}}>Broken: {this.state.brokenNode}</h1>
                                <h1 style={{marginLeft:"30%"}}>Paused: {this.state.pausedNode}</h1>
                                  <h1 style={{marginLeft:"30%"}}>Inactive: {this.state.inactiveNode}</h1>


                            </div>):(<div></div>)}
                            </div>

                  )}/>

      <Route exact path="/" render={() => (
                  <div>
                    {this.state.showNotif?(<div style={{backgroundColor:"blue", height:"30%",color:"white"}}>User Successfully Registered</div>):(<div></div>)}
                    <Signin gotoSignup={this.gotoSignup} loginUser={this.loginUser}
                                handleClickSignup={this.handleClickSignup} handleClickSignin={this.handleClickSignin}/>
                  </div>

        )}/>

      <Route exact path="/insert" render={() => (

                      <div>
                      <Header handleClickSignup={this.handleClickSignup} handleClickSignin={this.handleClickSignin}/>
                      <br/><br/><br/><br/><br/>
                      <div style={{marginLeft:"40%"}}>
                      <h2 style={{color:"blue"}}>Insert a Node</h2> <select name="carlist" onChange={(event) => {
                    this.setState({
                        what: event.target.value
                    });}} value={this.state.what} style={{height:"30%",width:"30%"}} form="carform">
                                      <option value="1">Cluster Node</option>
                                      <option value="2">Smart Node</option>
                                      <option value="3">Sensor Node</option>
                                     </select>
                                     <br/>
                                     {this.state.what==1?(<div>
                                       <div className="ui large form">
                                         <div className="ten wide field">
                                           <h1><label>Latitude</label></h1>
                                           <input placeholder="Latitude" type="text" style={{width:"30%",height:"300%"}} value={this.state.latitude} onChange={(event) => {
                                         this.setState({
                                             latitude: event.target.value
                                         });}}/>
                                         </div>
                                       </div>
                                       <div className="ui large form">
                                         <div className="ten wide field">
                                           <h1><label>Longitude</label></h1>
                                           <input placeholder="Longitude" type="text" style={{width:"30%",height:"300%"}} value={this.state.longitude} onChange={(event) => {
                                         this.setState({
                                             longitude: event.target.value
                                         });}}/>
                                         </div>
                                       </div>
                                       <div className="ui large form">
                                         <div className="ten wide field">
                                           <h1><label>Status</label></h1>
                                           <input placeholder="Status" type="text" style={{width:"30%",height:"300%"}} value={this.state.status} onChange={(event) => {
                                         this.setState({
                                             status: event.target.value
                                         });}}/>
                                         </div>
                                       </div>
                                       <div className="ui large form">
                                         <div className="ten wide field">
                                           <h1><label>Communicating Nodes</label></h1>
                                           <input placeholder="Communicating Nodes" type="text" style={{width:"30%",height:"300%"}} value={this.state.commNode} onChange={(event) => {
                                         this.setState({
                                             commNode: event.target.value
                                         });}}/>
                                         </div>
                                       </div>

                                     </div>):(<div></div>)}
                                     {this.state.what==2?(<div>
                                       <div className="ui large form">
                                         <div className="ten wide field">
                                           <h1><label>Latitude</label></h1>
                                           <input placeholder="Latitude" type="text" style={{width:"30%",height:"300%"}} value={this.state.latitude} onChange={(event) => {
                                         this.setState({
                                             latitude: event.target.value
                                         });}}/>
                                         </div>
                                       </div>
                                       <div className="ui large form">
                                         <div className="ten wide field">
                                           <h1><label>Longitude</label></h1>
                                           <input placeholder="Longitude" type="text" style={{width:"30%",height:"300%"}} value={this.state.longitude} onChange={(event) => {
                                         this.setState({
                                             longitude: event.target.value
                                         });}}/>
                                         </div>
                                       </div>
                                       <div className="ui large form">
                                         <div className="ten wide field">
                                           <h1><label>Status</label></h1>
                                           <input placeholder="Status" type="text" style={{width:"30%",height:"300%"}} value={this.state.status} onChange={(event) => {
                                         this.setState({
                                             status: event.target.value
                                         });}}/>
                                         </div>
                                       </div>
                                       <div className="ui large form">
                                         <div className="ten wide field">
                                           <h1><label>Within Cluster</label></h1>
                                           <input placeholder="Within Cluster" type="text" style={{width:"30%",height:"300%"}} value={this.state.withinCluster} onChange={(event) => {
                                         this.setState({
                                             withinCluster: event.target.value
                                         });}}/>
                                         </div>
                                       </div>
                                       <div className="ui large form">
                                         <div className="ten wide field">
                                           <h1><label>Communicating Node</label></h1>
                                           <input placeholder="Communicating Node" type="text" style={{width:"30%",height:"300%"}} value={this.state.commNode} onChange={(event) => {
                                         this.setState({
                                             commNode: event.target.value
                                         });}}/>
                                         </div>
                                       </div>

                                     </div>):(<div></div>)}
                                     {this.state.what==3?(<div>
                                       <div className="ui large form">
                                         <div className="ten wide field">
                                           <h1><label>Latitude</label></h1>
                                           <input placeholder="Latitude" type="text" style={{width:"30%",height:"300%"}} value={this.state.latitude} onChange={(event) => {
                                         this.setState({
                                             latitude: event.target.value
                                         });}}/>
                                         </div>
                                       </div>
                                       <div className="ui large form">
                                         <div className="ten wide field">
                                           <h1><label>Longitude</label></h1>
                                           <input placeholder="Longitude" type="text" style={{width:"30%",height:"300%"}} value={this.state.longitude} onChange={(event) => {
                                         this.setState({
                                             longitude: event.target.value
                                         });}}/>
                                         </div>
                                       </div>
                                       <div className="ui large form">
                                         <div className="ten wide field">
                                           <h1><label>Status</label></h1>
                                           <input placeholder="Status" type="text" style={{width:"30%",height:"300%"}} value={this.state.status} onChange={(event) => {
                                         this.setState({
                                             status: event.target.value
                                         });}}/>
                                         </div>
                                       </div>
                                       <div className="ui large form">
                                         <div className="ten wide field">
                                           <h1><label>Within Cluster</label></h1>
                                           <input placeholder="Within Cluster" type="text" style={{width:"30%",height:"300%"}} value={this.state.withinCluster} onChange={(event) => {
                                         this.setState({
                                             withinCluster: event.target.value
                                         });}}/>
                                         </div>
                                       </div>
                                       <div className="ui large form">
                                         <div className="ten wide field">
                                           <h1><label>Within Smartnode</label></h1>
                                           <input placeholder="Within Smartnode" type="text" style={{width:"30%",height:"300%"}} value={this.state.commNode} onChange={(event) => {
                                         this.setState({
                                             commNode: event.target.value
                                         });}}/>
                                         </div>
                                       </div>
                                       <div className="ui large form">
                                         <div className="ten wide field">
                                           <h1><label>Type</label></h1>
                                           <input placeholder="Type" type="text" style={{width:"30%",height:"300%"}} value={this.state.type} onChange={(event) => {
                                         this.setState({
                                             type: event.target.value
                                         });}}/>
                                         </div>
                                       </div>
                                     </div>):(<div></div>)}

                                       <div style={{marginTop: "2%",float: "left",marginLeft:"10%"}}>
                                         <button className="ui orange button" style={{backgroundColor:"blue",color:"white"}} onClick={()=>{this.addUser({latitude:this.state.latitude,longitude:this.state.longitude,what:this.state.what,commNode:this.state.commNode,type:this.state.type,withinCluster:this.state.withinCluster,status:this.state.status})}}>Insert Node</button>
                                       </div>
                            </div>
                    </div>

          )}/>
        <Route exact path="/update" render={() => (

                                <div>
                                <Header handleClickSignup={this.handleClickSignup} handleClickSignin={this.handleClickSignin}/>
                                <br/><br/><br/><br/><br/>
                                <div style={{marginLeft:"40%"}}>
                                <h2 style={{color:"blue"}}>Update a Node</h2> <select name="carlist" onChange={(event) => {
                              this.setState({
                                  what: event.target.value
                              });}} value={this.state.what} style={{height:"30%",width:"30%"}} form="carform">
                                                <option value="1">Cluster Node</option>
                                                <option value="2">Smart Node</option>
                                                <option value="3">Sensor Node</option>
                                               </select>
                                               <br/>
                                                 <div className="ui large form">
                                                   <div className="ten wide field">
                                                     <h1><label>ID</label></h1>
                                                     <input placeholder="ID" type="text" style={{width:"30%",height:"300%"}} value={this.state.id} onChange={(event) => {
                                                   this.setState({
                                                       id: event.target.value
                                                   });}}/>
                                                   </div>
                                                 </div>
                                               {this.state.what==1?(<div>
                                                 <div className="ui large form">
                                                   <div className="ten wide field">
                                                     <h1><label>Latitude</label></h1>
                                                     <input placeholder="Latitude" type="text" style={{width:"30%",height:"300%"}} value={this.state.latitude} onChange={(event) => {
                                                   this.setState({
                                                       latitude: event.target.value
                                                   });}}/>
                                                   </div>
                                                 </div>
                                                 <div className="ui large form">
                                                   <div className="ten wide field">
                                                     <h1><label>Longitude</label></h1>
                                                     <input placeholder="Longitude" type="text" style={{width:"30%",height:"300%"}} value={this.state.longitude} onChange={(event) => {
                                                   this.setState({
                                                       longitude: event.target.value
                                                   });}}/>
                                                   </div>
                                                 </div>
                                                 <div className="ui large form">
                                                   <div className="ten wide field">
                                                     <h1><label>Status</label></h1>
                                                     <input placeholder="Status" type="text" style={{width:"30%",height:"300%"}} value={this.state.status} onChange={(event) => {
                                                   this.setState({
                                                       status: event.target.value
                                                   });}}/>
                                                   </div>
                                                 </div>
                                                 <div className="ui large form">
                                                   <div className="ten wide field">
                                                     <h1><label>Communicating Nodes</label></h1>
                                                     <input placeholder="Communicating Nodes" type="text" style={{width:"30%",height:"300%"}} value={this.state.commNode} onChange={(event) => {
                                                   this.setState({
                                                       commNode: event.target.value
                                                   });}}/>
                                                   </div>
                                                 </div>

                                               </div>):(<div></div>)}
                                               {this.state.what==2?(<div>
                                                 <div className="ui large form">
                                                   <div className="ten wide field">
                                                     <h1><label>Latitude</label></h1>
                                                     <input placeholder="Latitude" type="text" style={{width:"30%",height:"300%"}} value={this.state.latitude} onChange={(event) => {
                                                   this.setState({
                                                       latitude: event.target.value
                                                   });}}/>
                                                   </div>
                                                 </div>
                                                 <div className="ui large form">
                                                   <div className="ten wide field">
                                                     <h1><label>Longitude</label></h1>
                                                     <input placeholder="Longitude" type="text" style={{width:"30%",height:"300%"}} value={this.state.longitude} onChange={(event) => {
                                                   this.setState({
                                                       longitude: event.target.value
                                                   });}}/>
                                                   </div>
                                                 </div>
                                                 <div className="ui large form">
                                                   <div className="ten wide field">
                                                     <h1><label>Status</label></h1>
                                                     <input placeholder="Status" type="text" style={{width:"30%",height:"300%"}} value={this.state.status} onChange={(event) => {
                                                   this.setState({
                                                       status: event.target.value
                                                   });}}/>
                                                   </div>
                                                 </div>
                                                 <div className="ui large form">
                                                   <div className="ten wide field">
                                                     <h1><label>Within Cluster</label></h1>
                                                     <input placeholder="Within Cluster" type="text" style={{width:"30%",height:"300%"}} value={this.state.withinCluster} onChange={(event) => {
                                                   this.setState({
                                                       withinCluster: event.target.value
                                                   });}}/>
                                                   </div>
                                                 </div>
                                                 <div className="ui large form">
                                                   <div className="ten wide field">
                                                     <h1><label>Communicating Node</label></h1>
                                                     <input placeholder="Communicating Node" type="text" style={{width:"30%",height:"300%"}} value={this.state.commNode} onChange={(event) => {
                                                   this.setState({
                                                       commNode: event.target.value
                                                   });}}/>
                                                   </div>
                                                 </div>

                                               </div>):(<div></div>)}
                                               {this.state.what==3?(<div>
                                                 <div className="ui large form">
                                                   <div className="ten wide field">
                                                     <h1><label>Latitude</label></h1>
                                                     <input placeholder="Latitude" type="text" style={{width:"30%",height:"300%"}} value={this.state.latitude} onChange={(event) => {
                                                   this.setState({
                                                       latitude: event.target.value
                                                   });}}/>
                                                   </div>
                                                 </div>
                                                 <div className="ui large form">
                                                   <div className="ten wide field">
                                                     <h1><label>Longitude</label></h1>
                                                     <input placeholder="Longitude" type="text" style={{width:"30%",height:"300%"}} value={this.state.longitude} onChange={(event) => {
                                                   this.setState({
                                                       longitude: event.target.value
                                                   });}}/>
                                                   </div>
                                                 </div>
                                                 <div className="ui large form">
                                                   <div className="ten wide field">
                                                     <h1><label>Status</label></h1>
                                                     <input placeholder="Status" type="text" style={{width:"30%",height:"300%"}} value={this.state.status} onChange={(event) => {
                                                   this.setState({
                                                       status: event.target.value
                                                   });}}/>
                                                   </div>
                                                 </div>
                                                 <div className="ui large form">
                                                   <div className="ten wide field">
                                                     <h1><label>Within Cluster</label></h1>
                                                     <input placeholder="Within Cluster" type="text" style={{width:"30%",height:"300%"}} value={this.state.withinCluster} onChange={(event) => {
                                                   this.setState({
                                                       withinCluster: event.target.value
                                                   });}}/>
                                                   </div>
                                                 </div>
                                                 <div className="ui large form">
                                                   <div className="ten wide field">
                                                     <h1><label>Within Smartnode</label></h1>
                                                     <input placeholder="Within Smartnode" type="text" style={{width:"30%",height:"300%"}} value={this.state.commNode} onChange={(event) => {
                                                   this.setState({
                                                       commNode: event.target.value
                                                   });}}/>
                                                   </div>
                                                 </div>
                                                 <div className="ui large form">
                                                   <div className="ten wide field">
                                                     <h1><label>Type</label></h1>
                                                     <input placeholder="Type" type="text" style={{width:"30%",height:"300%"}} value={this.state.type} onChange={(event) => {
                                                   this.setState({
                                                       type: event.target.value
                                                   });}}/>
                                                   </div>
                                                 </div>
                                               </div>):(<div></div>)}

                                                 <div style={{marginTop: "2%",float: "left",marginLeft:"10%"}}>
                                                   <button className="ui orange button" style={{backgroundColor:"blue",color:"white"}} onClick={()=>{this.updateUser({id:this.state.id,latitude:this.state.latitude,longitude:this.state.longitude,status:this.state.status,what:this.state.what,commNode:this.state.commNode,type:this.state.type,withinCluster:this.state.withinCluster,numOfNodes:this.state.numOfNodes})}}>Update Node</button>
                                                 </div>
                                      </div>
                              </div>
              )}/>
            <Route exact path="/delete" render={() => (

                                    <div>
                                    <Header handleClickSignup={this.handleClickSignup} handleClickSignin={this.handleClickSignin}/>
                                    <br/><br/><br/><br/><br/>
                                    <div style={{marginLeft:"40%"}}>
                                    <h2 style={{color:"blue"}}>Delete a Node</h2> <select name="carlist" onChange={(event) => {
                                  this.setState({
                                      what: event.target.value
                                  });}} value={this.state.what} style={{height:"30%",width:"30%"}} form="carform">
                                                    <option value="1">Cluster Node</option>
                                                    <option value="2">Smart Node</option>
                                                    <option value="3">Sensor Node</option>
                                                   </select>
                                                   <br/>
                                                   <div>
                                                     <div className="ui large form">
                                                       <div className="ten wide field">
                                                         <h1><label>ID</label></h1>
                                                         <input placeholder="ID" type="text" style={{width:"30%",height:"300%"}} value={this.state.id} onChange={(event) => {
                                                       this.setState({
                                                           id: event.target.value
                                                       });}}/>
                                                       </div>
                                                     </div>

                                                   </div>

                                                     <div style={{marginTop: "2%",float: "left",marginLeft:"10%"}}>
                                                       <button className="ui orange button" style={{backgroundColor:"blue",color:"white"}} onClick={()=>{this.deleteUser({what:this.state.what,id:this.state.id})}}>Delete Node</button>
                                                     </div>
                                          </div>
                                  </div>

                    )}/>


      </div>

    );
  }
}



export default withRouter(Routing);
