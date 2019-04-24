import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Select from "react-select";
import SideBar from '../components/SideBar/SideBar'

// Import React Table
import "react-table/react-table.css";

const options = [
  { value: 5, label: "5" },
  { value: 10, label: "10" },
  { value: 15, label: "15" }
];

class PageSize extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { value: 5 };
  }
  handleChange(e) {
    this.props.onPageSizeChanged(e.value);
  }
  render() {
    return (
      <div
        style={{
          //marginTop: -60 + "px",
          marginRight: 10 + "px",
          width: 70 + "px",
          marginBottom: 10 + "px",
          float: "right"
        }}
      >
        <Select
          defaultValue={options[0]}
          value={this.props.value}
          onChange={this.handleChange}
          options={options}
        />
      </div>
    );
  }
}
class GridPager extends Component {
  render() {
    var li = [];
    var pageCount = this.props.Size;
    for (var i = 1; i <= pageCount; i++) {
      if (this.props.currentPage === i) {
        li.push(
          <li className="active">
            <a className="page-link" href="#">
              {i}
            </a>
          </li>
        );
      } else {
        li.push(
          <li>
            <a
              className="page-link"
              href="#"
              onClick={this.props.onPageChanged.bind(null, i)}
            >
              {i}
            </a>
          </li>
        );
      }
    }
    return (
      <ul className="pagination" style={{ marginLeft: 20 }}>
        {li}
      </ul>
    );
  }
}
class RecordGridRow extends Component {
  constructor(props) {
    super(props);
    this.deleteRecord = this.deleteRecord.bind(this);
  }

  deleteRecord() {
    axios
      .get("http://localhost:3001/sensor/delete/" + this.props.item._id)
      .then(console.log("Deleted"))
      .catch(err => console.log(err));
    window.location.reload();
  }
  render() {
    return (
      <tr>
        <td>{this.props.item.clusterId}</td>
        <td>{this.props.item.smartNodeId}</td>
        <td>{this.props.item.sensorNodeId}</td>
        <td>{this.props.item.sensorType}</td>
        <td>{this.props.item.sensorName}</td>
        <td>{this.props.item.sensorValue}</td>
        <td>
          <Link
            to={"/edit/" + this.props.item._id}
            className="btn btn-primary btn-sm"
          >
            Edit
          </Link>
        </td>
        <td>
          <button onClick={this.deleteRecord} className="btn btn-danger btn-sm">
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

export default class Search extends Component {
  searchQuery() {
    if (this.state.showResult) {
      return this.searchQueryResult();
    }

    return (
      <div style={{ marginTop: 10 }}>
        <h3 align="center">Search Sensor Records</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-inline" style={{ marginTop: 10 }}>
            <label className="sr-only" htmlFor="inlineFormInput">
              Cluster Id:{" "}
            </label>
            <input
              type="text"
              className="form-control mb-2 mr-sm-2 mb-sm-0"
              id="inlineFormInput"
              placeholder="clusterId"
              value={this.state.clusterId}
              onChange={this.onChangeClusterId}
            />
            <label className="sr-only" htmlFor="inlineFormInput">
              Smart Node Id:{" "}
            </label>
            <input
              type="text"
              className="form-control mb-2 mr-sm-2 mb-sm-0"
              id="inlineFormInput"
              placeholder="smartNodeId"
              value={this.state.smartNodeId}
              onChange={this.onChangeSmartNodeId}
            />
            <label htmlFor="inlineFormInput">Start Date: </label>
            <input
              type="text"
              className="form-control mb-2 mr-sm-2 mb-sm-0"
              id="inlineFormInput"
              placeholder="YYYY/MM/DD"
              title="Enter a date in this format YYYY/MM/DD"
              value={this.state.fromDate}
              onChange={this.onChangeFromDate}
            />
            <label htmlFor="inlineFormInput">End Date: </label>
            <input
              type="text"
              className="form-control mb-2 mr-sm-2 mb-sm-0"
              id="inlineFormInput"
              placeholder="YYYY/MM/DD"
              title="Enter a date in this format YYYY/MM/DD"
              value={this.state.toDate}
              onChange={this.onChangeToDate}
            />
            <input type="submit" value="Search" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }

  searchQueryResult() {
    var rows = [];
    this.state.Data.docs.forEach(function(item) {
      rows.push(<RecordGridRow item={item} />);
    });
    return (
      <div style={{ marginTop: 10 }}>
        <h3 align="center">Search Sensor Records</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-inline" style={{ marginTop: 10 }}>
            <label className="sr-only" htmlFor="inlineFormInput">
              Cluster Id:{" "}
            </label>
            <input
              type="text"
              className="form-control mb-2 mr-sm-2 mb-sm-0"
              id="inlineFormInput"
              placeholder="clusterId"
              value={this.state.clusterId}
              onChange={this.onChangeClusterId}
            />

            <label className="sr-only" htmlFor="inlineFormInput">
              Smart Node Id:{" "}
            </label>
            <input
              type="text"
              className="form-control mb-2 mr-sm-2 mb-sm-0"
              id="inlineFormInput"
              placeholder="smartNodeId"
              value={this.state.smartNodeId}
              onChange={this.onChangeSmartNodeId}
            />
            <label htmlFor="inlineFormInput">
              Start Date:{" "}
            </label>
            <input
              type="text"
              className="form-control mb-2 mr-sm-2 mb-sm-0"
              id="inlineFormInput"
              placeholder="YYYY/MM/DD"
              title="Enter a date in this format YYYY/MM/DD"
              value={this.state.fromDate}
              onChange={this.onChangeFromDate}
            />
            <label htmlFor="inlineFormInput">
              End Date:{" "}
            </label>
            <input
              type="text"
              className="form-control mb-2 mr-sm-2 mb-sm-0"
              id="inlineFormInput"
              placeholder="YYYY/MM/DD"
              title="Enter a date in this format YYYY/MM/DD"
              value={this.state.toDate}
              onChange={this.onChangeToDate}
            />
            <input type="submit" value="Search" className="btn btn-primary" />
          </div>
        </form>
        <div style={{ marginTop: 10 }}>
          <div className="table-responsive table-striped">
            <table className="table" style={{ marginLeft: 20, marginTop: 20 }}>
              <thead className="thead-dark">
                <tr>
                  <th>Cluster Id</th>
                  <th>Smart Node Id</th>
                  <th>Sensor Node Id</th>
                  <th>Sensor Type</th>
                  <th>Sensor Name</th>
                  <th>Sensor Value</th>
                  <th colSpan="2">Action</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </table>
          </div>
          <PageSize
            onPageSizeChanged={this.sizeChange}
            limit={this.state.Data.limit}
          />
          <GridPager
            Size={this.state.Data.pages}
            onPageChanged={this.pageChanged}
            currentPage={this.state.Data.currentPage}
          />
        </div>
      </div>
    );
  }

  constructor(props) {
    super(props);
    this.onChangeClusterId = this.onChangeClusterId.bind(this);
    this.onChangeSmartNodeId = this.onChangeSmartNodeId.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.searchQuery = this.searchQuery.bind(this);
    this.searchQueryResult = this.searchQueryResult.bind(this);
    this.pageChanged = this.pageChanged.bind(this);
    this.sizeChange = this.sizeChange.bind(this);
    this.onChangeFromDate = this.onChangeFromDate.bind(this);
    this.onChangeToDate = this.onChangeToDate.bind(this);
    this.state = {
      showResult: false,
      clusterId: "",
      smartNodeId: "",
      fromDate: "",
      toDate: "",
      Data: {
        docs: [],
        pages: 0,
        page: 1,
        limit: 5
      }
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
  onChangeFromDate(e) {
    this.setState({
      fromDate: e.target.value
    });
  }
  onChangeToDate(e) {
    this.setState({
      toDate: e.target.value
    });
  }

  pageChanged(pageNumber, e) {
    e.preventDefault();
    var d = this.state.Data;
    d.page = pageNumber;
    this.setState({
      Data: d
    });
    this.populateData();
  }

  sizeChange(value) {
    var d = this.state.Data;
    d.limit = value;
    this.setState({
      Data: d
    });
    this.populateData();
  }

  populateData() {
    var params = {
      limit: this.state.Data.limit,
      page: this.state.Data.page
    };

    var pagination = "?size=" + params.limit + "&page=" + params.page;
    var query = "";
    if (this.state.clusterId) {
      query += "&clusterId=" + this.state.clusterId;
    }
    if (this.state.smartNodeId) {
      query += "&smartNodeId=" + this.state.smartNodeId;
    }
    if (this.state.fromDate) {
      query += "&fromDate=" + this.state.fromDate;
    }
    if (this.state.toDate) {
      query += "&toDate=" + this.state.toDate;
    }

    axios
      .get("http://localhost:3001/sensor/search" + pagination + query)
      .then(response => {
        this.setState({ Data: response.data, showResult: true });
        console.log(response.data);
      });
  }

  onSubmit(e) {
    e.preventDefault();
    this.populateData();
  }

  render() {
    return <div>{this.searchQuery()}</div>;
  }
}
