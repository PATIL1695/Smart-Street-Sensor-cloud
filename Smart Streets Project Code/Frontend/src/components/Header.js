import React, {Component} from 'react';


class Header extends Component {

  state={

  }

  render() {
    return (
      <div className="container-header" style={{paddingLeft:"2%"}}>
        <div className="body-header">

            <ul>
              <li style={{marginLeft:"7%"}}><a href="/">Home</a></li>
              <li><a href="/sensorReport">Sensor Nodes</a></li>
              <li><a href="/smartReport">Smart Nodes</a></li>
              <li><a href="/clusterReport">Cluster Nodes</a></li>
              <li><a href="/insert">Add Nodes</a></li>
              <li><a href="/update">Edit Nodes</a></li>
              <li><a href="/delete">Delete Nodes</a></li>
              <li><a href="http://localhost:3000/sidebar">Main Menu</a></li>
              <li onClick={this.props.handleLogout}><span>Logout</span></li>
            </ul>
            <div style={{float: "right", color: "white"}}>
              <span className="glyphicon glyphicon-user"></span>

              <div className="dropdown">
                  <span  className="dropbtn" style={{marginLeft: 10}}>My Account</span>
                  <div className="dropdown-content">
                    <button style={{backgroundColor: "orange"}} onClick={this.props.handleClickSignup}>Sign Up</button>
                    <button onClick={this.props.handleClickSignin}>Sign In</button>
                    <span>Trips onClick={this.props.hadleShowTrips}</span>
                    <span>Price Alerts</span>
                  </div>
              </div>

            </div>
        </div>
      </div>
);
  }
}

export default Header;
