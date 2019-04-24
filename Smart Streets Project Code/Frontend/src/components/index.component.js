import React, { Component } from "react";
import axios from "axios";
import SideBar from '../components/SideBar/SideBar'

// Import React Table
import Select from "react-select";
import { Link } from "react-router-dom";
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
          <button
            onClick={this.deleteRecord}
            className="btn btn-danger btn-sm"
            style={{ marginLeft: 20 }}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

/*config: {adapter: ƒ, transformRequest: {…}, transformResponse: {…}, timeout: 0, xsrfCookieName: "XSRF-TOKEN", …}
data: {docs: Array(3), total: 4, limit: 3, page: "1", pages: 2}
headers: {content-type: "application/json; charset=utf-8"}
request: XMLHttpRequest {onreadystatechange: ƒ, readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, …}
status: 200*/
export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: {
        docs: [],
        pages: 0,
        page: 1,
        limit: 5
      }
    };
    this.pageChanged = this.pageChanged.bind(this);
    this.sizeChange = this.sizeChange.bind(this);
  }

  componentDidMount() {
    this.populateData();
  }

  populateData() {
    var params = {
      limit: this.state.Data.limit,
      page: this.state.Data.page
    };

    var pagination = "?size=" + params.limit + "&page=" + params.page;
    axios
      .get("http://localhost:3001/sensor" + pagination)
      .then(response => {
        console.log(response);
        this.setState({ Data: response.data });
      })
      .catch(function(error) {
        console.log(error);
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

  render() {
    var rows = [];
    this.state.Data.docs.forEach(function(item) {
      rows.push(<RecordGridRow item={item} />);
    });
    return (
      <div style={{ marginTop: 10 }}>
        <h3 align="center">List Sensor Records</h3>
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
    );
  }
}
