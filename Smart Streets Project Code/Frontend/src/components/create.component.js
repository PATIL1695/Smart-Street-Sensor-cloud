import React, { Component } from "react";
import axios from "axios";
import SideBar from '../components/SideBar/SideBar'
import {Link} from 'react-router-dom';

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.onChangeClusterId = this.onChangeClusterId.bind(this);
    this.onChangeSmartNodeId = this.onChangeSmartNodeId.bind(this);
    this.onChangeSensorNodeId = this.onChangeSensorNodeId.bind(this);
    this.onChangeSensorType = this.onChangeSensorType.bind(this);
    this.onChangeSensorName = this.onChangeSensorName.bind(this);
    this.onChangeSensorValue = this.onChangeSensorValue.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      clusterId: "",
      smartNodeId: "",
      sensorNodeId: "",
      sensorType: "",
      sensorName: "",
      sensorValue: ""
    };
  }
  onChangeClusterId(e) {
    this.setState({
      clusterId: e.target.value
    });
  }
  onChangeSmartNodeId(e) {
    this.setState({
      smartNodeId: e.target.value
    });
  }
  onChangeSensorNodeId(e) {
    this.setState({
      sensorNodeId: e.target.value
    });
  }
  onChangeSensorType(e) {
    this.setState({
      sensorType: e.target.value
    });
  }
  onChangeSensorName(e) {
    this.setState({
      sensorName: e.target.value
    });
  }
  onChangeSensorValue(e) {
    this.setState({
      sensorValue: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      clusterId: this.state.clusterId,
      smartNodeId: this.state.smartNodeId,
      sensorNodeId: this.state.sensorNodeId,
      sensorType: this.state.sensorType,
      sensorName: this.state.sensorName,
      sensorValue: this.state.sensorValue
    };
    axios
      .post("http://localhost:3001/sensor/add", obj)
      .then(res => console.log(res.data));

    this.setState({
      clusterId: "",
      smartNodeId: "",
      sensorNodeId: "",
      sensorType: "",
      sensorName: "",
      sensorValue: ""
    });
  }

  render() {
    return (
      <div>

                         <div className = "col-lg-3 vertical-menu-owner">
                    <h4>Welcome</h4>
                    <Link to="">Infrastructure Manager</Link>
                    <Link to="/createNode">Sensor Simulator</Link>
                    <Link to="/create">Data Manager</Link>
                    <a href="https://public.tableau.com/profile/kashika8795#!/vizhome/InfrastructureManagerView/InfrastructureManagerDashboard?publish=yes">Dashboard</a>
                    <Link to="">Loadbalancer</Link>
                    </div>

  
      <div  style={{ "marginTop": "10", "float": "left" }}>
        <h3 align="center">Add Sensor Data</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Cluster Id: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.clusterId}
              onChange={this.onChangeClusterId}
            />
          </div>
          <div className="form-group">
            <label>Smart Node Id: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.smartNodeId}
              onChange={this.onChangeSmartNodeId}
            />
          </div>
          <div className="form-group">
            <label>Sensor Node Id: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.sensorNodeId}
              onChange={this.onChangeSensorNodeId}
            />
          </div>
          <div className="form-group">
            <label>Sensor Type: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.sensorType}
              onChange={this.onChangeSensorType}
            />
          </div>
          <div className="form-group">
            <label>Sensor Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.sensorName}
              onChange={this.onChangeSensorName}
            />
          </div>
          <div className="form-group">
            <label>Sensor Value: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.sensorValue}
              onChange={this.onChangeSensorValue}
            />
          </div>
          <div className="form-group">
            <div class="text-center">
              <input
                type="submit"
                value="Add Record"
                className="btn btn-primary center-block"
              />
            </div>
          </div>
        </form>
      </div>
      </div>
    );
  }
}
