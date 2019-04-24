import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

//create the Navbar Component
class Navbar extends Component {
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        localStorage.removeItem('usertoken')
     }
    render(){
        //if Cookie is set render Logout Button
        let navLogin = null;
        if(localStorage.getItem('usertoken')){
            console.log("Able to read token");
            navLogin = (
                <ul className="nav navbar-nav navbar-right">
                        <li><Link to="/" onClick = {this.handleLogout}><span className="glyphicon glyphicon-user"></span>Logout</Link></li>
                </ul>
            );
        }else{
            //Else display login button
            console.log("Not Able to read cookie");
            navLogin = (
                <ul className="nav navbar-nav navbar-right">
                        <li><Link to="/managerlogin"><span className="glyphicon glyphicon-log-in"></span> Infrastructure Manager Login</Link></li>
                        <li><Link to="/clientlogin"><span className="glyphicon glyphicon-log-in"></span> Client Login</Link></li>
                        <li><Link to="/maintenancelogin"><span className="glyphicon glyphicon-log-in"></span> Maintenance Login</Link></li>
                </ul>
            )
        }
        let redirectVar = null;
        if(cookie.load('cookie')){
            redirectVar = <Redirect to="/createNode"/>
        }
        return(
            <div>
                {redirectVar}
            <div className = "main-page-bg">
            <nav className="navbar navbar-light" styles="background-color: #e3f2fd">
                <div className="container-fluid">
                    <div className="navbar-header">
                    
                        <a className="navbar-brand" href="/">CloudSensor Application</a>
                    </div>
                    <ul className="nav navbar-nav">
                    
                        {/* <li><Link to="/createNode">Add Smart Node in a Cluster</Link></li>
                        <li><Link to="/home">View Smart Sensor Station </Link></li> */}
                        {/*<li><Link to="/delete">Delete a Book</Link></li>*/}
                    </ul>
                    {navLogin}
                </div>
            </nav>
            </div>
        </div>
        )
    }
}

export default Navbar;