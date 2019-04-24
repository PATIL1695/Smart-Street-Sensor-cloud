import React, {Component} from 'react';
import Header from "./Header.js";
class InsertNode extends Component {

  // state={
  //   :'',
  //   :''
  // }
  render() {
    return (
        <div style={{backgroundColor: "white"}}>
        <Header handleClickSignup={this.props.handleClickSignup} handleClickSignin={this.props.handleClickSignin}/>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    <div className="container" style={{marginTop: "3%"}}>
        <div style={{marginLeft: "45%"}}>
          <h2 style={{color: "orange"}}>Sign In</h2>
        </div>
        <p></p>
        <div style={{marginLeft: "40%", height:"100%"}}>
            <div className="ui large form">
              <div className="ten wide field">
                <h1><label>Email Id</label></h1>
                <input placeholder="Email address" type="text" style={{width:"30%",height:"300%"}} value={this.state.email} onChange={(event) => {
              this.setState({
                  email: event.target.value
              });}}/>
              </div>
            </div>
            <br/>
            <div className="ui large form">
              <div className="ten wide field">
                <h1><label>Password</label></h1>
                <input placeholder="Password" type="password" value={this.state.password} style={{width:"30%",height:"300%"}} onChange={(event) => {
              this.setState({
                  password: event.target.value
              });}}/>
              </div>
            </div>
            <br/>

              <div style={{marginTop: "2%",float: "left",marginLeft:"10%"}}>
                <button className="ui orange button" onClick={()=>{this.props.loginUser({password:this.state.password,username:this.state.email})}}>Sign In</button>
              </div>
              <div style={{marginTop: "4%", float: "left", marginLeft: "0%"}}>
                <h5>Dont have an account? <span style={{color:"orange",cursor:"pointer"}} onClick={()=>{this.props.gotoSignup()}}>&nbsp;&nbsp;Sign Up</span></h5>
              </div>
        </div>
    </div>
    </div>
);
  }
}

export default InsertNode;
