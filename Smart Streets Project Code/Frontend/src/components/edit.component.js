import React, { Component } from "react";
import axios from "axios";
import SideBar from '../components/SideBar/SideBar'

export default class Edit extends Component {
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

  componentDidMount() {
    axios
      .get("http://localhost:3001/sensor/edit/" + this.props.match.params.id)
      .then(response => {
        this.setState({
          clusterId: response.data.clusterId,
          smartNodeId: response.data.smartNodeId,
          sensorNodeId: response.data.sensorNodeId,
          sensorType: response.data.sensorType,
          sensorName: response.data.sensorName,
          sensorValue: response.data.sensorValue
        });
      })
      .catch(function(error) {
        console.log(error);
      });
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
      .post(
        "http://localhost:3001/sensor/update/" + this.props.match.params.id,
        obj
      )
      .then(res => console.log(res.data));
    this.props.history.push("/index");
    window.location.reload();
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3 align="center">Update Sensor Data</h3>
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
            <div className="text-center">
              <input
                type="submit"
                value="Update Record"
                className="btn btn-primary"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}
