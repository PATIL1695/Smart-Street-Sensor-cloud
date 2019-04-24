import React,{Component} from 'react';
// import NavBarBlue from '../NavBarBlue/NavBarBlue';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import jwtdecode from 'jwt-decode';
import './SideBar.css'

//create the sidebar Component
class SideBar extends Component {
    constructor(props){
        super(props);  
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout = () => {
        localStorage.removeItem('usertoken')
     }

    componentWillMount(){
        console.log("Token in did mount" + localStorage.getItem("usertoken"))
            if(localStorage.getItem("usertoken")){
                var tokenvalue = jwtdecode(localStorage.getItem("usertoken"));
                this.setState({
                    token: true,
                    username: tokenvalue.user.firstname,
                    usertype : tokenvalue.user.usertype
                })
            }
    }

    render()
    {
        
        let redirectVar = null;
        // if(!token){
        //     redirectVar = <Redirect to= "/ownerlogin"/>
        // }
        let dashboard = null;
        if(this.state.usertype==="manager")
        {
            dashboard = <a href="https://public.tableau.com/profile/kashika8795#!/vizhome/Inf_manager/Dashboard1?publish=yes">Infrastructure Manager Dashboard</a>
        }
        else if(this.state.usertype==="client")
        {
            dashboard = <a href="https://public.tableau.com/profile/kashika8795#!/vizhome/ClientView/ClientViewTab?publish=yes">Client Dashboard</a>
        }
        else if(this.state.usertype==="maintenance")
        {
            dashboard = <a href="https://public.tableau.com/profile/kashika8795#!/vizhome/Dashboard_1_54/MaintenanceCrewDashboard?publish=yes ">Maintence Crew Dashboard</a>
        }

        return(
            <div>
             {redirectVar}
            {/* <NavBarBlue></NavBarBlue> */}
            
            <div className = "main-div-sidebar row">
            
            <div className = "col-lg-3 vertical-menu-owner">
            <h4>Welcome</h4>
            <a href="http://localhost:3002/view">Infrastructure Manager</a>
            <Link to="/createNode">Sensor Simulator</Link>
            <a href="http://localhost:3003/">Data Manager</a>
            {dashboard}
            <Link to="/screen1">Loadbalancer</Link>
            <Link to="/" onClick = {this.handleLogout}>Logout</Link>
            </div>
    
            </div>

            </div>
        )
    }

}

export default SideBar;